import { Injectable } from '@nestjs/common';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/domain/schemas/user.schema';

@Injectable()
export class UserRepository {
    constructor(@InjectModel('User') private readonly userCollection: Model<User>) {
    }


    async getUserById(id: string): Promise<User> {
        return await this.userCollection.findOne({ _id: id }).lean()
    }

    async getUsers(): Promise<User[]> {
        return await this.userCollection.find().select( { __v: false, password: false } ).lean()
    }

    async getByCredentials(userLoginFromViewModel: string, passwordFromViewModel: string){
        return await this.userCollection.findOne({userLogin: userLoginFromViewModel, password: passwordFromViewModel}).lean();

    }

    async createUser(newUser: UserViewModel) {
        const createUser = this.userCollection(newUser);
        return await createUser.save();
    }

    async createSeveralUsers(newUsers: UserViewModel[]) {
        await newUsers.forEach(el => { this.createUser(el) });
        return 'Users successfully added';
    }

    async deleteUser(deleteUserByLogin: UserViewModel) {
        await this.userCollection.remove({ userLogin: deleteUserByLogin.userLogin })
        return 'User successfully removed';
    }

    async updateUser(updateUserInfo: UserViewModel) {
        await this.userCollection.updateOne(
            { userLogin: updateUserInfo.userLogin }, updateUserInfo)
        return 'User successfully updated';
    }
}
