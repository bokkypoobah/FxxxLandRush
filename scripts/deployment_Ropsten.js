var gzeAddress="0xA579f55467d230AfC54520e6e7F0CEB5ECC3f1A0";
var gzeAbi=[{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"_data","type":"bytes"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"}],"name":"signedApproveAndCallHash","outputs":[{"name":"hash","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minter","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"spender","type":"address"}],"name":"nextNonce","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"}],"name":"signedApproveHash","outputs":[{"name":"hash","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"spender","type":"address"},{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"}],"name":"signedTransferFromHash","outputs":[{"name":"hash","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"signedApproveAndCallSig","outputs":[{"name":"","type":"bytes4"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"sig","type":"bytes"},{"name":"feeAccount","type":"address"}],"name":"signedTransferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"mintable","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"accountLocked","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"signedTransferSig","outputs":[{"name":"","type":"bytes4"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"sig","type":"bytes"},{"name":"feeAccount","type":"address"}],"name":"signedTransfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"sig","type":"bytes"},{"name":"feeAccount","type":"address"}],"name":"signedTransferCheck","outputs":[{"name":"result","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"disableMinting","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnershipImmediately","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"bttsVersion","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"unlockAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"transferable","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"_data","type":"bytes"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"sig","type":"bytes"},{"name":"feeAccount","type":"address"}],"name":"signedApproveAndCallCheck","outputs":[{"name":"result","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"}],"name":"signedTransferHash","outputs":[{"name":"hash","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"signedApproveSig","outputs":[{"name":"","type":"bytes4"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"enableTransfers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"signedTransferFromSig","outputs":[{"name":"","type":"bytes4"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"sig","type":"bytes"},{"name":"feeAccount","type":"address"}],"name":"signedApproveCheck","outputs":[{"name":"result","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"tokens","type":"uint256"},{"name":"lockAccount","type":"bool"}],"name":"mint","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"signingPrefix","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"sig","type":"bytes"},{"name":"feeAccount","type":"address"}],"name":"signedApprove","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"_data","type":"bytes"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"sig","type":"bytes"},{"name":"feeAccount","type":"address"}],"name":"signedApproveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"spender","type":"address"},{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"sig","type":"bytes"},{"name":"feeAccount","type":"address"}],"name":"signedTransferFromCheck","outputs":[{"name":"result","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_minter","type":"address"}],"name":"setMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"owner","type":"address"},{"name":"symbol","type":"string"},{"name":"name","type":"string"},{"name":"decimals","type":"uint8"},{"name":"initialSupply","type":"uint256"},{"name":"mintable","type":"bool"},{"name":"transferable","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"MinterUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"},{"indexed":false,"name":"lockAccount","type":"bool"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintingDisabled","type":"event"},{"anonymous":false,"inputs":[],"name":"TransfersEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"}],"name":"AccountUnlocked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}];
var gze=eth.contract(gzeAbi).at(gzeAddress);

var bonusListAddress="0xe0a1B299cF4b4786E56FCD27Bc20F656384073a0";
var bonusListAbi=[{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"operators","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"accounts","type":"address[]"}],"name":"remove","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"bonusList","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnershipImmediately","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isInBonusList","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_operator","type":"address"}],"name":"addOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_operator","type":"address"}],"name":"removeOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"accounts","type":"address[]"}],"name":"add","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"},{"indexed":false,"name":"status","type":"bool"}],"name":"AccountListed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_operator","type":"address"}],"name":"OperatorAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_operator","type":"address"}],"name":"OperatorRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"}];
var bonusList=eth.contract(bonusListAbi).at(bonusListAddress);
var bonusListFromBlock=4177472;

var makerDAOEthUsdPriceFeedAdaptorAddress="0x67C2E24f0EA4314Cc7D2a85e7809Dc2b43E6440A";
var makerDAOEthUsdPriceFeedAdaptorAbi=[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"makerDAOPriceFeed","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getRate","outputs":[{"name":"_rate","type":"uint256"},{"name":"_live","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"name","type":"string"},{"name":"_makerDAOPriceFeed","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
var makerDAOEthUsdPriceFeedAdaptor=eth.contract(makerDAOEthUsdPriceFeedAdaptorAbi).at(makerDAOEthUsdPriceFeedAdaptorAddress);

var gzeEthPriceFeedAddress="0x62ca617DeEcCEA9D3Ebf1EA354Eba4300292071D";
var gzeEthPriceFeedAbi=[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"operators","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getRate","outputs":[{"name":"rate","type":"uint256"},{"name":"live","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"rate","type":"uint256"},{"name":"live","type":"bool"}],"name":"setRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnershipImmediately","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_operator","type":"address"}],"name":"addOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_operator","type":"address"}],"name":"removeOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"name","type":"string"},{"name":"rate","type":"uint256"},{"name":"live","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldRate","type":"uint256"},{"indexed":false,"name":"oldLive","type":"bool"},{"indexed":false,"name":"newRate","type":"uint256"},{"indexed":false,"name":"newLive","type":"bool"}],"name":"SetRate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_operator","type":"address"}],"name":"OperatorAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_operator","type":"address"}],"name":"OperatorRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"}];
var gzeEthPriceFeed=eth.contract(gzeEthPriceFeedAbi).at(gzeEthPriceFeedAddress);
var gzeEthPriceFeedFromBlock=4187619;

