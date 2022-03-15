import { Request, Response } from 'express';
import { container, InjectionToken } from 'tsyringe';

import { IUseCase } from '@application/usecases/IUseCase';

export abstract class BaseController<T extends IUseCase> {
  protected readonly useCase: T;

  constructor(injectionUseCase: InjectionToken<T>) {
    this.useCase = container.resolve(injectionUseCase);
  }

  public abstract handle(
    request: Request,
    response: Response,
  ): Promise<Response>;
}
