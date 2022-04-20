export interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    templatePath: string,
    variables?: Record<string, unknown>,
  ): Promise<void>;
}
