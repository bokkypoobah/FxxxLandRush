#!/bin/sh

# Check if process already running
# ps -ef | grep sh | grep genData | grep -v grep
number=$(ps -ef | grep sh | grep genData | grep -v grep | wc -l)
if [ $number -gt 2 ]; then
  echo "Process already running"
  exit;
fi

geth --testnet attach << EOF | grep "JSONSUMMARY:" | sed "s/JSONSUMMARY: //" > tmp.json
loadScript("lookups.js");
loadScript("deployment_Ropsten.js");

addAddressNames("0x8cD8baa410E9172b949f2c4433D3b5905F8606fF", "GZEMultisig");
addAddressNames(gzeAddress, "GZE");
addAddressNames(bonusListAddress, "BonusList");
addAddressNames(makerDAOEthUsdPriceFeedAdaptorAddress, "MakerDAOEthUsdPriceFeedAdaptor");
addAddressNames(gzeEthPriceFeedAddress, "GzeEthPriceFeed");

fxxxTokenAddresses.forEach(function(e) {
  var c = eth.contract(fxxxTokenAbi).at(e);
  addAddressNames(e, "Token '" + c.symbol() + "' '" + c.name() + "'");
});

fxxxLandRushAddresses.forEach(function(e) {
  var c = eth.contract(fxxxLandRushAbi).at(e);
  addAddressNames(e, "FxxxLandRush '" + c.name() + "'");
});

