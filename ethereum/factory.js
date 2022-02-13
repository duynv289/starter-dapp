import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x1C5cb9dCEAF06669e1E6Fbf04383007479aa6E99'
);

export default instance;
