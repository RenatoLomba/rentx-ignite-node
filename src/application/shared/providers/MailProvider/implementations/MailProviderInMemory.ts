import { IMailProvider } from '../IMailProvider';

interface IMessage {
  to: string;
  subject: string;
  templatePath: string;
  variables?: Record<string, unknown>;
}

export class MailProviderInMemory implements IMailProvider {
  private messages: IMessage[] = [];

  async sendMail(
    to: string,
    subject: string,
    templatePath: string,
    variables?: Record<string, unknown>,
  ): Promise<void> {
    this.messages.push({ subject, templatePath, to, variables });
  }
}
