export class Post{
    public content: string;
    public createdAt: Date;
    public usernameOwner: string;
    public iconOwner: string;
    public nameOwner: string
    public roleOwner: string;
    public id: string;
    public title?: string;

    constructor(id: string, content: string, createdAt: Date, username: string, name: string, icon: string, role: string, title?: string){
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.usernameOwner = username;
        this.iconOwner = icon;
        this.nameOwner = name;
        this.roleOwner = role;
        if(title) this.title = title;
    }
}