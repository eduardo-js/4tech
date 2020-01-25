import { Controller, Get, Post, Body, Delete, Put, UseGuards, Query, Param } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {

    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Get(':id')
    getUserById(@Param('id') id: string){
    return this.userService.getUserById(id);
    }

    @Post()
    createUser(@Body() newUser: UserViewModel) {
        return this.userService.createNewUser(newUser);
    }

    @Post('many')
    createSeveralUsers(@Body() newUsers: UserViewModel[]) {
        return this.userService.createSeveralUsers(newUsers);
    }

    @Delete()
    deleteUser(@Body() deleteUser: UserViewModel) {
        return this.userService.deleteUser(deleteUser);
    }

    @Put()
    updateUser(@Body() updateUser: UserViewModel) {
        return this.userService.updateUser(updateUser);
    }
}