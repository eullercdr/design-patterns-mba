import express from "express";
import ContractDatabaseRepository from "./ContractDatabaseRepository";
import GenerateInvoices from "./GenerateInvoices";
import LoggerDecorator from "./LoggerDecorator";
import PgPromiseAdapter from "./PgPromiseAdapter";

const app = express();
app.use(express.json());

const connection = new PgPromiseAdapter();
const contractRepository = new ContractDatabaseRepository(connection);
const generateInvoices = new LoggerDecorator(new GenerateInvoices(contractRepository));

app.post("/invoices", async (req: any, res: any) => {
  const input = req.body;
  input.userAgent = req.headers["user-agent"];
  input.host = req.headers["host"];
  const output = await generateInvoices.execute(input);
  res.json(output);
});

app.listen(3000, () => console.log("Server is running"));
