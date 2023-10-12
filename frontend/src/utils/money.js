export class Money {
    constructor(amount) {
        this.amount = amount;
    }

    toEuro() {
        if (this.amount) {
            return this.amount.toLocaleString("fi-FI", {style: "currency", currency: "EUR"});
        }
        return null;
    }
}
