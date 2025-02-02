export class ProfileDTO {
    public username: string;
    public name: string;
    public icon: string;
    public role: string;
    public postsCount: number;

    constructor(username: string, name: string, icon: string, role: string, postCount: number) {
        this.username = username;
        this.username = username;
        this.name = name;
        this.icon = icon;
        this.role = role;
        this.postsCount = postCount;
    }
}