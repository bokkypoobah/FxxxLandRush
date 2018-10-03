# FXXX LandRush

The [FxxxLandRush.sol](contracts/FxxxLandRush.sol) smart contract allow users to purchase of [FXXX](https://www.fxxx.io/) parcels of land using [GZE](https://etherscan.io/token/0x4ac00f287f36a6aad655281fe1ca6798c9cb727b) (GazeCoin Metaverse Token) or ethers (ETH).

Purchase price:

* The price of each parcel of land is USD 1,500 (and some parcels with variations of this amount)
* The ETH purchase amount is calculated using the [MakerDAO ETH/USD pricefeed](https://makerdao.com/feeds/) rate at [0x729D19f657BD0614b4985Cf1D82531c67569197B](https://etherscan.io/address/0x729D19f657BD0614b4985Cf1D82531c67569197B#readContract)
* The GZE purchase amount is calculated using the less frequently updated GZE/ETH [pricefeed](contracts/PriceFeed.sol) rate that is multiplied by the MakerDAO ETH/USD pricefeed rate

There are 17 sectors containing parcels of land that will be sold at different timeframes. Each of these sectors will have a unique FxxxLandRush.sol smart contract, and an associated [BTTSToken](https://github.com/bokkypoobah/BokkyPooBahsTokenTeleportationServiceSmartContract) smart contract to record the purchases of these parcels.

When the parcels of land are later available for development, the BTTSToken parcel tokens are exchanged for [ERC721 Non-Fungible Token](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md) tokens representing the ownership of the FXXX parcels of land.

<br />

<hr />

## Table Of Contents

* [Purchasing Parcels](#purchasing-parcels)
  * [Purchasing Parcels With GZE - First Method](#purchasing-parcels-with-gze---first-method)
  * [Purchasing Parcels With GZE - Second Method](#purchasing-parcels-with-gze---second-method)
  * [Purchasing Parcels With ETH](#purchasing-parcels-with-eth)
* [Deployment Of Contracts](#deployment-of-contracts)
* [Code Review](#code-review)

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

## Deployment Of Contracts

### Deployment Of FxxxLandRush Contract

Following are the constructor parameters

No      | Type             | Notes
:------ |:---------------- |:----
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

#### Configurable Parameters

* setWallet(address \_wallet)
* setStartDate(uint \_startDate)
* setEndDate(uint \_endDate)
* setMaxParcels(uint \_maxParcels)
* setParcelUsd(uint \_parcelUsd)
* setGzeBonusOffList(uint \_gzeBonusOffList)
* setGzeBonusOnList(uint \_gzeBonusOnList)

## Code Review

* [x] [code-review/Owned.md](code-review/Owned.md)
  * [x] contract Owned
* [ ] [code-review/Operated.md](code-review/Operated.md)
  * [ ] contract Operated is Owned
* [ ] [code-review/SafeMath.md](code-review/SafeMath.md)
  * [ ] library SafeMath
* [ ] [code-review/ERC20Interface.md](code-review/ERC20Interface.md)
  * [ ] contract ERC20Interface
* [ ] [code-review/BTTSTokenInterface110.md](code-review/BTTSTokenInterface110.md)
  * [ ] contract ApproveAndCallFallBack
  * [ ] contract BTTSTokenInterface is ERC20Interface
* [ ] [code-review/BonusListInterface.md](code-review/BonusListInterface.md)
  * [ ] contract BonusListInterface
* [ ] [code-review/BonusList.md](code-review/BonusList.md)
  * [ ] contract BonusList is BonusListInterface, Operated
* [ ] [code-review/PriceFeedInterface.md](code-review/PriceFeedInterface.md)
  * [ ] contract PriceFeedInterface
* [ ] [code-review/PriceFeed.md](code-review/PriceFeed.md)
  * [ ] contract PriceFeed is Operated
* [ ] [code-review/MakerDAOETHUSDPriceFeedSimulator.md](code-review/MakerDAOETHUSDPriceFeedSimulator.md)
  * [ ] contract MakerDAOETHUSDPriceFeedSimulator is Owned
* [ ] [code-review/MakerDAOPriceFeedAdaptor.md](code-review/MakerDAOPriceFeedAdaptor.md)
  * [ ] contract MakerDAOPriceFeedInterface
  * [ ] contract MakerDAOPriceFeedAdaptor is PriceFeedInterface
* [ ] [code-review/FxxxLandRush.md](code-review/FxxxLandRush.md)
  * [ ] contract FxxxLandRush is Owned, ApproveAndCallFallBack
    * [ ] using SafeMath for uint;

<br />

Outside scope as the following have been audited:

* [ ] [code-review/BTTSTokenFactory110.md](code-review/BTTSTokenFactory110.md)
  * [ ] contract ERC20Interface
  * [ ] contract ApproveAndCallFallBack
  * [ ] contract BTTSTokenInterface is ERC20Interface
  * [ ] library BTTSLib
  * [ ] contract BTTSToken is BTTSTokenInterface
  * [ ]     using BTTSLib for BTTSLib.Data;
  * [ ] contract Owned
  * [ ] contract BTTSTokenFactory is Owned

<br />

<br />

(c) BokkyPooBah / Bok Consulting Pty Ltd for GazeCoin - Oct 02 2018. The MIT Licence.
