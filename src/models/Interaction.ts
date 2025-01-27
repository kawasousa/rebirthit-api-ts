import {Profile} from "./Profile";

export enum InteractionType{
    Curtir = 'Curtir',
    NaoCurtir = 'Não curtir',
    Riso = 'Riso',
    Surpresa = 'Surpresa'
}

export class Interaction{
    private ID: string;
    private type: InteractionType;
    private profile: Profile;

    constructor(ID: string, type: InteractionType, profile: Profile){
        this.ID = ID;
        this.type = type;
        this.profile = profile;
    }
}