var fxxxTokenAddresses = ["0xd5F08AD7105Cf766853aeF84B846258c9fd7Bb84", "0xC1C6B1eFF2C4ab247E1194Fd8b14c478550E68a1", "0x218778176eC72DD8847E9BceFc14002822Fe9d26", "0xCF618D39C4e069dE2b6Ae9D9B65D7bB0b7a562AA"];
var fxxxTokenAbi=gzeAbi;
var fxxxTokenFromBlock=4178521;

var fxxxLandRushAddresses = ["0x24Cfa0BFc7C7E4892cA2ECd308b61ac7D3C76276", "0x3DAf29FcB450CaC2fD27C27334ccF156B60cFe5D", "0x567CD0AdD4a652b32B0404950E62944263eb3d2C", "0xC710292C90d9243D9F860832ea46977AC46E93A3"];
var fxxxLandRushAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"_name","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"parcelsSold","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"startDate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"finalised","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"bonusList","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_endDate","type":"uint256"}],"name":"setEndDate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ethUsdPriceFeed","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"parcelGzeWithBonusOffList","outputs":[{"name":"_rate","type":"uint256"},{"name":"_live","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gzeBonusOnList","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_gzeBonusOffList","type":"uint256"}],"name":"setGzeBonusOffList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"wallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ethUsd","outputs":[{"name":"_rate","type":"uint256"},{"name":"_live","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"usdLockAccountThreshold","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"parcelUsd","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokens","type":"uint256"}],"name":"purchaseWithGze","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnershipImmediately","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_startDate","type":"uint256"}],"name":"setStartDate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"tokens","type":"uint256"},{"name":"token","type":"address"},{"name":"","type":"bytes"}],"name":"receiveApproval","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"gzeEth","outputs":[{"name":"_rate","type":"uint256"},{"name":"_live","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxParcels","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_maxParcels","type":"uint256"}],"name":"setMaxParcels","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_parcelUsd","type":"uint256"}],"name":"setParcelUsd","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"_symbol","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"parcels","type":"uint256"}],"name":"offlinePurchase","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"finalise","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"gzeEthPriceFeed","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"contributedGze","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"contributedEth","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gzeBonusOffList","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gzeUsd","outputs":[{"name":"_rate","type":"uint256"},{"name":"_live","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"endDate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gzeToken","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"parcelToken","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_gzeBonusOnList","type":"uint256"}],"name":"setGzeBonusOnList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"parcelGzeWithBonusOnList","outputs":[{"name":"_rate","type":"uint256"},{"name":"_live","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_wallet","type":"address"}],"name":"setWallet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"parcelEth","outputs":[{"name":"_rate","type":"uint256"},{"name":"_live","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_usdLockAccountThreshold","type":"uint256"}],"name":"setUsdLockAccountThreshold","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"parcelGzeWithoutBonus","outputs":[{"name":"_rate","type":"uint256"},{"name":"_live","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_parcelToken","type":"address"},{"name":"_gzeToken","type":"address"},{"name":"_ethUsdPriceFeed","type":"address"},{"name":"_gzeEthPriceFeed","type":"address"},{"name":"_bonusList","type":"address"},{"name":"_wallet","type":"address"},{"name":"_startDate","type":"uint256"},{"name":"_endDate","type":"uint256"},{"name":"_maxParcels","type":"uint256"},{"name":"_parcelUsd","type":"uint256"},{"name":"_usdLockAccountThreshold","type":"uint256"},{"name":"_gzeBonusOffList","type":"uint256"},{"name":"_gzeBonusOnList","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldWallet","type":"address"},{"indexed":true,"name":"newWallet","type":"address"}],"name":"WalletUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldStartDate","type":"uint256"},{"indexed":false,"name":"newStartDate","type":"uint256"}],"name":"StartDateUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldEndDate","type":"uint256"},{"indexed":false,"name":"newEndDate","type":"uint256"}],"name":"EndDateUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldMaxParcels","type":"uint256"},{"indexed":false,"name":"newMaxParcels","type":"uint256"}],"name":"MaxParcelsUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldParcelUsd","type":"uint256"},{"indexed":false,"name":"newParcelUsd","type":"uint256"}],"name":"ParcelUsdUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldUsdLockAccountThreshold","type":"uint256"},{"indexed":false,"name":"newUsdLockAccountThreshold","type":"uint256"}],"name":"UsdLockAccountThresholdUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldGzeBonusOffList","type":"uint256"},{"indexed":false,"name":"newGzeBonusOffList","type":"uint256"}],"name":"GzeBonusOffListUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldGzeBonusOnList","type":"uint256"},{"indexed":false,"name":"newGzeBonusOnList","type":"uint256"}],"name":"GzeBonusOnListUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"},{"indexed":false,"name":"parcels","type":"uint256"},{"indexed":false,"name":"gzeToTransfer","type":"uint256"},{"indexed":false,"name":"ethToTransfer","type":"uint256"},{"indexed":false,"name":"parcelsSold","type":"uint256"},{"indexed":false,"name":"contributedGze","type":"uint256"},{"indexed":false,"name":"contributedEth","type":"uint256"},{"indexed":false,"name":"lockAccount","type":"bool"}],"name":"Purchased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"}];
var fxxxLandRushBlock=4187687;


addAddressNames("0x74eD6Eb23c21403d7A00Bf388a2ec691b98BA8Ed", "GZEMultisig");
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
