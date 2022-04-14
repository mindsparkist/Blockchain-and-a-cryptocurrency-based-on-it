const block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [block.genesis()];
    }

    addBlock(data) {
        // get the last block
        const lastBlock = this.chain[this.chain.length - 1];
        // making a new block
        const newBlock = block.mineBlock(lastBlock, data);
        // adding the new block to the chain
        this.chain.push(newBlock);

        return newBlock;
    }

}

module.exports = Blockchain;