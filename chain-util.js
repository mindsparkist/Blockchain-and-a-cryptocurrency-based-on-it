const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class chainUtil {
    static generateKeyPair() {
        return ec.genKeyPair();
    }

    static id(publicKey) {
        return Buffer.from(publicKey, 'hex').toString('hex');
    }

    static hash(data) {
        return Buffer.from(SHA256(data)).toString('hex');
    }

    static verifySignature(publicKey, signature, dataHash) {
        return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
    }
}