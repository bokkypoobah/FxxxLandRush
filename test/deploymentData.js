var miner="0xa00af22d07c87d96eeeb0ed583f8f6ac7812827e";
var deployer="0xa11aae29840fbb5c86e6fd4cf809eba183aef433";
var wallet="0xa22ab8a9d641ce77e06d98b7d7065d324d3d6976";
var user1="0xa33a6c312d9ad0e0f2e95541beed0cc081621fd0";
var user2="0xa44a08d3f6933c69212114bb66e2df1813651844";
var user3="0xa55a151eb00fded1634d27d1127b4be4627079ea";
var bttsLibAddress="0x32a391d90fed661cc45de0590654bef58f9d6c29";
var bttsLibAbi=[{"constant":false,"inputs":[{"name":"self","type":"BTTSLib.Data storage"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"self","type":"BTTSLib.Data storage"},{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"sig","type":"bytes"},{"name":"feeAccount","type":"address"}],"name":"signedApprove","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"self","type":"BTTSLib.Data storage"},{"name":"spender","type":"address"},{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"sig","type":"bytes"},{"name":"feeAccount","type":"address"}],"name":"signedTransferFromCheck","outputs":[{"name":"result","type":"BTTSTokenInterface.CheckResult"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"signedApproveAndCallSig","outputs":[{"name":"","type":"bytes4"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"self","type":"BTTSLib.Data storage"},{"name":"owner","type":"address"},{"name":"symbol","type":"string"},{"name":"name","type":"string"},{"name":"decimals","type":"uint8"},{"name":"initialSupply","type":"uint256"},{"name":"mintable","type":"bool"},{"name":"transferable","type":"bool"}],"name":"init","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"BTTSLib.Data storage"},{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"}],"name":"signedApproveHash","outputs":[{"name":"hash","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"self","type":"BTTSLib.Data storage"},{"name":"tokenOwner","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"sig","type":"bytes"},{"name":"feeAccount","type":"address"}],"name":"signedTransfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"self","type":"BTTSLib.Data storage"},{"name":"minter","type":"address"}],"name":"setMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"self","type":"BTTSLib.Data storage"},{"name":"spender","type":"address"},{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"sig","type":"bytes"},{"name":"feeAccount","type":"address"}],"name":"signedTransferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"signedTransferSig","outputs":[{"name":"","type":"bytes4"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"self","type":"BTTSLib.Data storage"},{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"self","type":"BTTSLib.Data storage"},{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"self","type":"BTTSLib.Data storage"},{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"self","type":"BTTSLib.Data storage"},{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"BTTSLib.Data storage"},{"name":"spender","type":"address"},{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"}],"name":"signedTransferFromHash","outputs":[{"name":"hash","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"BTTSLib.Data storage"},{"name":"tokenOwner","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"}],"name":"signedTransferHash","outputs":[{"name":"hash","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"bttsVersion","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"self","type":"BTTSLib.Data storage"},{"name":"newOwner","type":"address"}],"name":"transferOwnershipImmediately","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"self","type":"BTTSLib.Data storage"}],"name":"enableTransfers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"self","type":"BTTSLib.Data storage"},{"name":"tokenOwner","type":"address"},{"name":"tokens","type":"uint256"},{"name":"lockAccount","type":"bool"}],"name":"mint","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"signedApproveSig","outputs":[{"name":"","type":"bytes4"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"self","type":"BTTSLib.Data storage"},{"name":"tokenOwner","type":"address"}],"name":"unlockAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"self","type":"BTTSLib.Data storage"},{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"sig","type":"bytes"},{"name":"feeAccount","type":"address"}],"name":"signedApproveCheck","outputs":[{"name":"result","type":"BTTSTokenInterface.CheckResult"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"self","type":"BTTSLib.Data storage"},{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"signedTransferFromSig","outputs":[{"name":"","type":"bytes4"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"BTTSLib.Data storage"},{"name":"result","type":"BTTSTokenInterface.CheckResult"}],"name":"getCheckResultMessage","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"hash","type":"bytes32"},{"name":"sig","type":"bytes"}],"name":"ecrecoverFromSig","outputs":[{"name":"recoveredAddress","type":"address"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"self","type":"BTTSLib.Data storage"},{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"sig","type":"bytes"},{"name":"feeAccount","type":"address"}],"name":"signedApproveAndCallCheck","outputs":[{"name":"result","type":"BTTSTokenInterface.CheckResult"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"signingPrefix","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"self","type":"BTTSLib.Data storage"}],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"BTTSLib.Data storage"},{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"}],"name":"signedApproveAndCallHash","outputs":[{"name":"hash","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"self","type":"BTTSLib.Data storage"},{"name":"tokenOwner","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"sig","type":"bytes"},{"name":"feeAccount","type":"address"}],"name":"signedTransferCheck","outputs":[{"name":"result","type":"BTTSTokenInterface.CheckResult"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"self","type":"BTTSLib.Data storage"},{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"sig","type":"bytes"},{"name":"feeAccount","type":"address"}],"name":"signedApproveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"self","type":"BTTSLib.Data storage"}],"name":"disableMinting","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"MinterUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"},{"indexed":false,"name":"lockAccount","type":"bool"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintingDisabled","type":"event"},{"anonymous":false,"inputs":[],"name":"TransfersEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"}],"name":"AccountUnlocked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}];
var bttsLib=eth.contract(bttsLibAbi).at(bttsLibAddress);
var bttsFactoryAddress="0x938d22c583154e944cc0f6e83749261d88bf01f0";
var bttsFactoryAbi=[{"constant":false,"inputs":[{"name":"symbol","type":"string"},{"name":"name","type":"string"},{"name":"decimals","type":"uint8"},{"name":"initialSupply","type":"uint256"},{"name":"mintable","type":"bool"},{"name":"transferable","type":"bool"}],"name":"deployBTTSTokenContract","outputs":[{"name":"bttsTokenAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"numberOfDeployedTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenContract","type":"address"}],"name":"verify","outputs":[{"name":"valid","type":"bool"},{"name":"owner","type":"address"},{"name":"decimals","type":"uint256"},{"name":"mintable","type":"bool"},{"name":"transferable","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnershipImmediately","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"deployedTokens","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"ownerAddress","type":"address"},{"indexed":true,"name":"bttsTokenAddress","type":"address"},{"indexed":false,"name":"symbol","type":"string"},{"indexed":false,"name":"name","type":"string"},{"indexed":false,"name":"decimals","type":"uint8"},{"indexed":false,"name":"initialSupply","type":"uint256"},{"indexed":false,"name":"mintable","type":"bool"},{"indexed":false,"name":"transferable","type":"bool"}],"name":"BTTSTokenListing","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"}];
var bttsFactory=eth.contract(bttsFactoryAbi).at(bttsFactoryAddress);
var makerDaoEthUsdPriceFeedAddress="0xb196e7fe3b147dc8421deb884a1fba46cd8e2b63";
var makerDaoEthUsdPriceFeedAbi=[{"constant":true,"inputs":[],"name":"hasValue","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"value","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"peek","outputs":[{"name":"_value","type":"bytes32"},{"name":"_hasValue","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnershipImmediately","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"},{"name":"_hasValue","type":"bool"}],"name":"setValue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_value","type":"uint256"},{"name":"_hasValue","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldValue","type":"uint256"},{"indexed":false,"name":"oldHasValue","type":"bool"},{"indexed":false,"name":"newValue","type":"uint256"},{"indexed":false,"name":"newHasValue","type":"bool"}],"name":"SetValue","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"}];
var makerDaoEthUsdPriceFeed=eth.contract(makerDaoEthUsdPriceFeedAbi).at(makerDaoEthUsdPriceFeedAddress);
var makerDaoPriceFeedAdaptorAddress="0x1aa3ebfd892954f32a37b698673505d1dafef4f5";
var makerDaoPriceFeedAdaptorAbi=[{"constant":true,"inputs":[],"name":"makerDAOPriceFeed","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getRate","outputs":[{"name":"_rate","type":"uint256"},{"name":"_live","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_makerDAOPriceFeed","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
var makerDaoPriceFeedAdaptor=eth.contract(makerDaoPriceFeedAdaptorAbi).at(makerDaoPriceFeedAdaptorAddress);
var gzeEthPriceFeedAddress="0xe00ccdd988b1395489290c4c22e85a9c989f40f6";
var gzeEthPriceFeedAbi=[{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"operators","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getRate","outputs":[{"name":"_rate","type":"uint256"},{"name":"_live","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_rate","type":"uint256"},{"name":"_live","type":"bool"}],"name":"setRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnershipImmediately","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"live","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_operator","type":"address"}],"name":"addOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_operator","type":"address"}],"name":"removeOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_rate","type":"uint256"},{"name":"_live","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldRate","type":"uint256"},{"indexed":false,"name":"oldLive","type":"bool"},{"indexed":false,"name":"newRate","type":"uint256"},{"indexed":false,"name":"newLive","type":"bool"}],"name":"SetRate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_operator","type":"address"}],"name":"OperatorAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_operator","type":"address"}],"name":"OperatorRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"}];
var gzeEthPriceFeed=eth.contract(gzeEthPriceFeedAbi).at(gzeEthPriceFeedAddress);
var bonusListAddress="0xf3d9d349146b55cf4e0b622edc71bc4af76b014c";
var bonusListAbi=[{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"operators","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"accounts","type":"address[]"}],"name":"remove","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"bonusList","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnershipImmediately","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isInBonusList","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_operator","type":"address"}],"name":"addOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_operator","type":"address"}],"name":"removeOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accounts","type":"address[]"}],"name":"add","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"},{"indexed":false,"name":"status","type":"bool"}],"name":"AccountListed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_operator","type":"address"}],"name":"OperatorAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_operator","type":"address"}],"name":"OperatorRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"}];
var bonusList=eth.contract(bonusListAbi).at(bonusListAddress);
var landRushAddress="0xd53380f36e665634cf48ec4745c7095cde2c9d7f";
var landRushAbi=[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"_name","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"parcelsSold","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"startDate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"finalised","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"bonusList","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_endDate","type":"uint256"}],"name":"setEndDate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ethUsdPriceFeed","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"parcelGzeWithBonusOffList","outputs":[{"name":"_rate","type":"uint256"},{"name":"_live","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gzeBonusOnList","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_gzeBonusOffList","type":"uint256"}],"name":"setGzeBonusOffList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"wallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ethUsd","outputs":[{"name":"_rate","type":"uint256"},{"name":"_live","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"parcelUsd","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokens","type":"uint256"}],"name":"purchaseWithGze","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnershipImmediately","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_startDate","type":"uint256"}],"name":"setStartDate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"tokens","type":"uint256"},{"name":"token","type":"address"},{"name":"","type":"bytes"}],"name":"receiveApproval","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"gzeEth","outputs":[{"name":"_rate","type":"uint256"},{"name":"_live","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxParcels","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_maxParcels","type":"uint256"}],"name":"setMaxParcels","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_parcelUsd","type":"uint256"}],"name":"setParcelUsd","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"_symbol","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"parcels","type":"uint256"}],"name":"offlinePurchase","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"finalise","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"gzeEthPriceFeed","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"contributedGze","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"contributedEth","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gzeBonusOffList","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gzeUsd","outputs":[{"name":"_rate","type":"uint256"},{"name":"_live","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"endDate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gzeToken","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"parcelToken","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_gzeBonusOnList","type":"uint256"}],"name":"setGzeBonusOnList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"parcelGzeWithBonusOnList","outputs":[{"name":"_rate","type":"uint256"},{"name":"_live","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_wallet","type":"address"}],"name":"setWallet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"parcelEth","outputs":[{"name":"_rate","type":"uint256"},{"name":"_live","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"parcelGzeWithoutBonus","outputs":[{"name":"_rate","type":"uint256"},{"name":"_live","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_parcelToken","type":"address"},{"name":"_gzeToken","type":"address"},{"name":"_ethUsdPriceFeed","type":"address"},{"name":"_gzeEthPriceFeed","type":"address"},{"name":"_bonusList","type":"address"},{"name":"_wallet","type":"address"},{"name":"_startDate","type":"uint256"},{"name":"_endDate","type":"uint256"},{"name":"_maxParcels","type":"uint256"},{"name":"_parcelUsd","type":"uint256"},{"name":"_gzeBonusOffList","type":"uint256"},{"name":"_gzeBonusOnList","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldWallet","type":"address"},{"indexed":true,"name":"newWallet","type":"address"}],"name":"WalletUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldStartDate","type":"uint256"},{"indexed":false,"name":"newStartDate","type":"uint256"}],"name":"StartDateUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldEndDate","type":"uint256"},{"indexed":false,"name":"newEndDate","type":"uint256"}],"name":"EndDateUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldMaxParcels","type":"uint256"},{"indexed":false,"name":"newMaxParcels","type":"uint256"}],"name":"MaxParcelsUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldParcelUsd","type":"uint256"},{"indexed":false,"name":"newParcelUsd","type":"uint256"}],"name":"ParcelUsdUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldGzeBonusOffList","type":"uint256"},{"indexed":false,"name":"newGzeBonusOffList","type":"uint256"}],"name":"GzeBonusOffListUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldGzeBonusOnList","type":"uint256"},{"indexed":false,"name":"newGzeBonusOnList","type":"uint256"}],"name":"GzeBonusOnListUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"},{"indexed":false,"name":"parcels","type":"uint256"},{"indexed":false,"name":"gzeToTransfer","type":"uint256"},{"indexed":false,"name":"ethToTransfer","type":"uint256"},{"indexed":false,"name":"parcelsSold","type":"uint256"},{"indexed":false,"name":"contributedGze","type":"uint256"},{"indexed":false,"name":"contributedEth","type":"uint256"}],"name":"Purchased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"}];
var landRush=eth.contract(landRushAbi).at(landRushAddress);
