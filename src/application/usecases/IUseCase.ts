export interface IUseCase {
  execute(dto?: unknown): Promise<unknown>;
}
