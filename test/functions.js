// 3 Sep 2018 19:30 AEDT ETH/USD from CMC and ethgasstation.info
var ethPriceUSD = 288.17;
var defaultGasPrice = web3.toWei(3.1, "gwei");

// -----------------------------------------------------------------------------
// Accounts
// -----------------------------------------------------------------------------
var accounts = [];
var accountNames = {};

addAccount(eth.accounts[0], "Miner");
addAccount(eth.accounts[1], "Deployer");
addAccount(eth.accounts[2], "Wallet");
addAccount(eth.accounts[3], "User1");
addAccount(eth.accounts[4], "User2");
addAccount(eth.accounts[5], "User3");

var miner = eth.accounts[0];
var deployer = eth.accounts[1];
var wallet = eth.accounts[2];
var user1 = eth.accounts[3];
var user2 = eth.accounts[4];
var user3 = eth.accounts[5];

console.log("DATA: var miner=\"" + eth.accounts[0] + "\";");
console.log("DATA: var deployer=\"" + eth.accounts[1] + "\";");
console.log("DATA: var wallet=\"" + eth.accounts[2] + "\";");
console.log("DATA: var user1=\"" + eth.accounts[3] + "\";");
console.log("DATA: var user2=\"" + eth.accounts[4] + "\";");
console.log("DATA: var user3=\"" + eth.accounts[5] + "\";");

var baseBlock = eth.blockNumber;

function unlockAccounts(password) {
  for (var i = 0; i < eth.accounts.length && i < accounts.length; i++) {
    personal.unlockAccount(eth.accounts[i], password, 100000);
    if (i > 0 && eth.getBalance(eth.accounts[i]) == 0) {
      personal.sendTransaction({from: eth.accounts[0], to: eth.accounts[i], value: web3.toWei(1000000, "ether")});
    }
  }
  while (txpool.status.pending > 0) {
  }
  baseBlock = eth.blockNumber;
}

function addAccount(account, accountName) {
  accounts.push(account);
  accountNames[account] = accountName;
  addAddressNames(account, accountName);
}

addAddressNames("0x0000000000000000000000000000000000000000", "Null");

//-----------------------------------------------------------------------------
// Token Contracts
//-----------------------------------------------------------------------------
var _tokenContractAddresses = [];
var _tokenContractAbis = [];
var _tokens = [null, null, null, null];
var _symbols = ["0", "1", "2", "3"];
var _decimals = [18, 18, 18, 18];

function addTokenContractAddressAndAbi(i, address, abi) {
  _tokenContractAddresses[i] = address;
  _tokenContractAbis[i] = abi;
  _tokens[i] = web3.eth.contract(abi).at(address);
  _symbols[i] = _tokens[i].symbol();
  _decimals[i] = _tokens[i].decimals();
}


//-----------------------------------------------------------------------------
//Account ETH and token balances
//-----------------------------------------------------------------------------
function printBalances() {
  var i = 0;
  var j;
  var totalTokenBalances = [new BigNumber(0), new BigNumber(0), new BigNumber(0), new BigNumber(0)];
  console.log("RESULT:  # Account                                             EtherBalanceChange               " + padLeft(_symbols[0], 16) + "               " + padLeft(_symbols[1], 16) + " Name");
  // console.log("RESULT:                                                                                         " + padLeft(_symbols[2], 16) + "               " + padLeft(_symbols[3], 16));
  console.log("RESULT: -- ------------------------------------------ --------------------------- ------------------------------ ------------------------------ ---------------------------");
  accounts.forEach(function(e) {
    var etherBalanceBaseBlock = eth.getBalance(e, baseBlock);
    var etherBalance = web3.fromWei(eth.getBalance(e).minus(etherBalanceBaseBlock), "ether");
    var tokenBalances = [];
    for (j = 0; j < 2; j++) {
      tokenBalances[j] = _tokens[j] == null ? new BigNumber(0) : _tokens[j].balanceOf(e).shift(-_decimals[j]);
      totalTokenBalances[j] = totalTokenBalances[j].add(tokenBalances[j]);
    }
    console.log("RESULT: " + pad2(i) + " " + e  + " " + pad(etherBalance) + " " +
      padToken(tokenBalances[0], _decimals[0]) + " " + padToken(tokenBalances[1], _decimals[1]) + " " + accountNames[e]);
    // console.log("RESULT:                                                                           " +
    //   padToken(tokenBalances[2], _decimals[2]) + " " + padToken(tokenBalances[3], _decimals[3]));
    i++;
  });
  console.log("RESULT: -- ------------------------------------------ --------------------------- ------------------------------ ------------------------------ ---------------------------");
  console.log("RESULT:                                                                           " + padToken(totalTokenBalances[0], _decimals[0]) + " " + padToken(totalTokenBalances[1], _decimals[1]) + " Total Token Balances");
  // console.log("RESULT:                                                                           " + padToken(totalTokenBalances[2], _decimals[2]) + " " + padToken(totalTokenBalances[3], _decimals[3]));
  console.log("RESULT: -- ------------------------------------------ --------------------------- ------------------------------ ------------------------------ ---------------------------");
  console.log("RESULT: ");
}

