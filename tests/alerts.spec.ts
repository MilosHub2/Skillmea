import test, {expect} from '../fixtures/basePages';

test.describe('Alerts', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/alerts');
  })

  test('Simple alert', async ({ page }) => {
    page.on("dialog", async dialog => {             // listener udalosti dialog, listener sa spusti sa spusti vtedy ak nastane niejaky dialog (prijima objekt dialog)
        await dialog.accept();                      // potvrdi danny dialog
    });
    await page.locator("#alertButton").click();
  });

    test('Confirm alert', async ({ page }) => {
    page.on("dialog", async dialog => {             
        await dialog.dismiss();                     // tu sa vyhodia moznosti potvrdit zrusit. Dismiss je zrusit                       
    });
    await page.locator("#confirmButton").click();
    await expect (page.locator('#confirmResult')).toHaveText('You selected Cancel');
  });

    test('Prompt alert', async ({ page }) => {
    page.on("dialog", async dialog => {             
        await dialog.accept('Skillmea');            // do alertu zadame text a accept                                           
    });
    await page.locator("#promtButton").click();
    await expect (page.locator('#promptResult')).toHaveText('You entered Skillmea');
  });

});