function generateSummaryJSON() {
  console.log("JSONSUMMARY: {");
  var blockNumber = eth.blockNumber;
  var timestamp = eth.getBlock(blockNumber).timestamp;
  console.log("JSONSUMMARY:   \"blockNumber\": " + blockNumber + ",");
  console.log("JSONSUMMARY:   \"blockTimestamp\": " + timestamp + ",");
  console.log("JSONSUMMARY:   \"blockTimestampString\": \"" + new Date(timestamp * 1000).toString() + "\",");
  console.log("JSONSUMMARY:   \"blockTimestampUTCString\": \"" + new Date(timestamp * 1000).toUTCString() + "\",");
  console.log("JSONSUMMARY:   \"makerDAOEthUsdPriceFeedAdaptorAddress\": \"" + makerDAOEthUsdPriceFeedAdaptorAddress + "\",");
  console.log("JSONSUMMARY:   \"makerDAOEthUsdPriceFeedAdaptorName\": \"" + getAddressName(makerDAOEthUsdPriceFeedAdaptorAddress) + "\",");
  console.log("JSONSUMMARY:   \"gzeEthPriceFeedAddress\": \"" + gzeEthPriceFeedAddress + "\",");
  console.log("JSONSUMMARY:   \"gzeEthPriceFeedName\": \"" + getAddressName(gzeEthPriceFeedAddress) + "\",");
  console.log("JSONSUMMARY:   \"bonusListAddress\": \"" + bonusListAddress + "\",");
  console.log("JSONSUMMARY:   \"bonusListName\": \"" + getAddressName(bonusListAddress) + "\",");
  var ethUsd = makerDAOEthUsdPriceFeedAdaptor.getRate();
  console.log("JSONSUMMARY:   \"ethUsdRate\": \"" + ethUsd[0].shift(-18) + "\",");
  console.log("JSONSUMMARY:   \"ethUsdLive\": \"" + ethUsd[1] + "\",");
  var gzeEth = gzeEthPriceFeed.getRate();
  console.log("JSONSUMMARY:   \"gzeEthRate\": \"" + gzeEth[0].shift(-18) + "\",");
  console.log("JSONSUMMARY:   \"gzeEthLive\": \"" + gzeEth[1] + "\",");

  var bonusListAccountListedEvents = bonusList.AccountListed({}, { fromBlock: bonusListFromBlock, toBlock: "latest" }).get();
  console.log("JSONSUMMARY:   \"numberOfBonusListAccountListedEvents\": " + bonusListAccountListedEvents.length + ",");
  console.log("JSONSUMMARY:   \"bonusListAccountListedEvents\": [");
  for (var i = 0; i < bonusListAccountListedEvents.length; i++) {
    var e = bonusListAccountListedEvents[bonusListAccountListedEvents.length - 1 - i];
    var separator;
    if (i == bonusListAccountListedEvents.length - 1) {
      separator = "";
    } else {
      separator = ",";
    }
    var b = eth.getBlock(e.blockNumber);
    var ts = b.timestamp;
    console.log("JSONSUMMARY:     { \"address\": \"" + e.args.account + "\", \"status\": \"" + e.args.status + "\", " +
    "\"timestamp\":" + ts + ", \"timestampUTCString\": \"" + new Date(ts * 1000).toUTCString() + "\" }" + separator);
  }
  console.log("JSONSUMMARY:   ],");

  var gzeEthPriceFeedSetRateEvents = gzeEthPriceFeed.SetRate({}, { fromBlock: gzeEthPriceFeedFromBlock, toBlock: "latest" }).get();
  console.log("JSONSUMMARY:   \"numberOfGzeEthPriceFeedSetRateEvents\": " + gzeEthPriceFeedSetRateEvents.length + ",");
  console.log("JSONSUMMARY:   \"gzeEthPriceFeedSetRateEvents\": [");
  for (var i = 0; i < gzeEthPriceFeedSetRateEvents.length; i++) {
    var e = gzeEthPriceFeedSetRateEvents[gzeEthPriceFeedSetRateEvents.length - 1 - i];
    var separator;
    if (i == gzeEthPriceFeedSetRateEvents.length - 1) {
      separator = "";
    } else {
      separator = ",";
    }
    var b = eth.getBlock(e.blockNumber);
    var ts = b.timestamp;
    console.log("JSONSUMMARY:     { \"newRate\": \"" + e.args.newRate.shift(-18) + "\", \"newLive\": \"" + e.args.newLive + "\", " +
      "\"oldRate\": \"" + e.args.oldRate.shift(-18) + "\", \"oldLive\": \"" + e.args.oldLive + "\", " +
      "\"timestamp\":" + ts + ", \"timestampUTCString\": \"" + new Date(ts * 1000).toUTCString() + "\" }" + separator);
  }
  console.log("JSONSUMMARY:   ],");
  console.log("JSONSUMMARY:   \"numberOfTokens\": " + fxxxTokenAddresses.length + ",");
  console.log("JSONSUMMARY:   \"tokens\": [");
  for (var i = 0; i < fxxxTokenAddresses.length; i++) {
    var e = fxxxTokenAddresses[i];
    var c = eth.contract(fxxxTokenAbi).at(e);
    var separator;
    if (i == fxxxTokenAddresses.length - 1) {
      separator = "";
    } else {
      separator = ",";
    }
    console.log("JSONSUMMARY:     {");
    console.log("JSONSUMMARY:       \"address\": \"" + e + "\",");
    console.log("JSONSUMMARY:       \"nameAddress\": \"" + getAddressName(e) + "\",");
    console.log("JSONSUMMARY:       \"symbol\": \"" + c.symbol() + "\",");
    console.log("JSONSUMMARY:       \"name\": \"" + c.name() + "\",");
    console.log("JSONSUMMARY:       \"minterAddress\": \"" + c.minter() + "\",");
    console.log("JSONSUMMARY:       \"minterName\": \"" + getAddressName(c.minter()) + "\",");
    console.log("JSONSUMMARY:       \"totalSupply\": " + c.totalSupply().shift(-18) + "");
    console.log("JSONSUMMARY:     }" + separator);
  }
  console.log("JSONSUMMARY:   ],");
  console.log("JSONSUMMARY:   \"numberOfFxxxLandRushes\": " + fxxxLandRushAddresses.length + ",");
  console.log("JSONSUMMARY:   \"fxxxLandRushes\": [");
  for (var i = 0; i < fxxxLandRushAddresses.length; i++) {
    var e = fxxxLandRushAddresses[i];
    var c = eth.contract(fxxxLandRushAbi).at(e);
    var separator;
    if (i == fxxxLandRushAddresses.length - 1) {
      separator = "";
    } else {
      separator = ",";
    }
    console.log("JSONSUMMARY:     {");
    console.log("JSONSUMMARY:       \"address\": \"" + e + "\",");
    console.log("JSONSUMMARY:       \"nameAddress\": \"" + getAddressName(e) + "\",");
    console.log("JSONSUMMARY:       \"name\": \"" + c.name() + "\",");
    console.log("JSONSUMMARY:       \"parcelTokenAddress\": \"" + c.parcelToken() + "\",");
    console.log("JSONSUMMARY:       \"parcelTokenName\": \"" + getAddressName(c.parcelToken()) + "\",");
    console.log("JSONSUMMARY:       \"gzeTokenAddress\": \"" + c.gzeToken() + "\",");
    console.log("JSONSUMMARY:       \"gzeTokenName\": \"" + getAddressName(c.gzeToken()) + "\",");
    console.log("JSONSUMMARY:       \"ethUsdPriceFeedAddress\": \"" + c.ethUsdPriceFeed() + "\",");
    console.log("JSONSUMMARY:       \"ethUsdPriceFeedName\": \"" + getAddressName(c.ethUsdPriceFeed()) + "\",");
    console.log("JSONSUMMARY:       \"gzeEthPriceFeedAddress\": \"" + c.gzeEthPriceFeed() + "\",");
    console.log("JSONSUMMARY:       \"gzeEthPriceFeedName\": \"" + getAddressName(c.gzeEthPriceFeed()) + "\",");
    console.log("JSONSUMMARY:       \"bonusListAddress\": \"" + c.bonusList() + "\",");
    console.log("JSONSUMMARY:       \"bonusListName\": \"" + getAddressName(c.bonusList()) + "\",");
    console.log("JSONSUMMARY:       \"walletAddress\": \"" + c.wallet() + "\",");
    console.log("JSONSUMMARY:       \"walletName\": \"" + getAddressName(c.wallet()) + "\",");
    console.log("JSONSUMMARY:       \"startDate\": " + c.startDate() + ",");
    console.log("JSONSUMMARY:       \"startDateString\": \"" + new Date(c.startDate() * 1000).toString() + "\",");
    console.log("JSONSUMMARY:       \"startDateUTCString\": \"" + new Date(c.startDate() * 1000).toUTCString() + "\",");
    console.log("JSONSUMMARY:       \"endDate\": " + c.endDate() + ",");
    console.log("JSONSUMMARY:       \"endDateString\": \"" + new Date(c.endDate() * 1000).toString() + "\",");
    console.log("JSONSUMMARY:       \"endDateUTCString\": \"" + new Date(c.endDate() * 1000).toUTCString() + "\",");
    console.log("JSONSUMMARY:       \"maxParcels\": " + c.maxParcels() + ",");
    console.log("JSONSUMMARY:       \"parcelUsd\": " + c.parcelUsd().shift(-18) + ",");
    console.log("JSONSUMMARY:       \"usdLockAccountThreshold\": " + c.usdLockAccountThreshold().shift(-18) + ",");
    console.log("JSONSUMMARY:       \"gzeBonusOffList\": " + c.gzeBonusOffList() + ",");
    console.log("JSONSUMMARY:       \"gzeBonusOnList\": " + c.gzeBonusOnList() + ",");
    console.log("JSONSUMMARY:       \"parcelsSold\": " + c.parcelsSold() + ",");
    console.log("JSONSUMMARY:       \"contributedGze\": " + c.contributedGze().shift(-18) + ",");
    console.log("JSONSUMMARY:       \"contributedEth\": " + c.contributedEth().shift(-18) + ",");
    console.log("JSONSUMMARY:       \"finalised\": \"" + c.finalised() + "\"");
    console.log("JSONSUMMARY:     }" + separator);
  }
  console.log("JSONSUMMARY:   ]");
  console.log("JSONSUMMARY: }");
}

generateSummaryJSON();

EOF

mv tmp.json FxxxLandRushSummary.json
