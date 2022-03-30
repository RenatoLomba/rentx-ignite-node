import { validateSync } from 'class-validator';

export abstract class DTO {
  validateSelf() {
    const validationResult = validateSync(this, {
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      whitelist: true,
    });

    return {
      isValid: validationResult.length === 0,
      errors:
        validationResult.length > 0 &&
        validationResult
          .flat()
          .map((vr) => Object.values(vr.constraints))
          .flat(),
    };
  }
}
