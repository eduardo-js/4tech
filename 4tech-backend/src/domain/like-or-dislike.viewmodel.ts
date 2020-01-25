import { IsNotEmpty, Length } from "class-validator";

export class LikeOrDislikeViewModel {
    readonly userId: string;
    @IsNotEmpty()
    @Length(24)
    readonly userActivityId: string;
}