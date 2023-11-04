import ContractRepository from "./ContractRepository";
import DatabaseConnection from "./DatabaseConnection";

export default class ContractDatabaseRepository implements ContractRepository {

  constructor(readonly connection: DatabaseConnection) {
  }

  async list(): Promise<any> {
    const contracts = await this.connection.query("SELECT * FROM mba.contract", []);
    for (const contract of contracts) {
      contract.payments = await this.connection.query("SELECT * FROM mba.payment WHERE id_contract = $1",
        [contract.id_contract]);
    }
    await this.connection.close();
    return contracts
  }
}