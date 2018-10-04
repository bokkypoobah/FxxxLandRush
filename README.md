# FXXX LandRush

The [FxxxLandRush.sol](contracts/FxxxLandRush.sol) smart contract allow users to purchase of [FXXX](https://www.fxxx.io/) parcels of land using [GZE](https://etherscan.io/token/0x4ac00f287f36a6aad655281fe1ca6798c9cb727b) (GazeCoin Metaverse Token) or ethers (ETH).

Purchase price:

* The price of each parcel of land is USD 1,500 (and some parcels with variations of this amount)
* The ETH purchase amount is calculated using the [MakerDAO ETH/USD pricefeed](https://makerdao.com/feeds/) rate at [0x729D19f657BD0614b4985Cf1D82531c67569197B](https://etherscan.io/address/0x729D19f657BD0614b4985Cf1D82531c67569197B#readContract). The [MakerDAOPriceFeedAdaptor.sol](contracts/MakerDAOPriceFeedAdaptor.sol) deployed to [0x12bc52a5a9cf8c1ffbaa2eaa82b75b3e79dfe292](https://etherscan.io/address/0x12bc52a5a9cf8c1ffbaa2eaa82b75b3e79dfe292#code) will reflect the MakerDAO ETH/USD rate
* The GZE purchase amount is calculated using the less frequently updated GZE/ETH [pricefeed](contracts/PriceFeed.sol) rate that is multiplied by the MakerDAO ETH/USD pricefeed rate. The GZE/ETH pricefeed has been deployed to [0x4604646C55410EAa6Cf43b04d26071E36bC227Ef](https://etherscan.io/address/0x4604646C55410EAa6Cf43b04d26071E36bC227Ef#code)
* Purchases using GZE will have a 30% discount if the purchasing account has been added to the [BonusList.sol](contracts/BonusList.sol) deployed to [0x57D2F4B8F55A26DfE8Aba3c9f1c73CADbBc55C46](https://etherscan.io/address/0x57D2F4B8F55A26DfE8Aba3c9f1c73CADbBc55C46#code). Accounts not in the BonusList will get a 20% discount when purchasing with GZE

There are 17 sectors containing parcels of land that will be sold at different timeframes. Each of these sectors will have a unique FxxxLandRush.sol smart contract, and an associated [BTTSToken](https://github.com/bokkypoobah/BokkyPooBahsTokenTeleportationServiceSmartContract) smart contract to record the purchases of these parcels.

When the parcels of land are later available for development, the BTTSToken parcel tokens are exchanged for [ERC721 Non-Fungible Token](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md) tokens representing the ownership of the FXXX parcels of land.

<br />

<hr />

## Table Of Contents

* [Deployment Addresses](#deployment-addresses)
  * [Purchasing Contract And Token Contract](#purchasing-contract-and-token-contract)
  * [Other Contracts](#other-contracts)
* [Purchasing Parcels](#purchasing-parcels)
  * [Purchasing Parcels With GZE - First Method](#purchasing-parcels-with-gze---first-method)
  * [Purchasing Parcels With GZE - Second Method](#purchasing-parcels-with-gze---second-method)
  * [Purchasing Parcels With ETH](#purchasing-parcels-with-eth)
* [Deployment And Configuration Of FxxxLandRush Contracts](#deployment-and-configuration-of-fxxxlandrush-contracts)
  * [Deployment Of FxxxLandRush Contract](#deployment-of-fxxxlandrush-contract)
  * [FxxxLandRush Contract Configuration](#fxxxlandrush-contract-configuration)
* [Updating The GZE/ETH PriceFeed](#updating-the-gzeeth-pricefeed)
* [Updating The BonusList](#updating-the-bonuslist)
* [Code Review](#code-review)

<br />

<hr />

## Deployment Addresses

See [deployment](deployment) for deployment details. See [scripts/genData.sh](scripts/genData.sh), [scripts/deployment.js](scripts/deployment.js) and [scripts/FxxxLandRushSummary.json](scripts/FxxxLandRushSummary.json) for deployment statistics.

<br />

### Purchasing Contract And Token Contract

Zone      | Purchasing Contract | Token Contract | Purchase From         | Purchase To
:-------- |:------------------- |:-------------- |:--------------------- |:---------------------
FxxxHub   | TBA                 | TBA            | Oct 16 2018 15:00 PST | Nov 16 2018 15:00 PST
FxxxRK    | TBA                 | TBA            | Nov 19 2018 15:00 PST | Dec 08 2018 15:00 PST
FxxxDude  | TBA                 | TBA            | Nov 19 2018 15:00 PST | Dec 08 2018 15:00 PST
FxxxBooty | TBA                 | TBA            | Nov 19 2018 15:00 PST | Dec 08 2018 15:00 PST

Time Conversions:

PST Time          | UTC Time          | AEST Time         | Unix Time  | new Date(Unix Time * 1000).toUTCString()
:---------------- |:----------------- |:----------------- |:---------- |:----------------------------------------
Oct 16 2018 15:00 | Oct 16 2018 23:00 | Oct 17 2018 10:00 | 1539730800 | "Tue, 16 Oct 2018 23:00:00 UTC"
Nov 16 2018 15:00 | Nov 16 2018 23:00 | Nov 17 2018 10:00 | 1542409200 | "Fri, 16 Nov 2018 23:00:00 UTC"
Nov 19 2018 15:00 | Nov 19 2018 23:00 | Nov 20 2018 10:00 | 1542668400 | "Mon, 19 Nov 2018 23:00:00 UTC"
Dec 08 2018 15:00 | Dec 08 2018 23:00 | Dec 09 2018 10:00 | 1544310000 | "Sat, 08 Dec 2018 23:00:00 UTC"

<br />

### Other Contracts

Contract                         | Address
:------------------------------- |:-------
ETH/USD MakerDAOPriceFeedAdaptor | [0x12bc52a5a9cf8c1ffbaa2eaa82b75b3e79dfe292](https://etherscan.io/address/0x12bc52a5a9cf8c1ffbaa2eaa82b75b3e79dfe292#code)
GZE/ETH PriceFeed                | [0x4604646C55410EAa6Cf43b04d26071E36bC227Ef](https://etherscan.io/address/0x4604646C55410EAa6Cf43b04d26071E36bC227Ef#code)
BonusList                        | [0x57D2F4B8F55A26DfE8Aba3c9f1c73CADbBc55C46](https://etherscan.io/address/0x57D2F4B8F55A26DfE8Aba3c9f1c73CADbBc55C46#code)

<br />

<hr />

## Purchasing Parcels

In the example below, we will give the FxxxLandRush contract in a single sector the name *LandRush* and the address of *0xLandRush*. The token recording the purchased parcel will be given an address of *0xParcelToken*. The GZE token contract will be given the name *GZE*.

### Purchasing Parcels With GZE - First Method

A purchaser executes `GZE.approveAndCall(landRushAddress, tokens, "")` to purchase parcels.

<br />

### Purchasing Parcels With GZE - Second Method

A purchaser:

* Approves tokens to be received by the *LandRush* contract by executing `GZE.approve(0xLandRush, tokens)`
* Purchases parcels by executing `LandRush.purchaseWithGze(tokens)`

<br />

### Purchasing Parcels With ETH

A purchaser sends ETH directly to the *LandRush* contract at *0xLandRush*

<br />

<hr />

## Deployment And Configuration Of FxxxLandRush Contracts

An FxxxLandRush contract will be deployed for each sector.

<br />

### Deployment Of FxxxLandRush Contract

Following are the constructor parameters

No      | Type                      | Notes
:------ |:------------------------- |:----
address | \_parcelToken             | FxxxLandRush sector token
address | \_gzeToken                | [GazeCoin GZE token](https://etherscan.io/token/0x4ac00f287f36a6aad655281fe1ca6798c9cb727b) address 0x4ac00f287f36a6aad655281fe1ca6798c9cb727b
address | \_ethUsdPriceFeed         | PriceFeed adaptor for MakerDAO ETH/USD price feed, address 0x12bc52a5a9cf8c1ffbaa2eaa82b75b3e79dfe292
address | \_gzeEthPriceFeed         | GazeCoin maintained GZE/ETH price feed, address 0x4604646C55410EAa6Cf43b04d26071E36bC227Ef
address | \_bonusList               | BonusList contract, address 0x57D2F4B8F55A26DfE8Aba3c9f1c73CADbBc55C46
address | \_wallet                  | Wallet for GZE and ETH
uint    | \_startDate               | Start date, in seconds since Jan 01 1970
uint    | \_endDate                 | End date, in seconds since Jan 01 1970
uint    | \_maxParcels              | Maximum parcels of land for the sector
uint    | \_parcelUsd               | Price of a parcel of land, in USD. e.g., USD 1,500 is specified as 1,500 * 10^18
uint    | \_usdLockAccountThreshold | Lock transfers for purchasing account if USD amount exceeds this threshold. e.g. USD 7,000 is specified as 7,000 * 10^18
uint    | \_gzeBonusOffList         | Bonus for accounts not listed in the BonusList contract. e.g. 20% is specified as 20
uint    | \_gzeBonusOnList          | Bonus for accounts listed in the BonusList contract. e.g., 30% is specified as 30

<br />

### FxxxLandRush Contract Configuration

#### setWallet
```javascript
function setWallet(address _wallet)
```

Parameters:

No      | Type              | Notes
:------ |:----------------- |:----
address | \_wallet          | Wallet for GZE and ETH

<br />

#### setStartDate
```javascript
function setStartDate(uint _startDate)
```

Parameters:

No      | Type              | Notes
:------ |:----------------- |:----
uint    | \_startDate       | Start date, in seconds since Jan 01 1970

<br />

#### setEndDate
```javascript
function setEndDate(uint _endDate)
```

Parameters:

No      | Type              | Notes
:------ |:----------------- |:----
uint    | \_endDate         | End date, in seconds since Jan 01 1970

<br />

#### setMaxParcels
```javascript
function setMaxParcels(uint _maxParcels)
```

Parameters:

No      | Type              | Notes
:------ |:----------------- |:----
uint    | \_maxParcels      | Maximum parcels of land for the sector

<br />

#### setParcelUsd
```javascript
function setParcelUsd(uint _parcelUsd)
```

Parameters:

No      | Type              | Notes
:------ |:----------------- |:----
uint    | \_parcelUsd       | Price of a parcel of land, in USD. e.g., USD 1,500 is specified as 1,500 * 10^18

<br />

#### setUsdLockAccountThreshold
```javascript
function setUsdLockAccountThreshold(uint _usdLockAccountThreshold)
```

Parameters:

No      | Type                      | Notes
:------ |:------------------------- |:----
uint    | \_usdLockAccountThreshold | Lock transfers for purchasing account if USD amount exceeds this threshold. e.g. USD 7,000 is specified as 7,000 * 10^18

<br />

#### setGzeBonusOffList
```javascript
function setGzeBonusOffList(uint _gzeBonusOffList)
```

Parameters:

No      | Type              | Notes
:------ |:----------------- |:----
uint    | \_gzeBonusOffList | Bonus for accounts not listed in the BonusList contract. e.g. 20% is specified as 20

<br />

#### setGzeBonusOnList
```javascript
function setGzeBonusOnList(uint _gzeBonusOnList)
```

Parameters:

No      | Type              | Notes
:------ |:----------------- |:----
uint    | \_gzeBonusOnList  | Bonus for accounts listed in the BonusList contract. e.g., 30% is specified as 30

<br />

<hr />

## Updating The GZE/ETH PriceFeed

The GZE/ETH PriceFeed has been deployed to [0x4604646C55410EAa6Cf43b04d26071E36bC227Ef](https://etherscan.io/address/0x4604646C55410EAa6Cf43b04d26071E36bC227Ef#code). See [Deployment - GZE/ETH PriceFeed](deployment#gzeeth-pricefeed) for scripts to update the price feed.

Contract address:
```
0x4604646C55410EAa6Cf43b04d26071E36bC227Ef
```

Contract ABI:
```javascript
[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"operators","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getRate","outputs":[{"name":"_rate","type":"uint256"},{"name":"_live","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_rate","type":"uint256"},{"name":"_live","type":"bool"}],"name":"setRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnershipImmediately","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"live","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_operator","type":"address"}],"name":"addOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_operator","type":"address"}],"name":"removeOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_rate","type":"uint256"},{"name":"_live","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldRate","type":"uint256"},{"indexed":false,"name":"oldLive","type":"bool"},{"indexed":false,"name":"newRate","type":"uint256"},{"indexed":false,"name":"newLive","type":"bool"}],"name":"SetRate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_operator","type":"address"}],"name":"OperatorAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_operator","type":"address"}],"name":"OperatorRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"}]
```

<br />

#### addOperator

The contract owner adds an operator account that is then permissioned to update the rates. Multiple operators can be permissioned.

```javascript
function addOperator(address _operator)
```

Parameters:

No      | Type              | Notes
:------ |:----------------- |:----
uint    | \_operator        | Operator account

<br />

#### removeOperator

The contract owner can remove an operator account's permission.

```javascript
function removeOperator(address _operator)
```

Parameters:

No      | Type              | Notes
:------ |:----------------- |:----
uint    | \_operator        | Operator account

<br />

#### setRate

Any permissioned operator account can set the GZE/ETH rate.

```javascript
function setRate(uint _rate, bool _live)
```

Parameters:

No      | Type              | Notes
:------ |:----------------- |:----
uint    | \_rate            | GZE/ETH market rate. e.g., 0.00004199 is specified as 0.00004199 * 10^18
bool    | \_live            | Is the price live? If the price is not live, user's will not be able to purchase FxxxLandRush parcels with GZE

<br />

<hr />

## Updating The BonusList

The BonusList has been deployed to [0x57D2F4B8F55A26DfE8Aba3c9f1c73CADbBc55C46](https://etherscan.io/address/0x57D2F4B8F55A26DfE8Aba3c9f1c73CADbBc55C46#code). See [Deployment - BonusList](deployment#bonuslist) for scripts to update the bonus list.

Contract address:
```
0x57D2F4B8F55A26DfE8Aba3c9f1c73CADbBc55C46
```

Contract ABI:
```javascript
[{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"operators","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"accounts","type":"address[]"}],"name":"remove","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"bonusList","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnershipImmediately","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isInBonusList","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_operator","type":"address"}],"name":"addOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_operator","type":"address"}],"name":"removeOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accounts","type":"address[]"}],"name":"add","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"},{"indexed":false,"name":"status","type":"bool"}],"name":"AccountListed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_operator","type":"address"}],"name":"OperatorAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_operator","type":"address"}],"name":"OperatorRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"}]
```

<br />

#### addOperator

The contract owner adds an operator account that is then permissioned to update the bonus list. Multiple operators can be permissioned.

```javascript
function addOperator(address _operator)
```

Parameters:

No      | Type              | Notes
:------ |:----------------- |:----
uint    | \_operator        | Operator account

<br />

#### removeOperator

The contract owner can remove an operator account's permission.

```javascript
function removeOperator(address _operator)
```

Parameters:

No      | Type              | Notes
:------ |:----------------- |:----
uint    | \_operator        | Operator account

<br />

#### add

Any permissioned operator account can add one or more addresses to the bonus list.

```javascript
function add(address[] accounts)
```

Parameters:

No        | Type     | Notes
:-------- |:-------- |:----
address[] | accounts | Array of accounts to add to the bonus list

<br />

#### remove

Any permissioned operator account can remove one or more addresses from the bonus list.

```javascript
function remove(address[] accounts)
```

Parameters:

No        | Type     | Notes
:-------- |:-------- |:----
address[] | accounts | Array of accounts to remove from the bonus list

<br />

<hr />

## Code Review

* [x] [code-review/Owned.md](code-review/Owned.md)
  * [x] contract Owned
* [x] [code-review/Operated.md](code-review/Operated.md)
  * [x] contract Operated is Owned
* [x] [code-review/SafeMath.md](code-review/SafeMath.md)
  * [x] library SafeMath
* [x] [code-review/ERC20Interface.md](code-review/ERC20Interface.md)
  * [x] contract ERC20Interface
* [x] [code-review/BonusListInterface.md](code-review/BonusListInterface.md)
  * [x] contract BonusListInterface
* [x] [code-review/BonusList.md](code-review/BonusList.md)
  * [x] contract BonusList is BonusListInterface, Operated
* [x] [code-review/PriceFeedInterface.md](code-review/PriceFeedInterface.md)
  * [x] contract PriceFeedInterface
* [x] [code-review/PriceFeed.md](code-review/PriceFeed.md)
  * [x] contract PriceFeed is Operated
* [x] [code-review/MakerDAOETHUSDPriceFeedSimulator.md](code-review/MakerDAOETHUSDPriceFeedSimulator.md)
  * [x] contract MakerDAOETHUSDPriceFeedSimulator is Owned
* [x] [code-review/MakerDAOPriceFeedAdaptor.md](code-review/MakerDAOPriceFeedAdaptor.md)
  * [x] contract MakerDAOPriceFeedInterface
  * [x] contract MakerDAOPriceFeedAdaptor is PriceFeedInterface
* [x] [code-review/FxxxLandRush.md](code-review/FxxxLandRush.md)
  * [x] contract FxxxLandRush is Owned, ApproveAndCallFallBack
    * [x] using SafeMath for uint;

<br />

### Outside Scope

Outside scope as the following have been [audited](https://github.com/bokkypoobah/BokkyPooBahsTokenTeleportationServiceSmartContract#history):

* [contracts/BTTSTokenInterface110.sol](contracts/BTTSTokenInterface110.sol)
  * contract ApproveAndCallFallBack
  * contract BTTSTokenInterface is ERC20Interface
* [contracts/BTTSTokenFactory110.sol](contracts/BTTSTokenFactory110.sol)
  * contract ERC20Interface
  * contract ApproveAndCallFallBack
  * contract BTTSTokenInterface is ERC20Interface
  * library BTTSLib
  * contract BTTSToken is BTTSTokenInterface
    * using BTTSLib for BTTSLib.Data;
  * contract Owned
  * contract BTTSTokenFactory is Owned

<br />

<br />

Thanks to [Adrian Guerrera](https://github.com/apguerrera) for helping to validate these contracts.

(c) BokkyPooBah / Bok Consulting Pty Ltd for GazeCoin - Oct 05 2018. The MIT Licence.
