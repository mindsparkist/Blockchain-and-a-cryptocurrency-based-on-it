const chainUtil = require('../chain-util');
const { DIFFICULTY, MINE_RATE } = require('../config');

// make a block class
class Block {
    constructor(timestamp, lasthash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.lasthash = lasthash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }
    // override toString method
    toString() {
        return `Block -
        Timestamp : ${this.timestamp}
        Last Hash : ${this.lasthash.substring(0, 10)}
        Hash      : ${this.hash.substring(0, 10)}
        nonce     : ${this.nonce}
        Difficulty: ${this.difficulty}
        Data      : ${this.data}`;

    }
    //  static genesis block
    static genesis() {
        return new this('00000-00', '-----', 'f1r57-h45h', [], 0, DIFFICULTY);
    }
    // static mineBlock
    static mineBlock(lastBlock, data) {
        let hash, timestamp;
        const lasthash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0;
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, lasthash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this(timestamp, lasthash, hash, data, nonce);
    }
    // static hash
    static hash(timestamp, lasthash, data, nonce, difficulty) {
        return chainUtil.hash(`${timestamp}${lasthash}${data}${nonce}${difficulty}`).toString();
    }
    static blockHash(block) {
        const { timestamp, lasthash, data, nonce, difficulty } = block;
        return Block.hash(timestamp, lasthash, data, nonce, difficulty);
    }
    // static adjustDifficulty
    static adjustDifficulty(lastBlock, currentTime) {
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return difficulty;
    }
}

// exporting the block class
module.exports = Block;