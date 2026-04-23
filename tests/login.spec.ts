import test, {expect} from '../fixtures/basePages';
import { LoginPage } from '../page-objects/LoginPage';

test.describe('Login', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoLoginPage();
  })

  test('Succesful login', async ({ page, loginPage }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

test('Cannot login with valid username and invalid password', async ({ page, loginPage }) => {
  test.info().annotations.push({
    type: 'Test',
    description: 'This test will pass if the user is not able to login with valid username and invalid password.'
  });
  await test.step('Enter valid username', async () => {
    await loginPage.enterValidUserName();
  });
  await test.step('Enter invalid password', async () => {
    await loginPage.enterInvalidPassword();
  });
  await test.step('Click login button', async () => {
    await loginPage.clickLoginButton();
  });
  await test.step('Verify invalid credentials error message', async () => {
    await expect (loginPage.invalidCredentialsErrorMessage , 'Cannot find error message.').toBeVisible();
  });  
});

test('Cannot login with invalid username and valid password', async ({ page, loginPage }) => {
  await loginPage.enterInvalidUserName();
  await loginPage.enterValidPassword();
  await loginPage.clickLoginButton();
  await expect (loginPage.invalidCredentialsErrorMessage).toBeVisible();
  });

test('Cannot login without credentials', async ({ page, loginPage }) => {
  await loginPage.clickLoginButton();
  await expect (loginPage.requiredCredentialsErrorMessage).toBeVisible();
  });

test('Cannot login wit locked user', async ({ page, loginPage }) => {
  await loginPage.enterLockedOutUserName();
  await loginPage.enterValidPassword();
  await loginPage.clickLoginButton();
  await expect (loginPage.lockedOutErrorMessage).toBeVisible();
  });

});
