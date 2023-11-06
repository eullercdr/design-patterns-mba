import ContractDatabaseRepository from "./ContractDatabaseRepository";
import ExpressAdapter from "./ExpressAdapter";
import GenerateInvoices from "./GenerateInvoices";
import LoggerDecorator from "./LoggerDecorator";
import MainController from "./MainController";
import PgPromiseAdapter from "./PgPromiseAdapter";

const connection = new PgPromiseAdapter();
const contractRepository = new ContractDatabaseRepository(connection);
const generateInvoices = new LoggerDecorator(new GenerateInvoices(contractRepository));
const httpServer = new ExpressAdapter();

new MainController(httpServer, generateInvoices);
httpServer.listen(3000);