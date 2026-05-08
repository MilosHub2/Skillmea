import { expect, test } from '@playwright/test';

let token: string;
let randomFirstName: string;
let randomLastName: string;
let randomNumbner: number;

test.describe('API tests @api', () => {
    test.beforeAll(async () => {
        const { faker } = await import('@faker-js/faker');
        randomFirstName = faker.person.firstName();
        randomLastName = faker.person.lastName();
        randomNumbner = faker.number.int(50);
    });

    test('Get request @api', async ({ request }) => {
        const response = await request.get("https://restful-booker.herokuapp.com/booking/2") 
        expect(response.status()).toBe(200);                        
        const body = await response.json();
        console.log(JSON.stringify(body));
    });

    test('Get request with params @api', async ({ request}) => {
        const response = await request.get("/booking", {
            params: {
                firstname: 'John', 
                lastname: 'Smith'
            },
        });
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        console.log(await response.json());
    });

    test('Post - create booking @api', async ({ request }) => {
        const response = await request.post("/booking", {
            data: {
                "firstname" : "Jim",
                "lastname" : "Brown",
                "totalprice" : 111,
                "depositpaid" : true,
                    "bookingdates" : {
                    "checkin" : "2018-01-01",
                    "checkout" : "2019-01-01"
                },
                "additionalneeds" : "Breakfast"
            }
        });
        console.log(await response.json());
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.booking).toHaveProperty("firstname", "Jim");
        expect(responseBody.booking).toHaveProperty("lastname", "Brown");
        expect(responseBody.booking).toHaveProperty("totalprice", 111);
    });

    test('Post - dynamic data @api', async ({ request }) => {
        const response = await request.post("/booking", {
            data: {
                "firstname" : randomFirstName,
                "lastname" : randomLastName,
                "totalprice" : randomNumbner,
                "depositpaid" : true,
                    "bookingdates" : {
                    "checkin" : "2018-01-01",
                    "checkout" : "2019-01-01"
                },
                "additionalneeds" : "Breakfast"
            }
        });
        console.log(await response.json());
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.booking).toHaveProperty("firstname", randomFirstName);
        expect(responseBody.booking).toHaveProperty("lastname", randomLastName);
        expect(responseBody.booking).toHaveProperty("totalprice", randomNumbner);
    });

    test('Update the booking detals @api', async ({ request }) => {
        const response = await request.post("/auth", {
            data: {
                "username" : "admin",   
                "password" : "password123"
            }
        });

        console.log(await response.json());
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        token = responseBody.token;
        console.log("New toke in: " + token);

        const updateRequest = await request.put("/booking/2", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${token}`,    // vzdy ked pouzivame nejaku premenu v kuceravych zatvorkach, tak sa musi pouzit backtick ` a nie obycejne navodniky ' alebo "
            },
            data: {
                "firstname" : "Jozef",
                "lastname" : "Žák",
                "totalprice" : 66,
                "depositpaid" : true,
                    "bookingdates" : {
                    "checkin" : "2018-01-01",
                    "checkout" : "2019-01-01"
                },
                "additionalneeds" : "Breakfast"
            }
        });
        
        console.log(await updateRequest.json());
        expect(updateRequest.ok()).toBeTruthy();
        expect(updateRequest.status()).toBe(200);
        const updatedResponseBody = await updateRequest.json();
        console.log(updatedResponseBody);
        expect(updatedResponseBody).toHaveProperty("firstname", "Jozef");
        expect(updatedResponseBody).toHaveProperty("lastname", "Žák");
        expect(updatedResponseBody).toHaveProperty("totalprice", 66);
    });

    test('Delete the booking detail @api', async ({ request }) => {
        const response = await request.post("/auth", {
            data: {
                "username" : "admin",   
                "password" : "password123"
            }
        });

        console.log(await response.json());
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        token = responseBody.token;
        console.log("New toke in: " + token);

        const deleteRequest = await request.delete("/booking/3", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${token}`,
            },

        });

        expect(deleteRequest.status()).toBe(201);
        expect(deleteRequest.statusText()).toBe("Created");
    });
});