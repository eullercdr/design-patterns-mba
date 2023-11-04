import pgp from "pg-promise";
import ContractRepository from "./ContractRepository";

export default class ContractDatabaseRepository implements ContractRepository {
  async list(): Promise<any> {
    const connection = pgp()("postgres://postgres:123456@postgres:5432/mba");
    const contracts = await connection.query("SELECT * FROM mba.contract");
    for (const contract of contracts) {
      contract.payments = await connection.query("SELECT * FROM mba.payment WHERE id_contract = $1",
        [contract.id_contract]);
    }
    await connection.$pool.end();
    return contracts
  }
}