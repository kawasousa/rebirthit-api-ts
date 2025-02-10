export class Profile {
    public username: string;
    public email: string;
    public name: string;
    public icon: string;
    public role: string;
    public postsCount: number;

    constructor(username: string, email: string, name: string, icon: string, role: string, postCount: number) {
        this.username = username;
        this.email = email;
        this.name = name;
        this.icon = icon;
        this.role = role;
        this.postsCount = postCount;
    }
}