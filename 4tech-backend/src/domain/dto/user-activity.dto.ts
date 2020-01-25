import { UserActivityCommentDto } from './user-activity-comment.dto';


export class UserActivityDto {

    constructor(userId: string, filename: string, userName: string) {
        this.userId = userId;
        this.filename = filename;
        this.userName = userName;
        this.timestamp = new Date();
        this.likes = [];
        this.comments = [];
    }

    readonly userId: string;
    readonly filename: string;
    readonly userName: string;
    readonly timestamp: Date;
    readonly likes: string[];
    readonly comments: UserActivityCommentDto[];
}