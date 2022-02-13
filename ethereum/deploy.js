const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'expand address spread assume ghost energy glide curtain ramp elephant erosion border',
  'https://rinkeby.infura.io/v3/af0812ed896347e98d915a3701133d13'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });
  provider.engine.stop();
  console.log('Contract deployed to ', result.options.address);
};
deploy();
