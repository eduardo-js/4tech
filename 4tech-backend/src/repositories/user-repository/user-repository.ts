import { Injectable } from '@nestjs/common';
import { UserViewModel } from 'src/domain/user.viewmodel';

@Injectable()
export class UserRepository {

    db: UserViewModel[] = [
        new UserViewModel('user1', 'user1', 'user1'),
    ];

    getUsers() {
        return this.db;
    }

    createUser(newUser: UserViewModel) {
        this.db.push(newUser);
        return 'User successfully added';
    }

    createSeveralUsers(newUsers: UserViewModel[]) {
        this.db.push(...newUsers);
        return 'User successfully added';
    }

    deleteUser(deleteUserIndex: number) {
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
