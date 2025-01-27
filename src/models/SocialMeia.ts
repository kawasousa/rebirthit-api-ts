import { InteractionType } from "./Interaction";
import { Status } from "./Profile";
import {AdvancedPost} from "./AdvancedPost";
import {AdvancedProfile} from "./AdvancedProfile";
import {Post} from "./Post";
import {Profile} from "./Profile";

export class SocialMedia {
    private _profiles: Profile[];
    private _posts: Post[];
    // Alterei pra um map de chave perfil e valor Set de perfil para que um usuario envie mais de um perfil
    private _pendingFriendRequests: Map<Profile, Set<Profile>>;

    constructor() {
        this._profiles = [];
        this._posts = [];
        this._pendingFriendRequests = new Map<Profile, Set<Profile>>();
    }

    public createProfile(ID: string, nickname: string, photo: string, email: string, status: Status) {
        const profile: Profile = new Profile(ID, nickname, photo, email, status);

        this._profiles.push(profile);
    }

    public createPost(ID: string, content: string, date: Date, profile: Profile) {
        const post: Post = new Post(ID, content, date, profile);

        this._posts.push(post);
    }

    /**@returns todos os perfis cadastrados. */
    get profiles(): Profile[] {
        return this._profiles;
    }

    private getPostByID(ID: string): Post | null {
        const searchedPost: Post | null = this._posts.reduce(
            (acc: Post | null, curr: Post | null) => {
                if (acc) {
                    return acc;
                }

                if (curr?.ID === ID) {
                    return curr;
                }

                return null;
            },
            null
        )

        return searchedPost;
    }

    /**@returns o usuário com o ID passado ou null */
    private getProfileByID(ID: string): Profile | null {
        const searchedProfile: Profile | null = this._profiles.reduce(
            (acc: Profile | null, curr: Profile | null) => {
                // retorna o acumulator se já encontrou o perfil
                if (acc) {
                    return acc;
                }

                // Atualiza o current se encontrou o ID igual ao procurado
                if (curr?.ID === ID) {
                    return curr;
                }

                return null;
            },
            null
        )

        return searchedProfile;
    }

    /**@returns o usuário com o email passado ou null */
    public getProfileByEmail(email: string): Profile | null {
        const searchedProfile: Profile | null = this._profiles.reduce(
            (acc: Profile | null, curr: Profile | null) => {
                // retorna o acumulator se já encontrou o perfil
                if (acc) {
                    return acc;
                }

                // Atualiza o current se encontrou o email igual ao procurado
                if (curr?.email === email) {
                    return curr;
                }

                return null;
            },
            null
        )

        return searchedProfile;
    }

    /**@returns o usuário com o apelido passado ou null */
    public getProfileByNickname(nickname: string): Profile | null {
        const searchedProfile: Profile | null = this._profiles.reduce(
            (acc: Profile | null, curr: Profile | null) => {
                // retorna o acumulator se já encontrou o perfil
                if (acc) {
                    return acc;
                }

                // Atualiza o current se encontrou o nickname igual ao procurado
                if (curr?.nickname === nickname) {
                    return curr;
                }

                return null;
            },
            null
        )

        return searchedProfile;
    }

    /**@description Define o status de um perfil a partir de um perfil avançado */
    public setProfileStatus(adminProfileID: string, updatedProfileID: string, status: Status) {
        const adminProfile: Profile | null = this.getProfileByID(adminProfileID);
        const updatedProfile: Profile | null = this.getProfileByID(updatedProfileID);

        if (adminProfile instanceof AdvancedProfile && updatedProfile) {
            adminProfile.setProfileStatus(updatedProfile, status);
        }
    }

    /**@description Retorna uma cópia da lista das publicações ordenadas da mais recente pra mais antiga */
    public getSortedPosts(profileID?: string): Post[] {
        let sortedPosts: Post[] = [...this._posts].sort((postA: Post, postB: Post) => postA.date.getTime() - postB.date.getTime());

        if (profileID) {
            const profile: Profile | null = this.getProfileByID(profileID);

            sortedPosts = sortedPosts.filter((post: Post) => post.profile === profile);
        }

        return sortedPosts;
    }

    /* Friend Requests */

    public sendFriendRequest(senderID: string, receiverID: string) {
        const sender: Profile | null = this.getProfileByID(senderID);
        const receiver: Profile | null = this.getProfileByID(receiverID);

        if (sender && receiver) {
            // Cria um novo Set para o perfil caso o Set ainda não exista
            if (!this._pendingFriendRequests.has(sender)) {
                this._pendingFriendRequests.set(sender, new Set<Profile>());
            }

            // Adiciona um novo perfil ao Set de perfiis que esse perfil enviou solicitação de amizade
            this._pendingFriendRequests.get(sender)?.add(receiver);
        }
    }

    public acceptFriendRequest(senderID: string, receiverID: string) {
        const sender: Profile | null = this.getProfileByID(senderID);
        const receiver: Profile | null = this.getProfileByID(receiverID);

        if (sender && receiver && this._pendingFriendRequests.has(sender)) {
            this._pendingFriendRequests.get(sender)?.delete(receiver);

            if (this._pendingFriendRequests.get(sender)?.size === 0) {
                this._pendingFriendRequests.delete(sender);
            }

            sender.addFriend(receiver);
            receiver.addFriend(sender);
        }
    }

    public rejectFriendRequest(senderID: string, receiverID: string) {
        const sender: Profile | null = this.getProfileByID(senderID);
        const receiver: Profile | null = this.getProfileByID(receiverID);

        if (sender && receiver && this._pendingFriendRequests.has(sender)) {
            this._pendingFriendRequests.get(sender)?.delete(receiver);

            if (this._pendingFriendRequests.get(sender)?.size === 0) {
                this._pendingFriendRequests.delete(sender);
            }
        }
    }

    /* Interactions */

    public addInteraction(postID: string, profileID: string, type: InteractionType) {
        const post: Post | null = this.getPostByID(postID);
        const profile: Profile | null = this.getProfileByID(profileID);

        if (post instanceof AdvancedPost && profile) {

        }
    }
}