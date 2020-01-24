import { Injectable } from '@nestjs/common';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/domain/schemas/user.schema';

@Injectable()
export class UserRepository {
    constructor(@InjectModel('User') private readonly userCollection: Model<User>) {

    }

    async getUsers(): Promise<User[]> {
        return await this.userCollection.find().lean()  
    }

    async createUser(newUser: UserViewModel) {
        const createUser = this.userCollection(newUser);
        return await createUser.save();
    }

    // async createSeveralUsers(newUsers: UserViewModel[]) {
    //     this.db.push(...newUsers);
    //     return await 'User successfully added';
    // }

    async deleteUser(deleteUserByLogin: UserViewModel) {
        await this.userCollection.remove({ userLogin: deleteUserByLogin.userLogin })
        return  'User successfully removed';
    }

    // async updateUser(updateUser: any) {
    //     const updateUserIndex = updateUser.id;

    //     if (updateUser.updateInfo.password) {
    //         this.db[updateUserIndex].password = updateUser.updateInfo.password;
    //     }
    //     if (updateUser.updateInfo.userName) {
    //         this.db[updateUserIndex].userName = updateUser.updateInfo.userName;
    //     }
    //     return await 'User successfully updated';
    // }
}
