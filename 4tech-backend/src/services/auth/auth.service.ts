import { Injectable, BadRequestException } from '@nestjs/common';
import { LoginViewModel } from 'src/domain/login.viewmodel';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/repositories/user-repository/user-repository';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository, private jwtService: JwtService) {
    }

   async login(login: LoginViewModel) {
        const user = await this.userRepository.getByCredentials(login.userLogin, login.password);

        if (!user) {
            throw new BadRequestException('Login or password incorrect!');
        }
        return {
            access_token: this.jwtService.sign( {status: 'Authorized'}),
            userId: user._id,
        };
    }
}
