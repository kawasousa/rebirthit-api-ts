import { Interaction } from "./Interaction";
import { Post } from "./Post";
import { Profile } from "./Profile";

export class AdvancedPost extends Post {
    private interactions: Interaction[];

    constructor(ID: string, content: string, date: Date, profile: Profile) {
        super(ID, content, date, profile);
        this.interactions = [];
    }

    public addInteraction(interaction: Interaction) {
        this.interactions.push(interaction);
    }

    public getInteractions(): Interaction[] {
        return this.interactions;
    }
}