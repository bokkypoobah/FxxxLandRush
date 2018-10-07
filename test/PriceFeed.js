var priceFeedOutput={
  "contracts" : 
  {
    "Operated.sol:Operated" : 
    {
      "abi" : "[{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"operators\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"acceptOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnershipImmediately\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_operator\",\"type\":\"address\"}],\"name\":\"addOperator\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_operator\",\"type\":\"address\"}],\"name\":\"removeOperator\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"newOwner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"_operator\",\"type\":\"address\"}],\"name\":\"OperatorAdded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"_operator\",\"type\":\"address\"}],\"name\":\"OperatorRemoved\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"_from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"_to\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"}]",
      "bin" : "608060405234801561001057600080fd5b50610482806100206000396000f30060806040526004361061008d5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166313e7c9d8811461009257806379ba5097146100c75780637e71fb09146100de5780638da5cb5b146100ff5780639870d7fe14610130578063ac8a584a14610151578063d4ee1d9014610172578063f2fde38b14610187575b600080fd5b34801561009e57600080fd5b506100b3600160a060020a03600435166101a8565b604080519115158252519081900360200190f35b3480156100d357600080fd5b506100dc6101bd565b005b3480156100ea57600080fd5b506100dc600160a060020a0360043516610245565b34801561010b57600080fd5b506101146102c4565b60408051600160a060020a039092168252519081900360200190f35b34801561013c57600080fd5b506100dc600160a060020a03600435166102d3565b34801561015d57600080fd5b506100dc600160a060020a036004351661036b565b34801561017e57600080fd5b50610114610401565b34801561019357600080fd5b506100dc600160a060020a0360043516610410565b60026020526000908152604090205460ff1681565b600154600160a060020a031633146101d457600080fd5b60015460008054604051600160a060020a0393841693909116917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600180546000805473ffffffffffffffffffffffffffffffffffffffff19908116600160a060020a03841617909155169055565b600054600160a060020a0316331461025c57600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b600054600160a060020a031681565b600054600160a060020a031633146102ea57600080fd5b600160a060020a03811660009081526002602052604090205460ff161561031057600080fd5b600160a060020a038116600081815260026020908152604091829020805460ff19166001179055815192835290517fac6fa858e9350a46cec16539926e0fde25b7629f84b5a72bffaae4df888ae86d9281900390910190a150565b600054600160a060020a0316331461038257600080fd5b600160a060020a03811660009081526002602052604090205460ff1615156103a957600080fd5b600160a060020a038116600081815260026020908152604091829020805460ff19169055815192835290517f80c0b871b97b595b16a7741c1b06fed0c6f6f558639f18ccbce50724325dc40d9281900390910190a150565b600154600160a060020a031681565b600054600160a060020a0316331461042757600080fd5b6001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790555600a165627a7a723058205b392d70b1c5c0a6996c643554d89e69543df7d685b73f00eb597166d75f95480029"
    },
    "Owned.sol:Owned" : 
    {
      "abi" : "[{\"constant\":false,\"inputs\":[],\"name\":\"acceptOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnershipImmediately\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"newOwner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"_from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"_to\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"}]",
      "bin" : "608060405234801561001057600080fd5b506102a7806100206000396000f30060806040526004361061006c5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166379ba509781146100715780637e71fb09146100885780638da5cb5b146100a9578063d4ee1d90146100da578063f2fde38b146100ef575b600080fd5b34801561007d57600080fd5b50610086610110565b005b34801561009457600080fd5b50610086600160a060020a0360043516610198565b3480156100b557600080fd5b506100be610217565b60408051600160a060020a039092168252519081900360200190f35b3480156100e657600080fd5b506100be610226565b3480156100fb57600080fd5b50610086600160a060020a0360043516610235565b600154600160a060020a0316331461012757600080fd5b60015460008054604051600160a060020a0393841693909116917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600180546000805473ffffffffffffffffffffffffffffffffffffffff19908116600160a060020a03841617909155169055565b600054600160a060020a031633146101af57600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b600054600160a060020a031681565b600154600160a060020a031681565b600054600160a060020a0316331461024c57600080fd5b6001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790555600a165627a7a72305820de73149e7a7477b8060d5b4583e51745318b5af15e6430df4ca2856e968f4cbe0029"
    },
    "PriceFeed.sol:PriceFeed" : 
    {
      "abi" : "[{\"constant\":true,\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"operators\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getRate\",\"outputs\":[{\"name\":\"rate\",\"type\":\"uint256\"},{\"name\":\"live\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"rate\",\"type\":\"uint256\"},{\"name\":\"live\",\"type\":\"bool\"}],\"name\":\"setRate\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"acceptOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnershipImmediately\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_operator\",\"type\":\"address\"}],\"name\":\"addOperator\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_operator\",\"type\":\"address\"}],\"name\":\"removeOperator\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"newOwner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"rate\",\"type\":\"uint256\"},{\"name\":\"live\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"oldRate\",\"type\":\"uint256\"},{\"indexed\":false,\"name\":\"oldLive\",\"type\":\"bool\"},{\"indexed\":false,\"name\":\"newRate\",\"type\":\"uint256\"},{\"indexed\":false,\"name\":\"newLive\",\"type\":\"bool\"}],\"name\":\"SetRate\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"_operator\",\"type\":\"address\"}],\"name\":\"OperatorAdded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"_operator\",\"type\":\"address\"}],\"name\":\"OperatorRemoved\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"_from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"_to\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"}]",
      "bin" : "608060405234801561001057600080fd5b506040516108ad3803806108ad8339810160409081528151602083015191830151920191610046336401000000006100c3810204565b825161005990600390602086019061014a565b5060048290556005805460ff19168215151790819055604080516000808252602082015280820185905260ff90921615156060830152517f2961758c91244536639293a6f7319f53454007c4063328daed3fb879e82d2446916080908290030190a15050506101e5565b6100d5816401000000006100d8810204565b50565b60015474010000000000000000000000000000000000000000900460ff161561010057600080fd5b60008054600160a060020a03909216600160a060020a03199092169190911790556001805460a060020a60ff02191674010000000000000000000000000000000000000000179055565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061018b57805160ff19168380011785556101b8565b828001600101855582156101b8579182015b828111156101b857825182559160200191906001019061019d565b506101c49291506101c8565b5090565b6101e291905b808211156101c457600081556001016101ce565b90565b6106b9806101f46000396000f3006080604052600436106100ae5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166306fdde0381146100b357806313e7c9d81461013d578063679aefce146101725780636f81bdd8146101a057806379ba5097146101bf5780637e71fb09146101d45780638da5cb5b146101f55780639870d7fe14610226578063ac8a584a14610247578063d4ee1d9014610268578063f2fde38b1461027d575b600080fd5b3480156100bf57600080fd5b506100c861029e565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101025781810151838201526020016100ea565b50505050905090810190601f16801561012f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561014957600080fd5b5061015e600160a060020a0360043516610334565b604080519115158252519081900360200190f35b34801561017e57600080fd5b50610187610349565b6040805192835290151560208301528051918290030190f35b3480156101ac57600080fd5b506101bd6004356024351515610356565b005b3480156101cb57600080fd5b506101bd6103f4565b3480156101e057600080fd5b506101bd600160a060020a036004351661047c565b34801561020157600080fd5b5061020a6104fb565b60408051600160a060020a039092168252519081900360200190f35b34801561023257600080fd5b506101bd600160a060020a036004351661050a565b34801561025357600080fd5b506101bd600160a060020a03600435166105a2565b34801561027457600080fd5b5061020a610638565b34801561028957600080fd5b506101bd600160a060020a0360043516610647565b60038054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561032a5780601f106102ff5761010080835404028352916020019161032a565b820191906000526020600020905b81548152906001019060200180831161030d57829003601f168201915b5050505050905090565b60026020526000908152604090205460ff1681565b60045460055460ff169091565b3360009081526002602052604090205460ff168061037e5750600054600160a060020a031633145b151561038957600080fd5b6004546005546040805192835260ff909116151560208301528181018490528215156060830152517f2961758c91244536639293a6f7319f53454007c4063328daed3fb879e82d24469181900360800190a16004919091556005805460ff1916911515919091179055565b600154600160a060020a0316331461040b57600080fd5b60015460008054604051600160a060020a0393841693909116917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600180546000805473ffffffffffffffffffffffffffffffffffffffff19908116600160a060020a03841617909155169055565b600054600160a060020a0316331461049357600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b600054600160a060020a031681565b600054600160a060020a0316331461052157600080fd5b600160a060020a03811660009081526002602052604090205460ff161561054757600080fd5b600160a060020a038116600081815260026020908152604091829020805460ff19166001179055815192835290517fac6fa858e9350a46cec16539926e0fde25b7629f84b5a72bffaae4df888ae86d9281900390910190a150565b600054600160a060020a031633146105b957600080fd5b600160a060020a03811660009081526002602052604090205460ff1615156105e057600080fd5b600160a060020a038116600081815260026020908152604091829020805460ff19169055815192835290517f80c0b871b97b595b16a7741c1b06fed0c6f6f558639f18ccbce50724325dc40d9281900390910190a150565b600154600160a060020a031681565b600054600160a060020a0316331461065e57600080fd5b6001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790555600a165627a7a723058203131ddbe34323ca1a3b68139ec4bf2abae015a1029e8c27e4988aaeb7ec8a0c60029"
    },
    "PriceFeedInterface.sol:PriceFeedInterface" : 
    {
      "abi" : "[{\"constant\":true,\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getRate\",\"outputs\":[{\"name\":\"_rate\",\"type\":\"uint256\"},{\"name\":\"_live\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"}]",
      "bin" : ""
    }
  },
  "version" : "0.4.25+commit.59dbf8f1.Darwin.appleclang"
};
