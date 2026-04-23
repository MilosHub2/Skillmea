import { test as baseTest,} from '@playwright/test';  //importujeme test z knižnice na vytvaranie testov 

import { LoginPage } from '../page-objects/LoginPage';
import { HomePage } from '../page-objects/HomePage';
import { ProductPage } from '../page-objects/ProductPage';

const test = baseTest.extend<{                      // konstata test a pomocou funckiu extend rozsirujeme zakladnu testovaciu funkcionalitu poskytovanu kniznicou playwright/test        
    loginPage: LoginPage;                           // v deklaracii sa definuje ze test bude mat pristup k triedam LoginPage Homepage
    homePage: HomePage;                             // tento kod vytvara kontext pre tieto triedy ktory bude pristupny pocas behu testov 
    productPage: ProductPage;
}>({
    loginPage: async ({ page }, use) => {           // nasledne sa v definicii testu zavolaju asynchronne funkcie loginpage a homepage. 
        await use(new LoginPage(page));             // parametre tychto funkcii su definovane v ramci rozsirenia testu a maju pristup k aktualnej stranke page a docasne vytvoreny
    },                                              // objekty triedy ktory je predany cez funkciu use. Tieto funkcie vytvaraju nove instancie tried homepage a login page
    homePage: async ({ page }, use) => {            // a nasledne ich predavaju funkciam. Funkcia use potom pre dany objekt ulozi do kontextu a bude ho mozne pouzivat v ramci testov 
        await use(new HomePage(page));
    },
    productPage: async ({ page }, use) => {
        await use (new ProductPage(page));
    },
});

export default test;                                // na zaver si este exportujeme test pomocou export default test - tymto sposobom bude tento test dostupny  pre ostatne casti kodu
export const { expect } = test;                     // okremu toho sa exportuje aj objekt expect ktory poskytuje moznost vytvarat asercie 