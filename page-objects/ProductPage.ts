import {Locator, Page} from '@playwright/test';

export class ProductPage {
    page: Page;
    backToProductsLink: Locator;
    addtoCartProduct: Locator;
    removefromCartProduct: Locator;


    constructor (page:Page) {
        this.page = page;
        this.backToProductsLink = page.locator('#back-to-products');
        this.removefromCartProduct = page.locator('#remove');
        this.addtoCartProduct = page.locator('#add-to-cart');

    }

    async backToHomePage () {
        await this.backToProductsLink.click();
    }

    async clickAddToCartProduct () {
        await this.addtoCartProduct.click();
    }

    async clickremovefromCartProduct() {
        await this.removefromCartProduct.click();
    }

}