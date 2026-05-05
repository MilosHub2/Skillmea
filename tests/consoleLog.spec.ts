import {test, expect} from '../fixtures/basePages';

test.describe('Console log errors', () => {

    test('Page has no error or logs', async ({page}) => {

        const logs = [] as any;                                     // as any pole logs sa interpretuje ako pole do ktoreho mozu byt vlozene lubovolne typy hodnot
        page.on('console', (message) => {                           //argument console ze budeme pocuvat na udalosti zobrazujuce spravy v konzole
            return logs.push({ message, type: message.type()});     //vratime metodu logs.puhs ktory prida novy prvok do pola logs . dve polozky massage a type
        });

        const errors = [] as any; 
        page.on ('pageerror', (exception) => {                         // kontrola na eroory
            errors.push(exception);
        });

        await page.goto('https://demoqa.com/');
        console.log(logs);
        expect.soft(logs.length).toBe(0);
        console.log(errors);
        expect(errors.length).toBe(0);
        });
    
    });    