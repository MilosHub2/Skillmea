import test, {expect} from '../fixtures/basePages';

test.describe('Upload', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');
  })

  test('Upload file', async ({ page }) => {
    await page.locator('#uploadFile').setInputFiles(['./we-didnt-listen-randy-marsh.gif']);
    await expect (page.locator('#uploadedFilePath')).toHaveText('C:\\fakepath\\we-didnt-listen-randy-marsh.gif');
  });
});
