import { Interaction } from "./Interaction";
import { Post } from "./Post";

export class AdvancedPost extends Post {
    public interactions: Interaction[];

    constructor(id: string, content: string, createdAt: Date, username: string, name: string, icon: string, role: string, interactions: Interaction[], title?: string) {
        super(id, content, createdAt, username, name, icon, role, title);
        this.interactions = interactions;
    }
}