var makerDaoEthUsdPriceFeedSimulatorOutput={
  "contracts" : 
  {
    "MakerDAOETHUSDPriceFeedSimulator.sol:MakerDAOETHUSDPriceFeedSimulator" : 
    {
      "abi" : "[{\"constant\":true,\"inputs\":[],\"name\":\"hasValue\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"value\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"peek\",\"outputs\":[{\"name\":\"_value\",\"type\":\"bytes32\"},{\"name\":\"_hasValue\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"acceptOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnershipImmediately\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_value\",\"type\":\"uint256\"},{\"name\":\"_hasValue\",\"type\":\"bool\"}],\"name\":\"setValue\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"newOwner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"name\":\"_value\",\"type\":\"uint256\"},{\"name\":\"_hasValue\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"oldValue\",\"type\":\"uint256\"},{\"indexed\":false,\"name\":\"oldHasValue\",\"type\":\"bool\"},{\"indexed\":false,\"name\":\"newValue\",\"type\":\"uint256\"},{\"indexed\":false,\"name\":\"newHasValue\",\"type\":\"bool\"}],\"name\":\"SetValue\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"_from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"_to\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"}]",
      "bin" : "608060405234801561001057600080fd5b5060405160408061053383398101604052805160209091015161003b336401000000006100a3810204565b60028290556003805460ff19168215151790819055604080516000808252602082015280820185905260ff90921615156060830152517f181a3ee10b1b72bded46ffc7f99f9d00bde2ef882424e0d259bd5c6b5a4757cc916080908290030190a15050610115565b60015474010000000000000000000000000000000000000000900460ff16156100cb57600080fd5b60008054600160a060020a03909216600160a060020a03199092169190911790556001805460a060020a60ff02191674010000000000000000000000000000000000000000179055565b61040f806101246000396000f3006080604052600436106100985763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166315140bd1811461009d5780633fa4f245146100c657806359e02dd7146100ed57806379ba50971461011b5780637e71fb091461013257806382e33e82146101535780638da5cb5b14610170578063d4ee1d90146101a1578063f2fde38b146101b6575b600080fd5b3480156100a957600080fd5b506100b26101d7565b604080519115158252519081900360200190f35b3480156100d257600080fd5b506100db6101e0565b60408051918252519081900360200190f35b3480156100f957600080fd5b506101026101e6565b6040805192835290151560208301528051918290030190f35b34801561012757600080fd5b506101306101f6565b005b34801561013e57600080fd5b50610130600160a060020a036004351661027e565b34801561015f57600080fd5b5061013060043560243515156102fd565b34801561017c57600080fd5b5061018561037f565b60408051600160a060020a039092168252519081900360200190f35b3480156101ad57600080fd5b5061018561038e565b3480156101c257600080fd5b50610130600160a060020a036004351661039d565b60035460ff1681565b60025481565b600254600354909160ff90911690565b600154600160a060020a0316331461020d57600080fd5b60015460008054604051600160a060020a0393841693909116917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600180546000805473ffffffffffffffffffffffffffffffffffffffff19908116600160a060020a03841617909155169055565b600054600160a060020a0316331461029557600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b600054600160a060020a0316331461031457600080fd5b6002546003546040805192835260ff909116151560208301528181018490528215156060830152517f181a3ee10b1b72bded46ffc7f99f9d00bde2ef882424e0d259bd5c6b5a4757cc9181900360800190a16002919091556003805460ff1916911515919091179055565b600054600160a060020a031681565b600154600160a060020a031681565b600054600160a060020a031633146103b457600080fd5b6001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790555600a165627a7a7230582026f7cc694c8aec34feceec1c0397288471509374ddd3ec9c9156deee28cde4da0029"
    },
    "Owned.sol:Owned" : 
    {
      "abi" : "[{\"constant\":false,\"inputs\":[],\"name\":\"acceptOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnershipImmediately\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"newOwner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"_from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"_to\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"}]",
      "bin" : "608060405234801561001057600080fd5b506102a7806100206000396000f30060806040526004361061006c5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166379ba509781146100715780637e71fb09146100885780638da5cb5b146100a9578063d4ee1d90146100da578063f2fde38b146100ef575b600080fd5b34801561007d57600080fd5b50610086610110565b005b34801561009457600080fd5b50610086600160a060020a0360043516610198565b3480156100b557600080fd5b506100be610217565b60408051600160a060020a039092168252519081900360200190f35b3480156100e657600080fd5b506100be610226565b3480156100fb57600080fd5b50610086600160a060020a0360043516610235565b600154600160a060020a0316331461012757600080fd5b60015460008054604051600160a060020a0393841693909116917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600180546000805473ffffffffffffffffffffffffffffffffffffffff19908116600160a060020a03841617909155169055565b600054600160a060020a031633146101af57600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b600054600160a060020a031681565b600154600160a060020a031681565b600054600160a060020a0316331461024c57600080fd5b6001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790555600a165627a7a72305820de73149e7a7477b8060d5b4583e51745318b5af15e6430df4ca2856e968f4cbe0029"
    }
  },
  "version" : "0.4.25+commit.59dbf8f1.Darwin.appleclang"
};