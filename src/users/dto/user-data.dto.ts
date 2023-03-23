import { Matches } from 'class-validator';

export class UserDataDto {
  @Matches(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    { message: 'incorrect email format.' },
  )
  email: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'incorrect format. Please provide minimum eight characters, at least one letter and one number',
  })
  password: string;
}
