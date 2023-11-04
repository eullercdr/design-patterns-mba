import ContractDatabaseRepository from "../src/ContractDatabaseRepository";
import GenerateInvoices from "../src/GenerateInvoices";

test("Deve gerar as notas fiscais  por regime de caixa", async () => {
   const contractRepository = new ContractDatabaseRepository();
   const generateInvoices = new GenerateInvoices(contractRepository);
   const input = {
      month: 1,
      year: 2022,
      type: 'cash'
   }
   const output = await generateInvoices.execute(input);
   expect(output.at(0)?.date).toBe("2022-01-05");
   expect(output.at(0)?.amount).toBe(6000);
});

test("Deve gerar as notas fiscais  por regime de competencia", async () => {
   const contractRepository = new ContractDatabaseRepository();
   const generateInvoices = new GenerateInvoices(contractRepository);
   const input = {
      month: 1,
      year: 2022,
      type: 'accrual'
   }
   const output = await generateInvoices.execute(input);
   expect(output.at(0)?.date).toBe("2022-01-01");
   expect(output.at(0)?.amount).toBe(500);
});

test("Deve gerar as notas fiscais  por regime de competencia", async () => {
   const contractRepository = new ContractDatabaseRepository();
   const generateInvoices = new GenerateInvoices(contractRepository);
   const input = {
      month: 2,
      year: 2022,
      type: 'accrual'
   }
   const output = await generateInvoices.execute(input);
   expect(output.at(0)?.date).toBe("2022-02-01");
   expect(output.at(0)?.amount).toBe(500);
});