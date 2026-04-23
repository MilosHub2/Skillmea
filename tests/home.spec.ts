import test, {expect} from '../fixtures/basePages';

test.describe('Home Page', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoLoginPage();
  })
  
  test('Verify home page @slow', async ({ page, loginPage, homePage  }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(homePage.title).toBeVisible();
  });

  test('Verify add cart badge @slow', async ({ page, loginPage, homePage }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await homePage.clickOnAddToCart();
  await expect(homePage.cartBadge).toHaveText('1');
  });

  test('Verify add and remove cart badge on productpage', async ({ page, loginPage, homePage, productPage }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await homePage.clickOnItem();
  await productPage.clickAddToCartProduct();
  await expect(homePage.cartBadge).toHaveText('1');
  await productPage.clickremovefromCartProduct();
  await expect(homePage.cartBadge).toHaveCount(0);
  });

});




