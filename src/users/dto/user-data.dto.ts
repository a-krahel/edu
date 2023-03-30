import { Matches } from 'class-validator';

export class UserDataDto {
  @Matches(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    { message: 'incorrect email format.' },
  )
  email: string;

  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/, {
    message:
      'incorrect password format. Please provide minimum eight characters, at least one letter and one number',
  })
  password: string;
}
