deployLib#!/bin/bash
# ----------------------------------------------------------------------------------------------
# Testing the smart contract
#
# Enjoy. (c) BokkyPooBah / Bok Consulting Pty Ltd 2018. The MIT Licence.
# ----------------------------------------------------------------------------------------------

echo "Options: [full|takerSell|takerBuy|exchange]"

MODE=${1:-full}

source settings
echo "---------- Settings ----------" | tee $TEST1OUTPUT
cat ./settings | tee -a $TEST1OUTPUT
echo "" | tee -a $TEST1OUTPUT

CURRENTTIME=`date +%s`
CURRENTTIMES=`perl -le "print scalar localtime $CURRENTTIME"`
START_DATE=`echo "$CURRENTTIME+45" | bc`
START_DATE_S=`perl -le "print scalar localtime $START_DATE"`
END_DATE=`echo "$CURRENTTIME+60*2" | bc`
END_DATE_S=`perl -le "print scalar localtime $END_DATE"`

printf "CURRENTTIME = '$CURRENTTIME' '$CURRENTTIMES'\n" | tee -a $TEST1OUTPUT
printf "START_DATE  = '$START_DATE' '$START_DATE_S'\n" | tee -a $TEST1OUTPUT
printf "END_DATE    = '$END_DATE' '$END_DATE_S'\n" | tee -a $TEST1OUTPUT

