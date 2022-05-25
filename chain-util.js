const EC = require('elliptic').ec;
const SHA_256 = require('crypto-js/sha256');
const uuidV1 = require('uuid/v1');
const ec = new EC('secp256k1');

class chainUtil {
    static generateKeyPair() {
        return ec.genKeyPair();
    }

    static id() {
        return uuidV1();
    }

    static hash(data) {
        return SHA_256(JSON.stringify(data)).toString();
    }
}

module.exports = chainUtil;