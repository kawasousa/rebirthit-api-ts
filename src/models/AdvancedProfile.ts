import { Profile, Status } from "./Profile";

export class AdvancedProfile extends Profile {
    public setProfileStatus(profile: Profile, status: Status) {
        profile.setStatus(status);
    }

    constructor(id: string, nickname: string, photo: string, email: string, status: Status) {
        super(id, nickname, photo, email, status);
    }
}