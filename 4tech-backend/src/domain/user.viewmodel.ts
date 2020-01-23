import { IsNotEmpty, Length } from 'class-validator';

export class UserViewModel {

    @IsNotEmpty()
    @Length(3, 10)
    userLogin: string;

    @IsNotEmpty()
    @Length(3, 10)
    userName: string;

    @IsNotEmpty()
    @Length(3, 10)
    password: string;
}