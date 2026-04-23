import { Locator, Page } from '@playwright/test';

export class HomePage {    // trieda
    page: Page;
    menu: Locator;
    title: Locator;
    item: Locator;
    addToCart: Locator;
    cartBadge: Locator;


    constructor(page: Page) { 
        this.page = page;     
        this.menu = page.locator('#react-burger-menu-btn');
        this.title = page.getByText('Swag Labs');
        this.item = page.locator('#item_4_title_link');
        this.addToCart = page.locator('#add-to-cart-sauce-labs-backpack');
        this.cartBadge = page.locator('//span[@class = "shopping_cart_badge"]');
    }

    async clickOnMenu() {
        await this.menu.click();
    }

    async clickOnItem() {
        await this.item.click();
    }

    async clickOnAddToCart() {
        await this.addToCart.click();
    }


}

