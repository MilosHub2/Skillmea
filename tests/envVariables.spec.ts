import {test} from '@playwright/test';

test.only('Multiple enviroments', async ({page}) => {
    console.log(process.env.E2E_BASE_URL);
    console.log(process.env.E2E_USERNAME);
    console.log(process.env.E2E_PASSWORD);

});

