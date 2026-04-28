import { test as baseTest, expect } from '@playwright/test';

import { LoginPage } from '../page-objects/LoginPage';
import { HomePage } from '../page-objects/HomePage';
import { ProductPage } from '../page-objects/ProductPage';

type Pages = {
  loginPage: LoginPage;
  homePage: HomePage;
  productPage: ProductPage;
};

export const test = baseTest.extend<Pages>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
});

export { expect };