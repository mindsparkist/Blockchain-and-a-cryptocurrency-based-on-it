const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock(data) {
        // get the last block
        const lastBlock = this.chain[this.chain.length - 1];
        // making a new block
        const block = Block.mineBlock(lastBlock, data);
        // adding the new block to the chain
        this.chain.push(block);

        return block;
    }
    isValidChain(chain) {
        // check if the genesis block is the same
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
        // check if the chain is valid
        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const lastBlock = chain[i - 1];
            // check if the hash is valid
            if (block.lasthash !== lastBlock.hash) return false;
            // check if the hash is valid
            if (block.hash !== Block.blockHash(block)) return false;
        }
        return true;
    }
    replaceChain(newChain) {
        if (newChain.length <= this.chain.length) {
            console.log('Received chain is not longer than the current chain.');
            return;
        } else if (!this.isValidChain(newChain)) {
            console.log('The received chain is not valid.');
            return;
        }
        console.log('Replacing blockchain with the new chain.');
        this.chain = newChain;
    }

}

module.exports = Blockchain;