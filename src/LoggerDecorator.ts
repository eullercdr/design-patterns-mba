import Usecase from "./Usecase";

export default class LoggerDecorator implements Usecase {
  constructor(readonly useCase: Usecase) {}

  async execute(input: any): Promise<any> {
    console.log(input.userAgent);
    console.log(input.host);
    return this.useCase.execute(input);
  }
}
