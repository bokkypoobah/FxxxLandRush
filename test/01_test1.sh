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

#echo "var dexzOutput=`solc_0.4.24 --allow-paths . --optimize --pretty-json --combined-json abi,bin,interface $EXCHANGESOL`;" > $EXCHANGEJS
#echo "var mintableTokenOutput=`solc_0.4.24 --allow-paths . --optimize --pretty-json --combined-json abi,bin,interface $MINTABLETOKENSOL`;" > $MINTABLETOKENJS
#../scripts/solidityFlattener.pl --contractsdir=../contracts --mainsol=$EXCHANGESOL --verbose | tee -a $TEST1OUTPUT
#../scripts/solidityFlattener.pl --contractsdir=../contracts --mainsol=$MINTABLETOKENSOL --verbose | tee -a $TEST1OUTPUT

if [ "$MODE" = "compile" ]; then
  echo "Compiling only"
  exit 1;
fi

geth --verbosity 3 attach $GETHATTACHPOINT << EOF | tee -a $TEST1OUTPUT
loadScript("$BTTSFACTORYJS");
loadScript("lookups.js");
loadScript("functions.js");

var bttsLibAbi = JSON.parse(bttsFactoryOutput.contracts["$BTTSFACTORYSOL:BTTSLib"].abi);
var bttsLibBin = "0x" + bttsFactoryOutput.contracts["$BTTSFACTORYSOL:BTTSLib"].bin;
var bttsTokenAbi = JSON.parse(bttsFactoryOutput.contracts["$BTTSFACTORYSOL:BTTSToken"].abi);
var bttsFactoryAbi = JSON.parse(bttsFactoryOutput.contracts["$BTTSFACTORYSOL:BTTSTokenFactory"].abi);
var bttsFactoryBin = "0x" + bttsFactoryOutput.contracts["$BTTSFACTORYSOL:BTTSTokenFactory"].bin;

// console.log("DATA: bttsLibAbi=" + JSON.stringify(bttsLibAbi));
// console.log("DATA: bttsLibBin=" + JSON.stringify(bttsLibBin));
// console.log("DATA: bttsTokenAbi=" + JSON.stringify(bttsTokenAbi));
// console.log("DATA: bttsFactoryAbi=" + JSON.stringify(bttsFactoryAbi));
// console.log("DATA: bttsFactoryBin=" + JSON.stringify(bttsFactoryBin));


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

// Tokens
var ABC = 0;
var DEF = 1;
var GHI = 2;
var GZE = 3;

// -----------------------------------------------------------------------------
var deployTokens1Message = "Deploy Tokens";
var numberOfTokens = $NUMBEROFTOKENS;
var _tokenSymbols = "$TOKENSYMBOLS".split(":");
var _tokenNames = "$TOKENNAMES".split(":");
var _tokenDecimals = "$TOKENDECIMALS".split(":");
var _tokenInitialSupplies = "$TOKENINITIALSUPPLIES".split(":");
var _tokenInitialDistributions = "$TOKENINITIALDISTRIBUTION".split(":");
// console.log("RESULT: _tokenSymbols = " + JSON.stringify(_tokenSymbols));
// console.log("RESULT: _tokenNames = " + JSON.stringify(_tokenNames));
// console.log("RESULT: _tokenDecimals = " + JSON.stringify(_tokenDecimals));
// console.log("RESULT: _tokenInitialSupplies = " + JSON.stringify(_tokenInitialSupplies));
// console.log("RESULT: _tokenInitialDistributions = " + JSON.stringify(_tokenInitialDistributions));
var mintable = false;
var transferable = true;
var i;

// -----------------------------------------------------------------------------
console.log("RESULT: ---------- " + deployTokens1Message + " ----------");
var tokenTxs = [];
var tokens = [];
for (i = 0; i < numberOfTokens; i++) {
  tokenTxs[i] = bttsFactory.deployBTTSTokenContract(_tokenSymbols[i], _tokenNames[i], _tokenDecimals[i], _tokenInitialSupplies[i], mintable, transferable, {from: deployer, gas: 6000000, gasPrice: defaultGasPrice});
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
  failIfTxStatusError(tokenTxs[i], deployTokens1Message + " - Token ''" + tokens[i].symbol() + "' '" + tokens[i].name() + "'");
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


EOF
grep "DATA: " $TEST1OUTPUT | sed "s/DATA: //" > $DEPLOYMENTDATA
cat $DEPLOYMENTDATA
grep "RESULT: " $TEST1OUTPUT | sed "s/RESULT: //" > $TEST1RESULTS
cat $TEST1RESULTS
