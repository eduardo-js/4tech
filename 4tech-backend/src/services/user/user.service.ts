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

    async createNewUser(newUser: UserViewModel) {

        const userList = await this.userRepository.getUsers();
        const existingUser = userList.find(el => el.userName === newUser.userName)
        if (existingUser) {
            throw new BadRequestException('This username already exists!');
        }
        return this.userRepository.createUser(newUser);
    }

    // async createSeveralUsers(newUsers: UserViewModel[]) {

    //     const userList = await this.userRepository.getUsers();

    //     const existingUser = userList.find((el, i) => el.userName === newUsers[i].userName && el.userLogin === newUsers[i].userLogin && el.password === newUsers[i].password)
    //     console.log(existingUser)

    //     if (existingUser) {
    //         throw new BadRequestException('This username already exists!');
    //     }
    //     return this.userRepository.createSeveralUsers(newUsers);
    // }

    async deleteUser(deleteUser: UserViewModel) {
        const userList = await this.userRepository.getUsers();
        const existingUserLogin = userList.find((el) => el.userLogin === deleteUser.userLogin && el.password === deleteUser.password)
        if (existingUserLogin === undefined) {
            throw new BadRequestException('This username or password does not exist!');
        }
        return this.userRepository.deleteUser(existingUserLogin);
    }

    // async updateUser(updateUser: UserUpdateViewModel) {
    //     const userList = await this.userRepository.getUsers();
    //     const existingUserIndex = userList.findIndex(el => el.userLogin === updateUser.userLogin);

    //     if (existingUserIndex === -1) {
    //         throw new BadRequestException('This user login does not exist!');
    //     }
    //     const info = {
    //         id: existingUserIndex,
    //         updateInfo: updateUser
    //     }
    //     return this.userRepository.updateUser(info);
    // }

    async attemptLogin(login: LoginViewModel) {
        const userList = await this.userRepository.getUsers();
        const foundLogin = userList.find(x => x.userLogin === login.userLogin && x.password === login.password);

        return foundLogin;
    }
}
