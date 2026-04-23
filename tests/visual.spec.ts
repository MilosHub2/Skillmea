import test, {expect} from '../fixtures/basePages';

test.describe('Visual testing', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');
  })

  test('Visual test - login page', async ({ page }) => {
    await expect (page).toHaveScreenshot({maxDiffPixels: 100});          //
  });

});
