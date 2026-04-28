import {test, expect} from '../fixtures/basePages';

test.describe('Screenshots', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');
  })

  test('Viewport screenshot', async ({ page }) => {
    await page.screenshot({ path: 'screenshots/viewport.png'});       // screenshot co sa vidi 
  });

  test('Fullpage screenshot', async ({ page }) => {
    await page.screenshot({ path: 'screenshots/fullpage.png', fullPage: true });       // screenshot celej stranky
  });

  test('Element screenshot', async ({ page }) => {
    await page.locator('//a[@id="item_4_img_link"]/img').screenshot({ path: 'screenshots/element.png'});       // tuto mi to presla az ked som pouzuil xpath a-img
  });

});