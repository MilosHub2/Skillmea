import { expect, test } from '@playwright/test';

let token: string;
let randomFirstName: string;
let randomLastName: string;
let randomNumber: number;

test.describe('API tests @api', () => {
  test.beforeAll(async () => {
    const { faker } = await import('@faker-js/faker');
    randomFirstName = faker.person.firstName();
    randomLastName = faker.person.lastName();
    randomNumber = faker.number.int({ max: 50 });
  });

  test('Get request', async ({ request }) => {
    const response = await request.get('/booking/2');
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body);
  });

  test('Get request with params @api', async ({ request }) => {
    const response = await request.get('/booking', {
      params: {
        firstname: 'John',
        lastname: 'Smith',
      },
    });

    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body);
  });

  test('Post - create booking @api', async ({ request }) => {
    const response = await request.post('/booking', {
      data: {
        firstname: 'Jim',
        lastname: 'Brown',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: '2018-01-01',
          checkout: '2019-01-01',
        },
        additionalneeds: 'Breakfast',
      },
    });

    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);

    expect(responseBody.booking).toHaveProperty('firstname', 'Jim');
    expect(responseBody.booking).toHaveProperty('lastname', 'Brown');
    expect(responseBody.booking).toHaveProperty('totalprice', 111);
  });

  test('Post - dynamic data @api', async ({ request }) => {
    const response = await request.post('/booking', {
      data: {
        firstname: randomFirstName,
        lastname: randomLastName,
        totalprice: randomNumber,
        depositpaid: true,
        bookingdates: {
          checkin: '2018-01-01',
          checkout: '2019-01-01',
        },
        additionalneeds: 'Breakfast',
      },
    });

    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);

    expect(responseBody.booking).toHaveProperty('firstname', randomFirstName);
    expect(responseBody.booking).toHaveProperty('lastname', randomLastName);
    expect(responseBody.booking).toHaveProperty('totalprice', randomNumber);
  });

  test('Update the booking details @api', async ({ request }) => {
    const authResponse = await request.post('/auth', {
      data: {
        username: 'admin',
        password: 'password123',
      },
    });

    expect(authResponse.ok()).toBe(true);
    expect(authResponse.status()).toBe(200);

    const authBody = await authResponse.json();
    console.log(authBody);

    token = authBody.token;

    const updateResponse = await request.put('/booking/2', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Cookie: `token=${token}`,
      },
      data: {
        firstname: 'Jozef',
        lastname: 'Zak',
        totalprice: 66,
        depositpaid: true,
        bookingdates: {
          checkin: '2018-01-01',
          checkout: '2019-01-01',
        },
        additionalneeds: 'Breakfast',
      },
    });

    expect(updateResponse.ok()).toBe(true);
    expect(updateResponse.status()).toBe(200);

    const updatedResponseBody = await updateResponse.json();
    console.log(updatedResponseBody);

    expect(updatedResponseBody).toHaveProperty('firstname', 'Jozef');
    expect(updatedResponseBody).toHaveProperty('lastname', 'Zak');
    expect(updatedResponseBody).toHaveProperty('totalprice', 66);
  });

  test('Delete the booking detail @api', async ({ request }) => {
    const authResponse = await request.post('/auth', {
      data: {
        username: 'admin',
        password: 'password123',
      },
    });

    expect(authResponse.ok()).toBe(true);
    expect(authResponse.status()).toBe(200);

    const authBody = await authResponse.json();
    console.log(authBody);

    token = authBody.token;

    const deleteResponse = await request.delete('/booking/3', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Cookie: `token=${token}`,
      },
    });

    expect(deleteResponse.status()).toBe(201);
    expect(deleteResponse.statusText()).toBe('Created');
  });
});