import { Controller, Get, Post, Body, Delete, Put } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { UserDeleteViewModel } from 'src/domain/user.deleteviewmodel';
import { UserUpdateViewModel } from 'src/domain/user.updateviewmodel';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {

    }

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Post()
    createUser(@Body() newUser: UserViewModel) {
        return this.userService.createNewUser(newUser);
    }

    @Post('Many')
    createSeveralUsers(@Body() newUsers: UserViewModel[]) {
        return this.userService.createSeveralUsers(newUsers);
    }

    @Delete()
    deleteUser(@Body() deleteUser: UserDeleteViewModel) {
        return this.userService.deleteUser(deleteUser);
    }

    @Put()
    updateUser(@Body() updateUser: UserUpdateViewModel) {
        return this.userService.updateUser(updateUser);
    }
}