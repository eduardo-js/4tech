import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository/user-repository';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { LoginViewModel } from 'src/domain/login.viewmodel';
import { UserUpdateViewModel } from 'src/domain/user.updateviewmodel';

@Injectable()
export class UserService {
    constructor(readonly userRepository: UserRepository) {

    }

    getUsers() {
        return this.userRepository.getUsers();
    }

    createNewUser(newUser: UserViewModel) {

        const userList = this.userRepository.getUsers();
        const existingUser = userList.find(el => el.userName === newUser.userName)
        if (existingUser) {
            throw new BadRequestException('This username already exists!');
        }
        return this.userRepository.createUser(newUser);
    }

    createSeveralUsers(newUsers: UserViewModel[]){
        const userList = this.userRepository.getUsers();
        const existingUser = userList.find( (el, i) => el.userName === newUsers[i].userName)
        if (existingUser) {
            throw new BadRequestException('This username already exists!');
        }
        return this.userRepository.createSeveralUsers(newUsers);
    }

    deleteUser(deleteUser: any) {
        const userList = this.userRepository.getUsers();
        const existingUserIndex = userList.findIndex((el) => el.userLogin === deleteUser.userLogin && el.password === deleteUser.password)
        if (existingUserIndex === -1) {
            throw new BadRequestException('This username or password does not exist!');
        }
        return this.userRepository.deleteUser(existingUserIndex);
    }

    updateUser(updateUser: UserUpdateViewModel) {
        const userList = this.userRepository.getUsers();
        const existingUserIndex = userList.findIndex(el => el.userLogin === updateUser.userLogin);

        if (existingUserIndex === -1) {
            throw new BadRequestException('This user login does not exist!');
        }
        const info = {
            id: existingUserIndex,
            updateInfo: updateUser
        }
        return this.userRepository.updateUser(info);
    }

    attemptLogin(login: LoginViewModel) {
        const userList = this.userRepository.getUsers();
        const foundLogin = userList.find(x => x.userLogin === login.userLogin && x.password === login.password);

        return foundLogin
    }
}
