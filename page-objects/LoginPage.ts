import { Locator, Page } from '@playwright/test';

export class LoginPage {    // trieda
    page: Page;
    userNameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    invalidCredentialsErrorMessage: Locator;
    requiredCredentialsErrorMessage: Locator;
    lockedOutErrorMessage: Locator;


    constructor(page: Page) { //konstruktor triedy ktory definuje vyznam prenemej page - trieda ma paramerter page typu Page
        this.page = page;     //parameter priradeny k this. page(predstavuje stranku)
        this.userNameInput = page.locator('#user-name'); // iniciliazujeme premene pomocou locatora - metoda locator najde na stranke pomocou nasho selectora 
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.invalidCredentialsErrorMessage = page.getByText('Epic sadface: Username and password do not match any user in this service');
        this.requiredCredentialsErrorMessage = page.getByText('Epic sadface: Username is required');
        this.lockedOutErrorMessage = page.getByText('Epic sadface: Sorry, this user has been locked out.');
    }

    async gotoLoginPage() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async enterValidUserName() {
        await this.userNameInput.fill('standard_user');
    }

    async enterLockedOutUserName() {
        await this.userNameInput.fill('locked_out_user');
    }

    async enterInvalidUserName() {
        await this.userNameInput.fill('meno');
    }

    async enterValidPassword() {
        await this.passwordInput.fill('secret_sauce');
    }

    async enterInvalidPassword() {
        await this.passwordInput.fill('heslo');
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async login(username:string, password:string) {
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

