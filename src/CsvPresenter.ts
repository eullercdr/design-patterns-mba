import { Output } from "./GenerateInvoices";
import Presenter from "./Presenter";

export default class CsvPresenter implements Presenter {
  present(output: Output[]) {
    const lines: any[] = [];
    for (const invoice of output) {
      lines.push(invoice.date + ";" + invoice.amount);
    }
    return lines.join("\n");
  }
}
