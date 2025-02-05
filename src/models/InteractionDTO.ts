export class InteractionDTO{
    public authorUsername: string;
    public postId: string;
    public type: string;

    constructor(authorUsername: string, postId: string, type: string){
        this.authorUsername = authorUsername;
        this.postId = postId;
        this.type = type;
    }
}