import { Expose, instanceToPlain } from 'class-transformer';

export class UserResponseDTO {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  avatar: string;

  @Expose()
  driver_license: string;

  @Expose({ name: 'avatar_url' })
  avatar_url(): string {
    switch (process.env.disk) {
      case 'local':
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
      default:
        return null;
    }
  }

  toResponse() {
    return instanceToPlain(this, { excludeExtraneousValues: true });
  }
}
