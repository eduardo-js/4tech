import { Controller, Get, Post, Body, Delete, Put } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { UserViewModel } from 'src/domain/user.viewmodel';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {

    }

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Post()
    createUser(@Body() newUser: UserViewModel){
        return this.userService.createNewUser(newUser);
    }

    @Delete()
    deleteUser(@Body()newUser: UserViewModel) {
        return this.userService.deleteUser(newUser);
    }

    @Put()
    updateUser(@Body()newUser: UserViewModel) {
        return this.userService.updateUser(newUser);
    }
}