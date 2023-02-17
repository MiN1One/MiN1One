import { plainToClass } from "class-transformer";
import { IsEnum, IsNumber, IsString, validateSync } from "class-validator";

enum Environment {
  Development = 'development',
  Production = 'production',
  Build = 'build'
}

class EnvVariables {
  @IsString()
  VIEWS_DIR: string;

  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  HOST: string;

  @IsString()
  STATIC_FILES_PREFIX_PATH: string;
}

export const validateEnv = (config: Record<string, any>) => {
  const validConfig = plainToClass(EnvVariables, config, {
    enableImplicitConversion: true
  });
  const errors = validateSync(validConfig, {
    skipMissingProperties: false
  });

  if (errors.length) {
    const missingFields: string[] = [], invalidFields: string[] = [];
    errors.forEach(err => {
      if (err.value) {
        invalidFields.push(err.property);
      } else {
        missingFields.push(err.property);
      }
    });

    let errorMessage = 'Environmental variables have errors!';

    if (missingFields.length) {
      errorMessage += '\nMissing fields:';
      missingFields.forEach(field => {
        errorMessage += '\n' + field;
      });
    }

    if (invalidFields.length) {
      errorMessage += '\nInvalid fields:';
      invalidFields.forEach(field => {
        errorMessage += '\n' + field;
      });
    }

    throw new Error(errorMessage);
  }

  return validConfig;
};