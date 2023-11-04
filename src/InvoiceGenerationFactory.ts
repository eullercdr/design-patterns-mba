import AccrualBasisStrategy from "./AccrualBasisStrategy";
import CashBasisStrategy from "./CashBasisStrategy";

export default class InvoiceGenerationFactory {
  static create(type: string) {
    if (type === "accrual") {
      return new AccrualBasisStrategy();
    }
    if (type === "cash") {
      return new CashBasisStrategy();
    }
    throw new Error("Invalid type");
  }
}