# Make copy of SOL file ---
# rsync -rp $SOURCEDIR/* . --exclude=Multisig.sol --exclude=test/
rsync -rp $SOURCEDIR/* . --exclude=Multisig.sol
# Copy modified contracts if any files exist
find ./modifiedContracts -type f -name \* -exec cp {} . \;

# --- Modify parameters ---
#`perl -pi -e "s/emit LogUint.*$//" $EXCHANGESOL`
# Does not work `perl -pi -e "print if(!/emit LogUint/);" $EXCHANGESOL`

DIFFS1=`diff -r -x '*.js' -x '*.json' -x '*.txt' -x 'testchain' -x '*.md' -x '*.sh' -x 'settings' -x 'modifiedContracts' $SOURCEDIR .`
echo "--- Differences $SOURCEDIR/*.sol *.sol ---" | tee -a $TEST1OUTPUT
echo "$DIFFS1" | tee -a $TEST1OUTPUT

solc_0.4.20 --version | tee -a $TEST1OUTPUT
echo "var bttsFactoryOutput=`solc_0.4.20 --allow-paths . --optimize --pretty-json --combined-json abi,bin,interface $BTTSFACTORYSOL`;" > $BTTSFACTORYJS

solc_0.4.25 --version | tee -a $TEST1OUTPUT
echo "var landRushOutput=`solc_0.4.25 --allow-paths . --optimize --pretty-json --combined-json abi,bin,interface $LANDRUSHSOL`;" > $LANDRUSHJS
echo "var priceFeedOutput=`solc_0.4.25 --allow-paths . --optimize --pretty-json --combined-json abi,bin,interface $PRICEFEEDSOL`;" > $PRICEFEEDJS
../scripts/solidityFlattener.pl --contractsdir=../contracts --mainsol=$LANDRUSHSOL --verbose | tee -a $TEST1OUTPUT

if [ "$MODE" = "compile" ]; then
  echo "Compiling only"
  exit 1;
fi

geth --verbosity 3 attach $GETHATTACHPOINT << EOF | tee -a $TEST1OUTPUT
loadScript("$BTTSFACTORYJS");
loadScript("$LANDRUSHJS");
loadScript("$PRICEFEEDJS");
loadScript("lookups.js");
loadScript("functions.js");


var bttsLibAbi = JSON.parse(bttsFactoryOutput.contracts["$BTTSFACTORYSOL:BTTSLib"].abi);
var bttsLibBin = "0x" + bttsFactoryOutput.contracts["$BTTSFACTORYSOL:BTTSLib"].bin;
var bttsTokenAbi = JSON.parse(bttsFactoryOutput.contracts["$BTTSFACTORYSOL:BTTSToken"].abi);
var bttsFactoryAbi = JSON.parse(bttsFactoryOutput.contracts["$BTTSFACTORYSOL:BTTSTokenFactory"].abi);
var bttsFactoryBin = "0x" + bttsFactoryOutput.contracts["$BTTSFACTORYSOL:BTTSTokenFactory"].bin;
var landRushAbi = JSON.parse(landRushOutput.contracts["$LANDRUSHSOL:FxxxLandRush"].abi);
var landRushBin = "0x" + landRushOutput.contracts["$LANDRUSHSOL:FxxxLandRush"].bin;
var priceFeedAbi = JSON.parse(priceFeedOutput.contracts["$PRICEFEEDSOL:PriceFeed"].abi);
var priceFeedBin = "0x" + priceFeedOutput.contracts["$PRICEFEEDSOL:PriceFeed"].bin;

// console.log("DATA: bttsLibAbi=" + JSON.stringify(bttsLibAbi));
// console.log("DATA: bttsLibBin=" + JSON.stringify(bttsLibBin));
// console.log("DATA: bttsTokenAbi=" + JSON.stringify(bttsTokenAbi));
// console.log("DATA: bttsFactoryAbi=" + JSON.stringify(bttsFactoryAbi));
// console.log("DATA: bttsFactoryBin=" + JSON.stringify(bttsFactoryBin));
// console.log("DATA: landRushAbi=" + JSON.stringify(landRushAbi));
// console.log("DATA: landRushBin=" + JSON.stringify(landRushBin));
// console.log("DATA: priceFeedAbi=" + JSON.stringify(priceFeedAbi));
// console.log("DATA: priceFeedBin=" + JSON.stringify(priceFeedBin));


unlockAccounts("$PASSWORD");
printBalances();
console.log("RESULT: ");


// -----------------------------------------------------------------------------
var deployLibMessage = "Deploy Lib";
// -----------------------------------------------------------------------------
console.log("RESULT: ---------- " + deployLibMessage + " ----------");
var bttsLibContract = web3.eth.contract(bttsLibAbi);
var bttsLibTx = null;
var bttsLibAddress = null;
var bttsLib = bttsLibContract.new({from: deployer, data: bttsLibBin, gas: 5000000, gasPrice: defaultGasPrice},
  function(e, contract) {
    if (!e) {
      if (!contract.address) {
        bttsLibTx = contract.transactionHash;
      } else {
        bttsLibAddress = contract.address;
        addAccount(bttsLibAddress, "BTTSLib");
        // addDexOneExchangeContractAddressAndAbi(dexzAddress, dexzAbi);
        console.log("DATA: var bttsLibAddress=\"" + bttsLibAddress + "\";");
        console.log("DATA: var bttsLibAbi=" + JSON.stringify(bttsLibAbi) + ";");
        console.log("DATA: var bttsLib=eth.contract(bttsLibAbi).at(bttsLibAddress);");
      }
    }
  }
);
while (txpool.status.pending > 0) {
}
printBalances();
failIfTxStatusError(bttsLibTx, deployLibMessage + " - BTTSLib");
printTxData("bttsLibTx", bttsLibTx);
console.log("RESULT: ");


// -----------------------------------------------------------------------------
var deployFactoryMessage = "Deploy Factory";
// -----------------------------------------------------------------------------
console.log("RESULT: ---------- " + deployFactoryMessage + " ----------");
// console.log("RESULT: old='" + bttsFactoryBin + "'");
var newBTTSFactoryBin = bttsFactoryBin.replace(/__BTTSTokenFactory110.sol:BTTSLib_______/g, bttsLibAddress.substring(2, 42));
// console.log("RESULT: new='" + newBTTSFactoryBin + "'");
var bttsFactoryContract = web3.eth.contract(bttsFactoryAbi);
var bttsFactoryTx = null;
var bttsFactoryAddress = null;
var bttsFactory = bttsFactoryContract.new({from: deployer, data: newBTTSFactoryBin, gas: 5000000, gasPrice: defaultGasPrice},
  function(e, contract) {
    if (!e) {
      if (!contract.address) {
        bttsFactoryTx = contract.transactionHash;
      } else {
        bttsFactoryAddress = contract.address;
        addAccount(bttsFactoryAddress, "BTTSFactory");
        addFactoryContractAddressAndAbi(bttsFactoryAddress, bttsFactoryAbi);
        console.log("DATA: var bttsFactoryAddress=\"" + bttsFactoryAddress + "\";");
        console.log("DATA: var bttsFactoryAbi=" + JSON.stringify(bttsFactoryAbi) + ";");
        console.log("DATA: var bttsFactory=eth.contract(bttsFactoryAbi).at(bttsFactoryAddress);");
      }
    }
  }
);
while (txpool.status.pending > 0) {
}
printBalances();
failIfTxStatusError(bttsFactoryTx, deployFactoryMessage + " - BTTSFactory");
printTxData("bttsFactoryTx", bttsFactoryTx);
printFactoryContractDetails();
console.log("RESULT: ");


// -----------------------------------------------------------------------------
var deployPriceFeedMessage = "Deploy PriceFeeds";
// -----------------------------------------------------------------------------
console.log("RESULT: ---------- " + deployPriceFeedMessage + " ----------");
var ethUsdPriceFeedContract = web3.eth.contract(priceFeedAbi);
var ethUsdPriceFeedTx = null;
var ethUsdPriceFeedAddress = null;
var ethUsdPriceFeed = ethUsdPriceFeedContract.new(new BigNumber($INITIALETHUSD).shift(18), true, {from: deployer, data: priceFeedBin, gas: 5000000, gasPrice: defaultGasPrice},
  function(e, contract) {
    if (!e) {
      if (!contract.address) {
        ethUsdPriceFeedTx = contract.transactionHash;
      } else {
        ethUsdPriceFeedAddress = contract.address;
        addAccount(ethUsdPriceFeedAddress, "ETH/USD PriceFeed");
        addEthUsdPriceFeedContractAddressAndAbi(ethUsdPriceFeedAddress, priceFeedAbi);
        console.log("DATA: var ethUsdPriceFeedAddress=\"" + ethUsdPriceFeedAddress + "\";");
        console.log("DATA: var ethUsdPriceFeedAbi=" + JSON.stringify(priceFeedAbi) + ";");
        console.log("DATA: var ethUsdPriceFeed=eth.contract(ethUsdPriceFeedAbi).at(ethUsdPriceFeedAddress);");
      }
    }
  }
);
var gzeEthPriceFeedContract = web3.eth.contract(priceFeedAbi);
var gzeEthPriceFeedTx = null;
var gzeEthPriceFeedAddress = null;
var gzeEthPriceFeed = gzeEthPriceFeedContract.new(new BigNumber($INITIALGZEETH).shift(18), true, {from: deployer, data: priceFeedBin, gas: 5000000, gasPrice: defaultGasPrice},
  function(e, contract) {
    if (!e) {
      if (!contract.address) {
        gzeEthPriceFeedTx = contract.transactionHash;
      } else {
        gzeEthPriceFeedAddress = contract.address;
        addAccount(gzeEthPriceFeedAddress, "GZE/ETH PriceFeed");
        addGzeEthPriceFeedContractAddressAndAbi(gzeEthPriceFeedAddress, priceFeedAbi);
        console.log("DATA: var gzeEthPriceFeedAddress=\"" + gzeEthPriceFeedAddress + "\";");
        console.log("DATA: var gzeEthPriceFeedAbi=" + JSON.stringify(priceFeedAbi) + ";");
        console.log("DATA: var gzeEthPriceFeed=eth.contract(gzeEthPriceFeedAbi).at(gzeEthPriceFeedAddress);");
      }
    }
  }
);
while (txpool.status.pending > 0) {
}
printBalances();
failIfTxStatusError(ethUsdPriceFeedTx, deployPriceFeedMessage + " - ETH/USD PriceFeed");
failIfTxStatusError(gzeEthPriceFeedTx, deployPriceFeedMessage + " - GZE/ETH PriceFeed");
printTxData("ethUsdPriceFeedTx", ethUsdPriceFeedTx);
printTxData("gzeEthPriceFeedTx", gzeEthPriceFeedTx);
printEthUsdPriceFeedContractDetails();
printGzeEthPriceFeedContractDetails();
console.log("RESULT: ");


// -----------------------------------------------------------------------------
var deployTokens1Message = "Deploy Tokens";
var numberOfTokens = $NUMBEROFTOKENS;
var _tokenSymbols = "$TOKENSYMBOLS".split(":");
var _tokenNames = "$TOKENNAMES".split(":");
var _tokenDecimals = "$TOKENDECIMALS".split(":");
var _tokenInitialSupplies = "$TOKENINITIALSUPPLIES".split(":");
var _tokenInitialDistributions = "$TOKENINITIALDISTRIBUTION".split(":");
var _tokenMintable = "$TOKENMINTABLE".split(":");
// console.log("RESULT: _tokenSymbols = " + JSON.stringify(_tokenSymbols));
// console.log("RESULT: _tokenNames = " + JSON.stringify(_tokenNames));
// console.log("RESULT: _tokenDecimals = " + JSON.stringify(_tokenDecimals));
// console.log("RESULT: _tokenInitialSupplies = " + JSON.stringify(_tokenInitialSupplies));
// console.log("RESULT: _tokenInitialDistributions = " + JSON.stringify(_tokenInitialDistributions));
// console.log("RESULT: _tokenMintable = " + JSON.stringify(_tokenMintable));
var transferable = true;
var i;
// -----------------------------------------------------------------------------
console.log("RESULT: ---------- " + deployTokens1Message + " ----------");
var tokenTxs = [];
var tokens = [];
for (i = 0; i < numberOfTokens; i++) {
  tokenTxs[i] = bttsFactory.deployBTTSTokenContract(_tokenSymbols[i], _tokenNames[i], _tokenDecimals[i], new BigNumber(_tokenInitialSupplies[i]).shift(_tokenDecimals[i]), _tokenMintable[i] == "true", transferable, {from: deployer, gas: 6000000, gasPrice: defaultGasPrice});
}
while (txpool.status.pending > 0) {
}
var tokenAddresses = getBTTSFactoryTokenListing();
for (i = 0; i < numberOfTokens; i++) {
  tokens[i] = eth.contract(bttsTokenAbi).at(tokenAddresses[i]);
  addAccount(tokenAddresses[i], "Token '" + tokens[i].symbol() + "' '" + tokens[i].name() + "'");
  addAddressSymbol(tokenAddresses[i], tokens[i].symbol());
  addTokenContractAddressAndAbi(i, tokenAddresses[i], bttsTokenAbi);
}
printBalances();
for (i = 0; i < numberOfTokens; i++) {
  failIfTxStatusError(tokenTxs[i], deployTokens1Message + " - Token '" + tokens[i].symbol() + "' '" + tokens[i].name() + "'");
}
for (i = 0; i < numberOfTokens; i++) {
  printTxData("tokenTx[" + i + "]", tokenTxs[i]);
}
console.log("RESULT: ");
for (i = 0; i < numberOfTokens; i++) {
  printTokenContractDetails(i);
  console.log("RESULT: ");
}
console.log("RESULT: ");


// -----------------------------------------------------------------------------
var deployLandRushMessage = "Deploy FxxxLandRush";
var landRushAbi = JSON.parse(landRushOutput.contracts["$LANDRUSHSOL:FxxxLandRush"].abi);
var landRushBin = "0x" + landRushOutput.contracts["$LANDRUSHSOL:FxxxLandRush"].bin;
var initialParcelUsd = new BigNumber($INITIALPARCELUSD).shift(18);
// -----------------------------------------------------------------------------
console.log("RESULT: ---------- " + deployLandRushMessage + " ----------");
var landRushContract = web3.eth.contract(landRushAbi);
var landRushTx = null;
var landRushAddress = null;
var landRush = landRushContract.new(tokenAddresses[$AAA], tokenAddresses[$GZE], ethUsdPriceFeedAddress, gzeEthPriceFeedAddress, wallet, $START_DATE, $END_DATE, initialParcelUsd, $GZEBONUS, {from: deployer, data: landRushBin, gas: 5000000, gasPrice: defaultGasPrice},
  function(e, contract) {
    if (!e) {
      if (!contract.address) {
        landRushTx = contract.transactionHash;
      } else {
        landRushAddress = contract.address;
        addAccount(landRushAddress, "FxxxLandRush");
        addLandRushContractAddressAndAbi(landRushAddress, landRushAbi);
        console.log("DATA: var landRushAddress=\"" + landRushAddress + "\";");
        console.log("DATA: var landRushAbi=" + JSON.stringify(landRushAbi) + ";");
        console.log("DATA: var landRush=eth.contract(landRushAbi).at(landRushAddress);");
      }
    }
  }
);
while (txpool.status.pending > 0) {
}
printBalances();
failIfTxStatusError(landRushTx, deployLandRushMessage + " - FxxxLandRush");
printTxData("landRushTx", landRushTx);
printLandRushContractDetails();
console.log("RESULT: ");


// -----------------------------------------------------------------------------
var deployGroup1Message = "Deploy Group #1";
// -----------------------------------------------------------------------------
console.log("RESULT: ---------- " + deployGroup1Message + " ----------");
var deployGroup1_setMinterTx = tokens[$AAA].setMinter(landRushAddress, {from: deployer, gas: 2000000, gasPrice: defaultGasPrice});
var users = [user1, user2, user3];
var deployGroup1_Txs = [];
users.forEach(function(u) {
  for (i = 0; i < numberOfTokens; i++) {
    var tx = tokens[i].transfer(u, new BigNumber(_tokenInitialDistributions[i]).shift(_tokenDecimals[i]), {from: deployer, gas: 2000000, gasPrice: defaultGasPrice});
    deployGroup1_Txs.push(tx);
  }
});
while (txpool.status.pending > 0) {
}
printBalances();
failIfTxStatusError(deployGroup1_setMinterTx, deployGroup1Message + " - AAA.setMinter(landRush)");
deployGroup1_Txs.forEach(function(t) {
  failIfTxStatusError(t, deployGroup1Message + " - Distribute tokens - " + t);
});
printTxData("deployGroup1_setMinterTx", deployGroup1_setMinterTx);
deployGroup1_Txs.forEach(function(t) {
  printTxData("", t);
});
console.log("RESULT: ");
for (i = 0; i < numberOfTokens; i++) {
  printTokenContractDetails(i);
  console.log("RESULT: ");
}
console.log("RESULT: ");


// -----------------------------------------------------------------------------
var contribute1Message = "Contribute #1";
// -----------------------------------------------------------------------------
console.log("RESULT: ---------- " + contribute1Message + " ----------");
var contribute1_1Tx = tokens[$GZE].approveAndCall(landRushAddress, new BigNumber(200000).shift(18), "", {from: user1, gas: 2000000, gasPrice: defaultGasPrice});
while (txpool.status.pending > 0) {
}
printBalances();
failIfTxStatusError(contribute1_1Tx, contribute1Message + " - GZE.approveAndCall(landRush, 200000, \"\")");
printTxData("contribute1_1Tx", contribute1_1Tx);
console.log("RESULT: ");
printLandRushContractDetails();
console.log("RESULT: ");
for (i = 0; i < numberOfTokens; i++) {
  printTokenContractDetails(i);
  console.log("RESULT: ");
}
console.log("RESULT: ");



EOF
grep "DATA: " $TEST1OUTPUT | sed "s/DATA: //" > $DEPLOYMENTDATA
cat $DEPLOYMENTDATA
grep "RESULT: " $TEST1OUTPUT | sed "s/RESULT: //" > $TEST1RESULTS
cat $TEST1RESULTS
