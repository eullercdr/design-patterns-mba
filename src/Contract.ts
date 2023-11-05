import InvoiceGenerationFactory from "./InvoiceGenerationFactory";
import Payment from "./Payment";

export default class Contract {
  private payments: Payment[];
  constructor(
    readonly idContract: string,
    readonly description: string,
    readonly amount: number,
    readonly periods: number,
    readonly date: Date
  ) {
    this.payments = [];
  }

  addPayment(payment: Payment): void {
    this.payments.push(payment);
  }

  getPayments(): Payment[] {
    return this.payments;
  }

  generateInvoices(month: number, year: number, type: string) {
    const invoiceGenerationStrategy = InvoiceGenerationFactory.create(type);
    return invoiceGenerationStrategy.generate(this, month, year);
  }

  getBalance(): number {
    let balance = this.amount;
    this.payments.forEach((payment) => {
      balance -= payment.amount;
    });
    return balance;
  }
}
