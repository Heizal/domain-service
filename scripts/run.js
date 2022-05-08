const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    // this line complies the contract and generates the necessary files we need to work with our contract under the artifacts directory.
    const domainContract = await domainContractFactory.deploy();
    // here is Hardhat will create a local Ethereum network for us, but just for this contract. Then after the script completes, it will destroy that local network. So, every time you run the contract it will be a fresh blockchain. 
    // so yhe refresh ensures we start with the clean slate making it easy for debugging
    await domainContract.deployed();
    // we will wait until the contract is mined and deployed to our blockhain
    console.log("Contract deployed to:", domainContract.address);
    // once the contract is deployed, domainContract.address will give us the addy of the deployed contract
    console.log("Contract deployed by:", owner.address);
  
    let txn = await domainContract.register("heizal.pizza");
    await txn.wait();

    const domainOwner = await domainContract.getAddress("heizal.pizza");
    console.log("Owner of domain:", domainOwner);

    // tyring to set a record that doesnt belong to me
    txn = await domainContract.connect(randomPerson).setRecord("heizal.pizza", "Haha my domain now!");
    await txn.wait();
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();