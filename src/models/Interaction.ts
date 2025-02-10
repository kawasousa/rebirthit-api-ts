export class Interaction{
    public profileUsername: string;
    public postId: string;
    public type: string;

    constructor(profileUsername: string, postId: string, type: string){
        this.profileUsername = profileUsername;
        this.postId = postId;
        this.type = type;
    }
}