function pad2(s) {
  var o = s.toFixed(0);
  while (o.length < 2) {
    o = " " + o;
  }
  return o;
}

function pad(s) {
  var o = s.toFixed(18);
  while (o.length < 27) {
    o = " " + o;
  }
  return o;
}

function padToken(s, decimals) {
  var o = s.toFixed(decimals);
  var l = parseInt(decimals)+12;
  while (o.length < l) {
    o = " " + o;
  }
  return o;
}

function padLeft(s, n) {
  var o = s;
  while (o.length < n) {
    o = " " + o;
  }
  return o;
}


// -----------------------------------------------------------------------------
// Transaction status
// -----------------------------------------------------------------------------
function printTxData(name, txId) {
  var tx = eth.getTransaction(txId);
  var txReceipt = eth.getTransactionReceipt(txId);
  var gasPrice = tx.gasPrice;
  var gasCostETH = tx.gasPrice.mul(txReceipt.gasUsed).div(1e18);
  var gasCostUSD = gasCostETH.mul(ethPriceUSD);
  var block = eth.getBlock(txReceipt.blockNumber);
  console.log("RESULT: " + name + " status=" + txReceipt.status + (txReceipt.status == 0 ? " Failure" : " Success") + " gas=" + tx.gas +
    " gasUsed=" + txReceipt.gasUsed + " costETH=" + gasCostETH + " costUSD=" + gasCostUSD +
    " @ ETH/USD=" + ethPriceUSD + " gasPrice=" + web3.fromWei(gasPrice, "gwei") + " gwei block=" +
    txReceipt.blockNumber + " txIx=" + tx.transactionIndex + " txId=" + txId +
    " @ " + block.timestamp + " " + new Date(block.timestamp * 1000).toUTCString());
}

function assertEtherBalance(account, expectedBalance) {
  var etherBalance = web3.fromWei(eth.getBalance(account), "ether");
  if (etherBalance == expectedBalance) {
    console.log("RESULT: OK " + account + " has expected balance " + expectedBalance);
  } else {
    console.log("RESULT: FAILURE " + account + " has balance " + etherBalance + " <> expected " + expectedBalance);
  }
}

function failIfTxStatusError(tx, msg) {
  var status = eth.getTransactionReceipt(tx).status;
  if (status == 0) {
    console.log("RESULT: FAIL " + msg);
    return 0;
  } else {
    console.log("RESULT: PASS " + msg);
    return 1;
  }
}

function passIfTxStatusError(tx, msg) {
  var status = eth.getTransactionReceipt(tx).status;
  if (status == 1) {
    console.log("RESULT: FAIL " + msg);
    return 0;
  } else {
    console.log("RESULT: PASS " + msg);
    return 1;
  }
}

function gasEqualsGasUsed(tx) {
  var gas = eth.getTransaction(tx).gas;
  var gasUsed = eth.getTransactionReceipt(tx).gasUsed;
  return (gas == gasUsed);
}

function failIfGasEqualsGasUsed(tx, msg) {
  var gas = eth.getTransaction(tx).gas;
  var gasUsed = eth.getTransactionReceipt(tx).gasUsed;
  if (gas == gasUsed) {
    console.log("RESULT: FAIL " + msg);
    return 0;
  } else {
    console.log("RESULT: PASS " + msg);
    return 1;
  }
}

function passIfGasEqualsGasUsed(tx, msg) {
  var gas = eth.getTransaction(tx).gas;
  var gasUsed = eth.getTransactionReceipt(tx).gasUsed;
  if (gas == gasUsed) {
    console.log("RESULT: PASS " + msg);
    return 1;
  } else {
    console.log("RESULT: FAIL " + msg);
    return 0;
  }
}

