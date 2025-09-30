import { Account } from "./account";
import { Categories } from "./categories";
import { Webinars } from "./webinars";

export class TractianWebinarApi {
    public account: Account
    public categories: Categories
    public webinars: Webinars

    constructor() {
        this.account = new Account();
        this.categories = new Categories();
        this.webinars = new Webinars();
    }
}