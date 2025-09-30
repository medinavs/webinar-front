import { Auth } from "./auth";

export class Account {
    public auth: Auth;

    constructor() {
        this.auth = new Auth();
    }
}