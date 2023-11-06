import HttpServer from "./HttpServer";
import Usecase from "./Usecase";

export default class MainController {
  constructor(readonly httpServer: HttpServer, readonly useCase: Usecase) {
    httpServer.on(
      "post",
      "/invoices",
      async function (params: any, body: any, headers: any) {
        body.userAgent = headers["user-agent"];
        body.host = headers["host"];
        const input = body;
        const output = await useCase.execute(input);
        return output;
      }
    );
  }
}
