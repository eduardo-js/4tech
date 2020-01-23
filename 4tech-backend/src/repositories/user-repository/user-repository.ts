import { Injectable } from '@nestjs/common';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { UserUpdateViewModel } from 'src/domain/user.updateviewmodel';

@Injectable()
export class UserRepository {

    db: UserViewModel[] = [];

    getUsers() {
        return this.db;
    }

    createUser(newUser: UserViewModel) {
        this.db.push(newUser);
        return 'User successfully added';
    }

    createSeveralUsers(newUsers: UserViewModel[]) {
        this.db.push(...newUsers);
        console.log(this.db)
        return 'User successfully added';
    }

    deleteUser(deleteUserIndex: any) {
        this.db.splice(deleteUserIndex, 1);
        return 'User successfully removed';
    }

    updateUser(updateUser: any) {
        const updateUserIndex = updateUser.id;

        if (updateUser.updateInfo.password) {
            this.db[updateUserIndex].password = updateUser.updateInfo.password;
        }
        if (updateUser.updateInfo.userName) {
            this.db[updateUserIndex].userName = updateUser.updateInfo.userName;
        }
        return 'User successfully updated';
    }
}
