const ipfsApi = require('ipfs-api');
const ipfs = new ipfsApi('localhost', '5001', {protocol:'http'});
export default ipfs;
