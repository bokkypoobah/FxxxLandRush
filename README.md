# FXXX LandRush

The [FxxxLandRush.sol](contracts/FxxxLandRush.sol) smart contract allow users to purchase of [FXXX](https://www.fxxx.io/) parcels of land using [GZE](https://etherscan.io/token/0x4ac00f287f36a6aad655281fe1ca6798c9cb727b) (GazeCoin Metaverse Token) or ethers (ETH).

Purchase price:

* The price of each parcel of land is USD 1,500 (and some parcels with variations of this amount)
* The ETH purchase amount is calculated using the [MakerDAO ETH/USD pricefeed](https://makerdao.com/feeds/) rate at [0x729D19f657BD0614b4985Cf1D82531c67569197B](https://etherscan.io/address/0x729D19f657BD0614b4985Cf1D82531c67569197B#readContract). The [MakerDAOPriceFeedAdaptor.sol](contracts/MakerDAOPriceFeedAdaptor.sol) deployed to [0x12bc52a5a9cf8c1ffbaa2eaa82b75b3e79dfe292](https://etherscan.io/address/0x12bc52a5a9cf8c1ffbaa2eaa82b75b3e79dfe292#code) will reflect the MakerDAO ETH/USD rate
* The GZE purchase amount is calculated using the less frequently updated GZE/ETH [pricefeed](contracts/PriceFeed.sol) rate that is multiplied by the MakerDAO ETH/USD pricefeed rate. The GZE/ETH pricefeed has been deployed to [0x695Bd54a75FA8e28183F9aF30063AD444ca0EBFc](https://etherscan.io/address/0x695Bd54a75FA8e28183F9aF30063AD444ca0EBFc#code)
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
* [Code Review](#code-review)

<br />

<hr />

## Deployment Addresses

### Purchasing Contract And Token Contract

Sector    | Purchasing Contract | Token Contract | Purchase From         | Purchase To
:-------- |:------------------- |:-------------- |:--------------------- |:---------------------
FxxxHub   | TBA                 | TBA            | Oct 16 2018 15:00 PST | Nov 16 2018 15:00 PST
FxxxRK    | TBA                 | TBA            | Nov 19 2018 15:00 PST | Dec 08 2018 15:00 PST
FxxxDude  | TBA                 | TBA            | Nov 19 2018 15:00 PST | Dec 08 2018 15:00 PST
FxxxBooty | TBA                 | TBA            | Nov 19 2018 15:00 PST | Dec 08 2018 15:00 PST

<br />

### Other Contracts

Contract                         | Address
:------------------------------- |:-------
ETH/USD MakerDAOPriceFeedAdaptor | [0x12bc52a5a9cf8c1ffbaa2eaa82b75b3e79dfe292](https://etherscan.io/address/0x12bc52a5a9cf8c1ffbaa2eaa82b75b3e79dfe292#code)
GZE/ETH PriceFeed                | [0x695Bd54a75FA8e28183F9aF30063AD444ca0EBFc](https://etherscan.io/address/0x695Bd54a75FA8e28183F9aF30063AD444ca0EBFc#code)
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

### Deployment Of FxxxLandRush Contract

Following are the constructor parameters

No      | Type              | Notes
:------ |:----------------- |:----
address | \_parcelToken     | FxxxLandRush sector token
address | \_gzeToken        | [GazeCoin GZE token](https://etherscan.io/token/0x4ac00f287f36a6aad655281fe1ca6798c9cb727b) address 0x4ac00f287f36a6aad655281fe1ca6798c9cb727b
address | \_ethUsdPriceFeed | PriceFeed adaptor for MakerDAO ETH/USD price feed
address | \_gzeEthPriceFeed | GazeCoin maintained GZE/ETH price feed
address | \_bonusList       | BonusList contract
address | \_wallet          | Wallet for GZE and ETH
uint    | \_startDate       | Start date, in seconds since Jan 01 1970
uint    | \_endDate         | End date, in seconds since Jan 01 1970
uint    | \_maxParcels      | Maximum parcels of land for the sector
uint    | \_parcelUsd       | Price of a parcel of land, in USD. e.g., USD 1,500 is specified as 1,500 * 10^18
uint    | \_gzeBonusOffList | Bonus for accounts not listed in the BonusList contract. e.g. 20% is specified as 20
uint    | \_gzeBonusOnList  | Bonus for accounts listed in the BonusList contract. e.g., 30% is specified as 30

<br />

### FxxxLandRush Contract Configuration

#### setWallet
```javascript
FxxxLandRush.setWallet(address _wallet);
```

Parameters:

No      | Type              | Notes
:------ |:----------------- |:----
address | \_wallet          | Wallet for GZE and ETH

<br />

#### setStartDate
```javascript
FxxxLandRush.setStartDate(uint _startDate)
```

Parameters:

No      | Type              | Notes
:------ |:----------------- |:----
uint    | \_startDate       | Start date, in seconds since Jan 01 1970

<br />

#### setEndDate
```javascript
* setEndDate(uint _endDate)
```

Parameters:

No      | Type              | Notes
:------ |:----------------- |:----
uint    | \_endDate         | End date, in seconds since Jan 01 1970

<br />

#### setMaxParcels
```javascript
FxxxLandRush.setMaxParcels(uint _maxParcels)
```

Parameters:

No      | Type              | Notes
:------ |:----------------- |:----
uint    | \_maxParcels      | Maximum parcels of land for the sector

<br />

#### setParcelUsd
```javascript
FxxxLandRush.setParcelUsd(uint _parcelUsd)
```

Parameters:

No      | Type              | Notes
:------ |:----------------- |:----
uint    | \_parcelUsd       | Price of a parcel of land, in USD. e.g., USD 1,500 is specified as 1,500 * 10^18

<br />

#### setGzeBonusOffList
```javascript
FxxxLandRush.setGzeBonusOffList(uint _gzeBonusOffList)
```

Parameters:

No      | Type              | Notes
:------ |:----------------- |:----
uint    | \_gzeBonusOffList | Bonus for accounts not listed in the BonusList contract. e.g. 20% is specified as 20

<br />

#### setGzeBonusOnList
```javascript
FxxxLandRush.setGzeBonusOnList(uint _gzeBonusOnList)
```

Parameters:

No      | Type              | Notes
:------ |:----------------- |:----
uint    | \_gzeBonusOnList  | Bonus for accounts listed in the BonusList contract. e.g., 30% is specified as 30

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
* [ ] [code-review/FxxxLandRush.md](code-review/FxxxLandRush.md)
  * [ ] contract FxxxLandRush is Owned, ApproveAndCallFallBack
    * [x] using SafeMath for uint;
  * [ ] TODO: Check bonus calculations

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

(c) BokkyPooBah / Bok Consulting Pty Ltd for GazeCoin - Oct 04 2018. The MIT Licence.
