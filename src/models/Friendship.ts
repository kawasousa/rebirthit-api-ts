export class Friendship{
    public senderUsername: string;
    public receivedUsername: string;
    public status: string;
    public createdAt: Date;

    constructor(senderUsername: string, receivedUsername: string, status: string, createdAt: Date){
        this.senderUsername = senderUsername;
        this.receivedUsername = receivedUsername;
        this.createdAt = createdAt;
        this.status = status;
    }
}