const SHA_256 = require('crypto-js/sha256');

// make a block class
class Block {
    constructor(timestamp, lasthash, hash, data) {
        this.timestamp = timestamp;
        this.lasthash = lasthash;
        this.hash = hash;
        this.data = data;
    }
    // override toString method
    toString() {
        return `Block -
        Timestamp: ${this.timestamp}
        Last Hash: ${this.lasthash.substring(0, 10)}
        Hash: ${this.hash.substring(0, 10)}
        Data: ${this.data}`;

    }
    //  static genesis block
    static genesis() {
        return new this('00000-00', '-----', 'f1r57-h45h', []);
    }
    // static mineBlock
    static mineBlock(lastBlock, data) {
        const timestamp = Date.now();
        let lasthash = lastBlock.hash;
        let hash = Block.hash(lasthash, timestamp, data);
        return new this(timestamp, lasthash, hash, data);
    }
    // static hash
    static hash(lasthash, timestamp, data) {
        return SHA_256(`${lasthash}${timestamp}${data}`).toString();
    }
    static blockHash(block) {
        const { lasthash, timestamp, data } = block;
        return Block.hash(lasthash, timestamp, data);
    }
}

// exporting the block class
module.exports = Block;