const chainUtil = require('../chain-util');
const { INITIAL_BALANCE } = require('../config');

class Wallet {
    constructor() {
        this.balance = INITIAL_BALANCE;
        this.keyPair = chainUtil.generateKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    // tostring
    toString() {
        return `Wallet -
        Balance: ${this.balance}
        Public Key: ${this.publicKey.toString()}`;
    }

    // sign
    sign(dataHash) {
        return this.keyPair.sign(dataHash);
    }

}

module.exports = Wallet;