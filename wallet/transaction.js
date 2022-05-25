const chainUtil = require('../chain-util');


class Transaction {
    constructor() {
        this.id = chainUtil.id();
        this.input = null;
        this.outputs = [];
    }

    static newTransaction(wallet, recipient, amount) {
        const transaction = new this();

        if (amount > wallet.balance) {
            console.log(`Amount: ${amount} exceeds balance.`);
            return;
        }

        transaction.outputs.push(...[
            {
                amount: wallet.balance - amount,
                address: wallet.publicKey
            },
            {
                amount,
                address: recipient
            }
        ]);

        return transaction;
    }
}

module.exports = Transaction;