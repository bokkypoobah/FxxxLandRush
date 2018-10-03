# MakerDAOPriceFeedAdaptor

Deployed [MakerDAOPriceFeedAdaptor_deployed_to_0x12bc52A5a9cF8c1FfBAA2eAA82b75B3E79DfE292.sol](MakerDAOPriceFeedAdaptor_deployed_to_0x12bc52A5a9cF8c1FfBAA2eAA82b75B3E79DfE292.sol) on Oct 3 2018:

Deployment script:
```javascript
var deploymentAccount = "0x31445231eDE51Ea320e7A47CD4d0280966fb96D8";
var gasPrice = web3.toWei(6, "gwei");
var _makerDAOPriceFeed = "0x729D19f657BD0614b4985Cf1D82531c67569197B";
var makerdaopricefeedadaptorContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"makerDAOPriceFeed","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getRate","outputs":[{"name":"_rate","type":"uint256"},{"name":"_live","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_makerDAOPriceFeed","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
var makerdaopricefeedadaptor = makerdaopricefeedadaptorContract.new(
   _makerDAOPriceFeed,
   {
     from: deploymentAccount,
     data: '0x608060405234801561001057600080fd5b506040516020806101ff833981016040525160008054600160a060020a03909216600160a060020a03199092169190911790556101ad806100526000396000f30060806040526004361061004b5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166307d134648114610050578063679aefce1461008e575b600080fd5b34801561005c57600080fd5b506100656100bc565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561009a57600080fd5b506100a36100d8565b6040805192835290151560208301528051918290030190f35b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60008054604080517f59e02dd700000000000000000000000000000000000000000000000000000000815281518493849373ffffffffffffffffffffffffffffffffffffffff909116926359e02dd7926004808301939282900301818787803b15801561014457600080fd5b505af1158015610158573d6000803e3d6000fd5b505050506040513d604081101561016e57600080fd5b50805160209091015190949093509150505600a165627a7a72305820028cbe24a14499ebea744dec82e0979de2bc85b7a567e11206f51371ea68dcb10029',
     gas: '250000',
     gasPrice: gasPrice,
     nonce: 0
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
})
```

Deployed in tx [0xa589d028](https://etherscan.io/tx/0xa589d028962a7db12323a2decd01e1c98126fc68b63e565d9c3b13bd446c4782) to [0x12bc52A5a9cF8c1FfBAA2eAA82b75B3E79DfE292](https://etherscan.io/address/0x12bc52a5a9cf8c1ffbaa2eaa82b75b3e79dfe292#code).

View the MakerDAO ETH/USD rate in *uint* format at [0x12bc52a5a9cf8c1ffbaa2eaa82b75b3e79dfe292](https://etherscan.io/address/0x12bc52a5a9cf8c1ffbaa2eaa82b75b3e79dfe292#readContract) and compare to the ETH/USD rate from [https://makerdao.com/feeds/](https://makerdao.com/feeds/).
