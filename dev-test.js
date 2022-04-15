let Block = require('./blockchain/block');


console.log(Block.mineBlock(Block.genesis(), 'blockData').toString());