import { InteractionDTO } from "./InteractionDTO";
import { PostDTO } from "./PostDTO";

export class AdvancedPostDTO extends PostDTO {
    public interactions: InteractionDTO[];

    constructor(id: string, content: string, createdAt: Date, username: string, name: string, icon: string, role: string, interactions: InteractionDTO[]) {
        super(id, content, createdAt, username, name, icon, role);
        this.interactions = interactions;
    }
}