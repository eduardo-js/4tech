import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository/user-repository';
import { UserActivityDto } from 'src/domain/dto/user-activity.dto';
import { UserActivityCommentDto } from 'src/domain/dto/user-activity-comment.dto';
import { UserActivityRepository } from 'src/repositories/user-activity-repository/user-activity-repository';
import { UserActivity } from 'src/domain/schemas/user-activity.schema';
import { readFileSync } from 'fs';
import { LikeOrDislikeViewModel } from 'src/domain/like-or-dislike.viewmodel';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Injectable()
export class UserActivityService {

    async getRecentImages(index: string) {
        const indexAsNumber = parseInt(index);
        if (isNaN(indexAsNumber)) {
            throw new BadRequestException('invalid Index');
        }

        const recentImages = await this.userActivityRepository.getRecentImages(indexAsNumber);
        return this.convertImagesToBase64(recentImages);
    }
    constructor(private readonly userRepository: UserRepository, private readonly userActivityRepository: UserActivityRepository, private readonly WebsocketGateway: WebsocketGateway) {
    }

    async uploadImage(userId: string, filename: string, description: string) {
        const user = await this.userRepository.getUserById(userId);
        if (!user) {
            throw new BadRequestException('User not found and therefore canno\'t upload');
        }
        const uploadImageObj = new UserActivityDto(userId, filename, user.userName);
        if (description) {
            uploadImageObj.comments.push(new UserActivityCommentDto(userId, user.userName, description));
        }

            const createdUserActivity = await this.userActivityRepository.create(uploadImageObj);
            return this.ConvertImageToBase64ForOneFile(createdUserActivity)
        // return await this.userActivityRepository.create(uploadImageObj)
    }

    convertImagesToBase64(userActivities: UserActivity[]) {
        return Promise.all(
            userActivities.map(userActivity => {
                return { ...userActivity, imgEncoded: readFileSync('../images/' + userActivity.filename, 'base64') }
            })
        )
    }

    ConvertImageToBase64ForOneFile(userActivities: UserActivity){
        return {
            ... userActivities,
            imgEncoded: readFileSync('../images/' + userActivities.filename, 'base64'),
        };
        
    }

    async likeOrDislikeUserActivity(likeOrDislikeViewModel: LikeOrDislikeViewModel) {
        const userActivity = await this.userActivityRepository.getById(likeOrDislikeViewModel.userId);
        if (!userActivity) {
            throw new BadRequestException('This user does not exist!');
        }
        const user = await this.userActivityRepository.getById(likeOrDislikeViewModel.userId);
        if (!user) {
            throw new BadRequestException('This user does not exist!');
        }

        if(userActivity.likes.includes(user._id.toString())){
            userActivity.likes = userActivity.likes.filter( el => el !== user._id.toString());
        } else {
            userActivity.likes.push(user._id.toString());
        }
        const updatedUserActivity =  await this.userActivityRepository.update(userActivity);
        this.WebsocketGateway.notifOnLike(userActivity._id, userActivity.userId);
        return updatedUserActivity;
    }

    async userActivityComment(userActivityComment: UserActivityCommentDto) {
        const user = await this.userRepository.getUserById(userActivityComment.userId);
        if (!user) {
            throw new BadRequestException('User not found and therefore canno\'t upload');
        }
        
    }
}
