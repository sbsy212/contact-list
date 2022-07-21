export type EmailType = `${string}@${string}.${string}`;

export class CreatePersonDto {
  id?: string;
  name!: string;
  emailAddress!: EmailType;
}
