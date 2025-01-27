import { Profile } from "./Profile";

export class Post {
    protected _ID: string;
    protected _content: string;
    protected _date: Date;
    protected _profile: Profile;

    constructor(ID: string, content: string, date: Date, profile: Profile) {
        this._ID = ID;
        this._content = content;
        this._date = date;
        this._profile = profile;
    }

    get ID(): string {
        return this.ID;
    }

    get date(): Date {
        return this._date;
    }

    get profile(): Profile {
        return this._profile
    }
}