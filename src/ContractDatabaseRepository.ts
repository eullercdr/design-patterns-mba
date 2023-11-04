import Contract from "./Contract";
import ContractRepository from "./ContractRepository";
import DatabaseConnection from "./DatabaseConnection";
import Payment from "./Payment";

export default class ContractDatabaseRepository implements ContractRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async list(): Promise<Contract[]> {
    const contracts: Contract[] = [];
    const contractsData = await this.connection.query(
      "SELECT * FROM mba.contract",
      []
    );
    for (const contractData of contractsData) {
      const contract = new Contract(
        contractData.id_contract,
        contractData.description,
        contractData.amount,
        contractData.periods,
        contractData.date
      );
      const paymentsData = await this.connection.query(
        "SELECT * FROM mba.payment WHERE id_contract = $1",
        [contract.idContract]
      );
      for (const paymentData of paymentsData) {
        let payment = new Payment(
          paymentData.id_payment,
          paymentData.date,
          parseFloat(paymentData.amount)
        );
        contract.addPayment(payment);
      }
      contracts.push(contract);
    }
    await this.connection.close();
    return contracts;
  }
}