function failIfGasEqualsGasUsedOrContractAddressNull(contractAddress, tx, msg) {
  if (contractAddress == null) {
    console.log("RESULT: FAIL " + msg);
    return 0;
  } else {
    var gas = eth.getTransaction(tx).gas;
    var gasUsed = eth.getTransactionReceipt(tx).gasUsed;
    if (gas == gasUsed) {
      console.log("RESULT: FAIL " + msg);
      return 0;
    } else {
      console.log("RESULT: PASS " + msg);
      return 1;
    }
  }
}


//-----------------------------------------------------------------------------
// Wait one block
//-----------------------------------------------------------------------------
function waitOneBlock(oldCurrentBlock) {
  while (eth.blockNumber <= oldCurrentBlock) {
  }
  console.log("RESULT: Waited one block");
  console.log("RESULT: ");
  return eth.blockNumber;
}


//-----------------------------------------------------------------------------
// Pause for {x} seconds
//-----------------------------------------------------------------------------
function pause(message, addSeconds) {
  var time = new Date((parseInt(new Date().getTime()/1000) + addSeconds) * 1000);
  console.log("RESULT: Pausing '" + message + "' for " + addSeconds + "s=" + time + " now=" + new Date());
  while ((new Date()).getTime() <= time.getTime()) {
  }
  console.log("RESULT: Paused '" + message + "' for " + addSeconds + "s=" + time + " now=" + new Date());
  console.log("RESULT: ");
}


//-----------------------------------------------------------------------------
//Wait until some unixTime + additional seconds
//-----------------------------------------------------------------------------
function waitUntil(message, unixTime, addSeconds) {
  var t = parseInt(unixTime) + parseInt(addSeconds) + parseInt(1);
  var time = new Date(t * 1000);
  console.log("RESULT: Waiting until '" + message + "' at " + unixTime + "+" + addSeconds + "s=" + time + " now=" + new Date());
  while ((new Date()).getTime() <= time.getTime()) {
  }
  console.log("RESULT: Waited until '" + message + "' at at " + unixTime + "+" + addSeconds + "s=" + time + " now=" + new Date());
  console.log("RESULT: ");
}


//-----------------------------------------------------------------------------
//Wait until some block
//-----------------------------------------------------------------------------
function waitUntilBlock(message, block, addBlocks) {
  var b = parseInt(block) + parseInt(addBlocks) + parseInt(1);
  console.log("RESULT: Waiting until '" + message + "' #" + block + "+" + addBlocks + "=#" + b + " currentBlock=" + eth.blockNumber);
  while (eth.blockNumber <= b) {
  }
  console.log("RESULT: Waited until '" + message + "' #" + block + "+" + addBlocks + "=#" + b + " currentBlock=" + eth.blockNumber);
  console.log("RESULT: ");
}


