import { Post } from "./Post";

export enum Status {
    Ativo = 'Ativo',
    Inativo = 'Inativo'
}

export class Profile {
    protected _ID: string;
    protected _nickname: string;
    protected _photo: string;
    protected _email: string;
    protected _status: Status;
    protected _friends: Profile[];
    protected _posts: Post[];

    constructor(id: string, nickname: string, photo: string, email: string, status: Status) {
        this._ID = id;
        this._nickname = nickname;
        this._photo = photo;
        this._email = email;
        this._status = status;
        this._friends = [];
        this._posts = []
    }

    public addFriend(friend: Profile) {
        if (!this._friends.includes(friend) && friend !== this) {
            this._friends.push(friend);
        }
    }

    public removeFriend(friend: Profile) {
        if (this._friends.includes(friend)) {
            const friendIndex: number = this._friends.indexOf(friend);
            this._friends.splice(friendIndex, 1);
        }
    }

    public addPost(post: Post) {
        if (!this._posts.includes(post)) {
            this._posts.push(post);
        }
    }

    get friends(): Profile[] {
        return this._friends;
    }

    get posts(): Post[] {
        return this._posts;
    }

    get email(): string {
        return this._email;
    }

    get nickname(): string {
        return this._nickname;
    }

    get ID(): string {
        return this._ID;
    }

    public setStatus(status: Status) {
        this._status = status;
    }
}