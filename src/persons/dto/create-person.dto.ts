export class CreatePersonDto {
  id?: string;
  name!: string;
  emailAddress!: string;
}

export class EmailType {
  email!: [`^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$`];
}
