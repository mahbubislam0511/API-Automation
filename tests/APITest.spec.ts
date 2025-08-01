import { request } from "http";

const { test, expect } = require('@playwright/test');

let userID;


//Get Users API
test("Get Users", async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users?page=2')
    console.log(await response.json());
    expect(response.status()).toBe(200);
})


//Create New User
test("Create New User", async ({ request }) => {
    const response = await request.post('https://reqres.in/api/users',
        {
            data: {
                "name": "Khondokar",
                "job": "Student"
            },
            headers: {
                "Accept": "application/json",
                "x-api-key": "reqres-free-v1"
            }
        });
    console.log(await response.json())
    expect(response.status()).toBe(201)

    var res = await response.json()
    userID = res.id
})


//Update User
test("Update User", async ({ request }) => {
    const response = await request.put('https://reqres.in/api/users/' + userID,
        {
            data: {
                "name": "Khondokar",
                "job": "Housewife"
            },
            headers: {
                "Accept": "application/json",
                "x-api-key": "reqres-free-v1"
            }
        });
    console.log(await response.json())
    expect(response.status()).toBe(200)
})


//Delete User
test("Delete User", async ({ request }) => {
    const response = await request.delete('https://reqres.in/api/users/' + userID, {
        headers: {
            "x-api-key": "reqres-free-v1"
        }
    });
    console.log(await response.status());
    expect(response.status()).toBe(204)
})