//-----------------------------------------------------------------------------
// Token Contract
//-----------------------------------------------------------------------------
var tokenFromBlock = [0, 0, 0, 0];
function printTokenContractDetails(j) {
  if (tokenFromBlock[j] == 0) {
    tokenFromBlock[j] = baseBlock;
  }
  console.log("RESULT: token" + j + "ContractAddress=" + getShortAddressName(_tokenContractAddresses[j]));
  if (_tokenContractAddresses[j] != null) {
    var contract = _tokens[j];
    var decimals = _decimals[j];
    console.log("RESULT: token" + j + ".owner/new=" + getShortAddressName(contract.owner()) + "/" + getShortAddressName(contract.newOwner()));
    console.log("RESULT: token" + j + ".details='" + contract.symbol() + "' '" + contract.name() + "' " + decimals + " dp");
    console.log("RESULT: token" + j + ".totalSupply=" + contract.totalSupply().shift(-decimals));
    console.log("RESULT: token" + j + ".mintable=" + contract.mintable());
    console.log("RESULT: token" + j + ".transferable=" + contract.transferable());
    console.log("RESULT: token" + j + ".minter=" + getShortAddressName(contract.minter()));

    var latestBlock = eth.blockNumber;
    var i;

    var ownershipTransferredEvents = contract.OwnershipTransferred({}, { fromBlock: tokenFromBlock[j], toBlock: latestBlock });
    i = 0;
    ownershipTransferredEvents.watch(function (error, result) {
      console.log("RESULT: token" + j + ".OwnershipTransferred " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
    });
    ownershipTransferredEvents.stopWatching();

    var minterUpdatedEvents = contract.MinterUpdated({}, { fromBlock: tokenFromBlock[j], toBlock: latestBlock });
    i = 0;
    minterUpdatedEvents.watch(function (error, result) {
      console.log("RESULT: token" + j + ".MinterUpdated " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
    });
    minterUpdatedEvents.stopWatching();

    var mintEvents = contract.Mint({}, { fromBlock: tokenFromBlock[j], toBlock: latestBlock });
    i = 0;
    mintEvents.watch(function (error, result) {
      console.log("RESULT: token" + j + ".Mint " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
    });
    mintEvents.stopWatching();

    var mintingDisabledEvents = contract.MintingDisabled({}, { fromBlock: tokenFromBlock[j], toBlock: latestBlock });
    i = 0;
    mintingDisabledEvents.watch(function (error, result) {
      console.log("RESULT: token" + j + ".MintingDisabled " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
    });
    mintingDisabledEvents.stopWatching();

    var transfersEnabledEvents = contract.TransfersEnabled({}, { fromBlock: tokenFromBlock[j], toBlock: latestBlock });
    i = 0;
    transfersEnabledEvents.watch(function (error, result) {
      console.log("RESULT: token" + j + ".TransfersEnabled " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
    });
    transfersEnabledEvents.stopWatching();

    var approvalEvents = contract.Approval({}, { fromBlock: tokenFromBlock[j], toBlock: latestBlock });
    i = 0;
    approvalEvents.watch(function (error, result) {
      // console.log("RESULT: token" + j + ".Approval " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result));
      console.log("RESULT: token" + j + ".Approval " + i++ + " #" + result.blockNumber +
        " tokenOwner=" + getShortAddressName(result.args.tokenOwner) +
        " spender=" + getShortAddressName(result.args.spender) + " tokens=" + result.args.tokens.shift(-decimals));
    });
    approvalEvents.stopWatching();

    var transferEvents = contract.Transfer({}, { fromBlock: tokenFromBlock[j], toBlock: latestBlock });
    i = 0;
    transferEvents.watch(function (error, result) {
      // console.log("RESULT: token" + j + ".Transfer " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result));
      console.log("RESULT: token" + j + ".Transfer " + i++ + " #" + result.blockNumber +
        " from=" + getShortAddressName(result.args.from) +
        " to=" + getShortAddressName(result.args.to) + " tokens=" + result.args.tokens.shift(-decimals));
    });
    transferEvents.stopWatching();

    tokenFromBlock[j] = latestBlock + 1;
  }
}


//-----------------------------------------------------------------------------
// Factory Contract
//-----------------------------------------------------------------------------
var factoryContractAddress = null;
var factoryContractAbi = null;
function addFactoryContractAddressAndAbi(address, abi) {
  factoryContractAddress = address;
  factoryContractAbi = abi;
}
var factoryFromBlock = 0;
function getBTTSFactoryTokenListing() {
  if (factoryFromBlock == 0) {
    factoryFromBlock = baseBlock;
  }
  var addresses = [];
  console.log("RESULT: factoryContractAddress=" + factoryContractAddress);
  if (factoryContractAddress != null && factoryContractAbi != null) {
    var contract = eth.contract(factoryContractAbi).at(factoryContractAddress);

    var latestBlock = eth.blockNumber;
    var i;

    var bttsTokenListingEvents = contract.BTTSTokenListing({}, { fromBlock: factoryFromBlock, toBlock: latestBlock });
    i = 0;
    bttsTokenListingEvents.watch(function (error, result) {
      console.log("RESULT: get BTTSTokenListing " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
      addresses.push(result.args.bttsTokenAddress);
    });
    bttsTokenListingEvents.stopWatching();
  }
  return addresses;
}
function printFactoryContractDetails() {
  if (factoryFromBlock == 0) {
    factoryFromBlock = baseBlock;
  }
  console.log("RESULT: factoryContract.address=" + getShortAddressName(factoryContractAddress));
  if (factoryContractAddress != null && factoryContractAbi != null) {
    var contract = eth.contract(factoryContractAbi).at(factoryContractAddress);
    console.log("RESULT: factory.owner/new=" + getShortAddressName(contract.owner()) + "/" + getShortAddressName(contract.newOwner()));
    console.log("RESULT: factory.numberOfDeployedTokens=" + contract.numberOfDeployedTokens());
    var i;
    for (i = 0; i < contract.numberOfDeployedTokens(); i++) {
        console.log("RESULT: factory.deployedTokens(" + i + ")=" + JSON.stringify(contract.bttsTokenDetails(contract.deployedTokens(i))));
        console.log("RESULT: factory.verify(" + i + ")=" + JSON.stringify(contract.verify(contract.deployedTokens(i))));
    }

    var latestBlock = eth.blockNumber;

    var ownershipTransferredEvents = contract.OwnershipTransferred({}, { fromBlock: factoryFromBlock, toBlock: latestBlock });
    i = 0;
    ownershipTransferredEvents.watch(function (error, result) {
      console.log("RESULT: OwnershipTransferred " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
    });
    ownershipTransferredEvents.stopWatching();

    var bttsTokenListingEvents = contract.BTTSTokenListing({}, { fromBlock: factoryFromBlock, toBlock: latestBlock });
    i = 0;
    bttsTokenListingEvents.watch(function (error, result) {
      console.log("RESULT: BTTSTokenListing " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
    });
    bttsTokenListingEvents.stopWatching();

    factoryFromBlock = latestBlock + 1;
  }
}


//-----------------------------------------------------------------------------
// ETH/USD PriceFeed Contract
//-----------------------------------------------------------------------------
var ethUsdPriceFeedContractAddress = null;
var ethUsdPriceFeedContractAbi = null;
function addEthUsdPriceFeedContractAddressAndAbi(address, abi) {
  ethUsdPriceFeedContractAddress = address;
  ethUsdPriceFeedContractAbi = abi;
}
var ethUsdPriceFeedFromBlock = 0;
function printEthUsdPriceFeedContractDetails() {
  if (ethUsdPriceFeedFromBlock == 0) {
    ethUsdPriceFeedFromBlock = baseBlock;
  }
  console.log("RESULT: ethUsdPriceFeedContract.address=" + getShortAddressName(ethUsdPriceFeedContractAddress));
  if (ethUsdPriceFeedContractAddress != null && ethUsdPriceFeedContractAbi != null) {
    var contract = eth.contract(ethUsdPriceFeedContractAbi).at(ethUsdPriceFeedContractAddress);
    // console.log("RESULT: ethUsdPriceFeed.owner/new=" + getShortAddressName(contract.owner()) + "/" + getShortAddressName(contract.newOwner()));
    console.log("RESULT: ethUsdPriceFeed.makerDAOPriceFeed=" + getShortAddressName(contract.makerDAOPriceFeed()));
    var rate = contract.getRate();
    console.log("RESULT: ethUsdPriceFeed.ethUsd=" + rate[0].shift(-18) + " " + rate[1]);

    var i;
    var latestBlock = eth.blockNumber;

    // var ownershipTransferredEvents = contract.OwnershipTransferred({}, { fromBlock: ethUsdPriceFeedFromBlock, toBlock: latestBlock });
    // i = 0;
    // ownershipTransferredEvents.watch(function (error, result) {
    //   console.log("RESULT: OwnershipTransferred " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
    // });
    // ownershipTransferredEvents.stopWatching();
    //
    // var setRateEvents = contract.SetRate({}, { fromBlock: ethUsdPriceFeedFromBlock, toBlock: latestBlock });
    // i = 0;
    // setRateEvents.watch(function (error, result) {
    //   console.log("RESULT: SetRate " + i++ + " #" + result.blockNumber + " oldRate=" + result.args.oldRate.shift(-18) +
    //     " oldLive=" + result.args.oldLive + " newRate=" + result.args.newRate.shift(-18) +
    //     " newLive=" + result.args.newLive);
    // });
    // setRateEvents.stopWatching();

    ethUsdPriceFeedFromBlock = latestBlock + 1;
  }
}


//-----------------------------------------------------------------------------
// ETH/USD PriceFeed Contract
//-----------------------------------------------------------------------------
var gzeEthPriceFeedContractAddress = null;
var gzeEthPriceFeedContractAbi = null;
function addGzeEthPriceFeedContractAddressAndAbi(address, abi) {
  gzeEthPriceFeedContractAddress = address;
  gzeEthPriceFeedContractAbi = abi;
}
var gzeEthPriceFeedFromBlock = 0;
function printGzeEthPriceFeedContractDetails() {
  if (gzeEthPriceFeedFromBlock == 0) {
    gzeEthPriceFeedFromBlock = baseBlock;
  }
  console.log("RESULT: gzeEthPriceFeedContract.address=" + getShortAddressName(gzeEthPriceFeedContractAddress));
  if (gzeEthPriceFeedContractAddress != null && gzeEthPriceFeedContractAbi != null) {
    var contract = eth.contract(gzeEthPriceFeedContractAbi).at(gzeEthPriceFeedContractAddress);
    console.log("RESULT: gzeEthPriceFeed.owner/new=" + getShortAddressName(contract.owner()) + "/" + getShortAddressName(contract.newOwner()));
    console.log("RESULT: gzeEthPriceFeed.name=" + contract.name());
    console.log("RESULT: gzeEthPriceFeed.rate=" + contract.rate().shift(-18));
    console.log("RESULT: gzeEthPriceFeed.live=" + contract.live());

    var i;
    var latestBlock = eth.blockNumber;

    var ownershipTransferredEvents = contract.OwnershipTransferred({}, { fromBlock: gzeEthPriceFeedFromBlock, toBlock: latestBlock });
    i = 0;
    ownershipTransferredEvents.watch(function (error, result) {
      console.log("RESULT: OwnershipTransferred " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
    });
    ownershipTransferredEvents.stopWatching();

    var operatorAddedEvents = contract.OperatorAdded({}, { fromBlock: gzeEthPriceFeedFromBlock, toBlock: latestBlock });
    i = 0;
    operatorAddedEvents.watch(function (error, result) {
      console.log("RESULT: OperatorAdded " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
    });
    operatorAddedEvents.stopWatching();

    var operatorRemovedEvents = contract.OperatorRemoved({}, { fromBlock: gzeEthPriceFeedFromBlock, toBlock: latestBlock });
    i = 0;
    operatorRemovedEvents.watch(function (error, result) {
      console.log("RESULT: OperatorRemoved " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
    });
    operatorRemovedEvents.stopWatching();

    var setRateEvents = contract.SetRate({}, { fromBlock: gzeEthPriceFeedFromBlock, toBlock: latestBlock });
    i = 0;
    setRateEvents.watch(function (error, result) {
      console.log("RESULT: SetRate " + i++ + " #" + result.blockNumber + " oldRate=" + result.args.oldRate.shift(-18) +
        " oldLive=" + result.args.oldLive + " newRate=" + result.args.newRate.shift(-18) +
        " newLive=" + result.args.newLive);
    });
    setRateEvents.stopWatching();

    gzeEthPriceFeedFromBlock = latestBlock + 1;
  }
}


//-----------------------------------------------------------------------------
// ETH/USD PriceFeed Contract
//-----------------------------------------------------------------------------
var bonusListContractAddress = null;
var bonusListContractAbi = null;
function addBonusListContractAddressAndAbi(address, abi) {
  bonusListContractAddress = address;
  bonusListContractAbi = abi;
}
var bonusListFromBlock = 0;
function printBonusListContractDetails() {
  if (bonusListFromBlock == 0) {
    bonusListFromBlock = baseBlock;
  }
  console.log("RESULT: bonusListContract.address=" + getShortAddressName(bonusListContractAddress));
  if (bonusListContractAddress != null && bonusListContractAbi != null) {
    var contract = eth.contract(bonusListContractAbi).at(bonusListContractAddress);
    console.log("RESULT: bonusList.owner/new=" + getShortAddressName(contract.owner()) + "/" + getShortAddressName(contract.newOwner()));
    console.log("RESULT: bonusList.isInBonusList(user1)=" + contract.isInBonusList(user1));
    console.log("RESULT: bonusList.isInBonusList(user2)=" + contract.isInBonusList(user2));
    console.log("RESULT: bonusList.isInBonusList(user3)=" + contract.isInBonusList(user3));

    var i;
    var latestBlock = eth.blockNumber;

    var ownershipTransferredEvents = contract.OwnershipTransferred({}, { fromBlock: bonusListFromBlock, toBlock: latestBlock });
    i = 0;
    ownershipTransferredEvents.watch(function (error, result) {
      console.log("RESULT: OwnershipTransferred " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
    });
    ownershipTransferredEvents.stopWatching();

    var operatorAddedEvents = contract.OperatorAdded({}, { fromBlock: bonusListFromBlock, toBlock: latestBlock });
    i = 0;
    operatorAddedEvents.watch(function (error, result) {
      console.log("RESULT: OperatorAdded " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
    });
    operatorAddedEvents.stopWatching();

    var operatorRemovedEvents = contract.OperatorRemoved({}, { fromBlock: bonusListFromBlock, toBlock: latestBlock });
    i = 0;
    operatorRemovedEvents.watch(function (error, result) {
      console.log("RESULT: OperatorRemoved " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
    });
    operatorRemovedEvents.stopWatching();

    var accountListedEvents = contract.AccountListed({}, { fromBlock: bonusListFromBlock, toBlock: latestBlock });
    i = 0;
    accountListedEvents.watch(function (error, result) {
      console.log("RESULT: AccountListed " + i++ + " #" + result.blockNumber + " account=" + result.args.account +
        " status=" + result.args.status);
    });
    accountListedEvents.stopWatching();

    bonusListFromBlock = latestBlock + 1;
  }
}


//-----------------------------------------------------------------------------
// LandRush Contract
//-----------------------------------------------------------------------------
var landRushContractAddress = null;
var landRushContractAbi = null;
function addLandRushContractAddressAndAbi(address, abi) {
  landRushContractAddress = address;
  landRushContractAbi = abi;
}
var landRushFromBlock = 0;
function printLandRushContractDetails() {
  if (landRushFromBlock == 0) {
    landRushFromBlock = baseBlock;
  }
  console.log("RESULT: landRushContract.address=" + getShortAddressName(landRushContractAddress));
  if (landRushContractAddress != null && landRushContractAbi != null) {
    var contract = eth.contract(landRushContractAbi).at(landRushContractAddress);
    console.log("RESULT: landRush.owner/new=" + getShortAddressName(contract.owner()) + "/" + getShortAddressName(contract.newOwner()));
    console.log("RESULT: landRush.symbol/name='" + contract.symbol() + "'/'" + contract.name() + "'");
    console.log("RESULT: landRush.parcelToken=" + getShortAddressName(contract.parcelToken()));
    console.log("RESULT: landRush.gzeToken=" + getShortAddressName(contract.gzeToken()));
    console.log("RESULT: landRush.ethUsdPriceFeed=" + getShortAddressName(contract.ethUsdPriceFeed()));
    console.log("RESULT: landRush.gzeEthPriceFeed=" + getShortAddressName(contract.gzeEthPriceFeed()));
    console.log("RESULT: landRush.bonusList=" + getShortAddressName(contract.bonusList()));
    console.log("RESULT: landRush.wallet=" + getShortAddressName(contract.wallet()));
    console.log("RESULT: landRush.startDate=" + new Date(contract.startDate() * 1000).toString());
    console.log("RESULT: landRush.endDate=" + new Date(contract.endDate() * 1000).toString());
    console.log("RESULT: landRush.maxParcels=" + contract.maxParcels());
    console.log("RESULT: landRush.parcelUsd=" + contract.parcelUsd().shift(-18));
    console.log("RESULT: landRush.usdLockAccountThreshold=" + contract.usdLockAccountThreshold().shift(-18));
    console.log("RESULT: landRush.gzeBonusOffList=" + contract.gzeBonusOffList());
    console.log("RESULT: landRush.gzeBonusOnList=" + contract.gzeBonusOnList());
    console.log("RESULT: landRush.parcelsSold=" + contract.parcelsSold());
    console.log("RESULT: landRush.contributedGze=" + contract.contributedGze().shift(-18));
    console.log("RESULT: landRush.contributedEth=" + contract.contributedEth().shift(-18));
    console.log("RESULT: landRush.finalised=" + contract.finalised());

    var ethUsd = contract.ethUsd();
    console.log("RESULT: landRush.ethUsd=" + ethUsd[0].shift(-18) + " " + ethUsd[1]);
    var gzeEth = contract.gzeEth();
    console.log("RESULT: landRush.gzeEth=" + gzeEth[0].shift(-18) + " " + gzeEth[1]);
    var gzeUsd = contract.gzeUsd();
    console.log("RESULT: landRush.gzeUsd=" + gzeUsd[0].shift(-18) + " " + gzeUsd[1]);
    var parcelEth = contract.parcelEth();
    console.log("RESULT: landRush.parcelEth=" + parcelEth[0].shift(-18) + " " + parcelEth[1]);
    var parcelGzeWithoutBonus = contract.parcelGzeWithoutBonus();
    console.log("RESULT: landRush.parcelGzeWithoutBonus=" + parcelGzeWithoutBonus[0].shift(-18) + " " + parcelGzeWithoutBonus[1]);
    var parcelGzeWithBonusOffList = contract.parcelGzeWithBonusOffList();
    console.log("RESULT: landRush.parcelGzeWithBonusOffList=" + parcelGzeWithBonusOffList[0].shift(-18) + " " + parcelGzeWithBonusOffList[1]);
    var parcelGzeWithBonusOnList = contract.parcelGzeWithBonusOnList();
    console.log("RESULT: landRush.parcelGzeWithBonusOnList=" + parcelGzeWithBonusOnList[0].shift(-18) + " " + parcelGzeWithBonusOnList[1]);

    var i;
    var latestBlock = eth.blockNumber;

    var ownershipTransferredEvents = contract.OwnershipTransferred({}, { fromBlock: landRushFromBlock, toBlock: latestBlock });
    i = 0;
    ownershipTransferredEvents.watch(function (error, result) {
      console.log("RESULT: OwnershipTransferred " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
    });
    ownershipTransferredEvents.stopWatching();

    var walletUpdatedEvents = contract.WalletUpdated({}, { fromBlock: landRushFromBlock, toBlock: latestBlock });
    i = 0;
    walletUpdatedEvents.watch(function (error, result) {
      console.log("RESULT: WalletUpdated " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
    });
    walletUpdatedEvents.stopWatching();

    var startDateUpdatedEvents = contract.StartDateUpdated({}, { fromBlock: landRushFromBlock, toBlock: latestBlock });
    i = 0;
    startDateUpdatedEvents.watch(function (error, result) {
      console.log("RESULT: StartDateUpdated " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
    });
    startDateUpdatedEvents.stopWatching();

    var endDateUpdatedEvents = contract.EndDateUpdated({}, { fromBlock: landRushFromBlock, toBlock: latestBlock });
    i = 0;
    endDateUpdatedEvents.watch(function (error, result) {
      console.log("RESULT: EndDateUpdated " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
    });
    endDateUpdatedEvents.stopWatching();

    var maxParcelsUpdatedEvents = contract.MaxParcelsUpdated({}, { fromBlock: landRushFromBlock, toBlock: latestBlock });
    i = 0;
    maxParcelsUpdatedEvents.watch(function (error, result) {
      console.log("RESULT: MaxParcelsUpdated " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
    });
    maxParcelsUpdatedEvents.stopWatching();

    var parcelUsdUpdatedEvents = contract.ParcelUsdUpdated({}, { fromBlock: landRushFromBlock, toBlock: latestBlock });
    i = 0;
    parcelUsdUpdatedEvents.watch(function (error, result) {
      console.log("RESULT: ParcelUsdUpdated " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
    });
    parcelUsdUpdatedEvents.stopWatching();

    var usdLockAccountThresholdUpdatedEvents = contract.UsdLockAccountThresholdUpdated({}, { fromBlock: landRushFromBlock, toBlock: latestBlock });
    i = 0;
    usdLockAccountThresholdUpdatedEvents.watch(function (error, result) {
      console.log("RESULT: UsdLockAccountThresholdUpdated " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
    });
    usdLockAccountThresholdUpdatedEvents.stopWatching();

    var gzeBonusOffListUpdatedEvents = contract.GzeBonusOffListUpdated({}, { fromBlock: landRushFromBlock, toBlock: latestBlock });
    i = 0;
    gzeBonusOffListUpdatedEvents.watch(function (error, result) {
      console.log("RESULT: GzeBonusOffListUpdated " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
    });
    gzeBonusOffListUpdatedEvents.stopWatching();

    var gzeBonusOnListUpdatedEvents = contract.GzeBonusOnListUpdated({}, { fromBlock: landRushFromBlock, toBlock: latestBlock });
    i = 0;
    gzeBonusOnListUpdatedEvents.watch(function (error, result) {
      console.log("RESULT: GzeBonusOnListUpdated " + i++ + " #" + result.blockNumber + " " + JSON.stringify(result.args));
    });
    gzeBonusOnListUpdatedEvents.stopWatching();

    var purchasedEvents = contract.Purchased({}, { fromBlock: landRushFromBlock, toBlock: latestBlock });
    i = 0;
    purchasedEvents.watch(function (error, result) {
      console.log("RESULT: Purchased " + i++ + " #" + result.blockNumber + " addr=" + result.args.addr + " parcels=" + result.args.parcels +
        " gzeToTransfer=" + result.args.gzeToTransfer.shift(-18) + " ethToTransfer=" + result.args.ethToTransfer.shift(-18) +
        " parcelsSold=" + result.args.parcelsSold +
        " contributedGze=" + result.args.contributedGze.shift(-18) + " contributedEth=" + result.args.contributedEth.shift(-18) +
        " lockAccount=" + result.args.lockAccount);
    });
    purchasedEvents.stopWatching();

    landRushFromBlock = latestBlock + 1;
  }
}
