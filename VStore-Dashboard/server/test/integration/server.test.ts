// import config from 'config';

import '../../src/config/logging'; // import Logging object so it can be accessed from anywhere in the application

import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import { mongo } from '../../src/config';
import globalRouter from '../../src/routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', globalRouter);

const requestHandler = request(app);

beforeAll(async () => {
    // establish a connection to the database
    await mongoose.connect(mongo.MONGO_CONNECTION_FOR_TESTING);
});

afterAll(async () => {
    // drop the database
    await mongoose.connection.dropDatabase();

    await mongoose.disconnect();
});

describe(' Integration Tests Scenario', () => {
    const mockingData = {
        createUserInput: {
            username: 'user_username',
            email: 'user_email@gmail.com',
            password: 'user_password',
            avatar: 'user_avatar'
        },
        user: {
            _id: null,
            accessToken: null
        },
        store: {
            _id: null
        },
        billboard: {
            _id: null
        },
        category: {
            _id: null
        },
        color: {
            _id: null
        },
        size: {
            _id: null
        },
        product: {
            _id: null
        }
    };
    it('GET /api/v1/users => users List ', async () => {
        // get users list
        const response = await requestHandler.get('/api/v1/users');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Array));
        console.log('🚀 ~ it ~ response.body:', response.body);
    });

    it('POST /api/v1/users => created user ', async () => {
        // create a user
        const response = await requestHandler.post('/api/v1/users').set('Accept', 'application/json').send(mockingData.createUserInput);

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(expect.any(Object));

        //store the user id for upcoming tests
        mockingData.user._id = response.body._id;
    });

    it(`GET /api/v1/users/${mockingData.user._id} => user whose id is ${mockingData.user._id} `, async () => {
        // get recently created user
        const response = await requestHandler.get(`/api/v1/users/${mockingData.user._id}`);

        expect(response.status).toBe(200);
        expect(response.body._id).toEqual(mockingData.user._id);
    });

    it(`POST /api/v1/auth => login user `, async () => {
        const response = await requestHandler.post(`/api/v1/auth`).set('Accept', 'application/json').send({
            // logging the user
            email: mockingData.createUserInput.email,
            password: mockingData.createUserInput.password
        });

        const { body, statusCode } = response;

        expect(statusCode).toBe(200);
        expect(body).toEqual(
            expect.objectContaining({
                user: expect.objectContaining({
                    _id: mockingData.user._id
                }),
                accessToken: expect.any(String)
            })
        );

        // store the accessToken to be used for authentication
        mockingData.user.accessToken = body.accessToken;
    });

    it(`POST /api/v1/stores => create a store `, async () => {
        // create a store instance
        const response = await requestHandler
            .post(`/api/v1/stores`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${mockingData.user.accessToken}`) // set access token
            .send({
                name: 'my_store', // store name
                userId: mockingData.user._id
            });

        const { body, statusCode } = response;

        expect(statusCode).toBe(201);
        expect(body).toEqual(
            expect.objectContaining({
                name: 'my_store', // store name
                userId: mockingData.user._id
            }) // created store object
        );

        // store the storeID to be used for upcoming tests
        mockingData.store._id = body._id;
    });

    it(`POST /api/v1//:storeId/billboards => create a billboard `, async () => {
        //create a billboard
        const response = await requestHandler
            .post(`/api/v1/${mockingData.store._id}/billboards`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${mockingData.user.accessToken}`) // set access token
            .send({
                label: 'testing_billboard_label',
                imageUrl: 'testing_billboard_imageUrl'
            });

        const { body, statusCode } = response;

        expect(statusCode).toBe(201);
        expect(body).toEqual(
            expect.objectContaining({
                label: 'testing_billboard_label',
                imageUrl: 'testing_billboard_imageUrl'
            }) // created billboard object
        );

        // store the billboardIs to be used for upcoming tests
        mockingData.billboard._id = body._id;
    });

    it(`POST /api/v1//:storeId/categories => create a category `, async () => {
        // create a category
        const response = await requestHandler
            .post(`/api/v1/${mockingData.store._id}/categories`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${mockingData.user.accessToken}`) // set access token
            .send({
                name: 'category_name',
                billboardId: mockingData.billboard._id
            });

        const { body, statusCode } = response;

        expect(statusCode).toBe(201);
        expect(body).toEqual(
            expect.objectContaining({
                name: 'category_name',
                billboardId: mockingData.billboard._id
            }) // created category object
        );

        // store the categoryId to be used for upcoming tests
        mockingData.category._id = body._id;
    });

    it(`POST /api/v1//:storeId/sizes => create a size `, async () => {
        // create a size
        const response = await requestHandler
            .post(`/api/v1/${mockingData.store._id}/sizes`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${mockingData.user.accessToken}`) // set access token
            .send({
                name: 'testing_size',
                value: 'testing_size_value'
            });

        const { body, statusCode } = response;

        expect(statusCode).toBe(201);
        expect(body).toEqual(
            expect.objectContaining({
                name: 'testing_size',
                value: 'testing_size_value'
            }) // created size object
        );

        // store the sizeId to be used for upcoming tests
        mockingData.size._id = body._id;
    });

    it(`POST /api/v1//:storeId/colors => create a color `, async () => {
        // create a color
        const response = await requestHandler
            .post(`/api/v1/${mockingData.store._id}/colors`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${mockingData.user.accessToken}`) // set access token
            .send({
                name: 'testing_color',
                value: '#000' // should be a valid hex code
            });

        const { body, statusCode } = response;

        expect(statusCode).toBe(201);
        expect(body).toEqual(
            expect.objectContaining({
                name: 'testing_color',
                value: '#000'
            }) // created color object
        );

        // store the colorID to be used for upcoming tests
        mockingData.color._id = body._id;
    });

    it(`POST /api/v1//:storeId/products => create a product `, async () => {
        const response = await requestHandler
            .post(`/api/v1/${mockingData.store._id}/products`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${mockingData.user.accessToken}`) // set access token
            .send({
                name: 'testing_product',
                price: 150,
                images: [{ url: 'testing_url_1' }, { url: 'testing_url_2' }],
                isFeatured: true,
                isArchived: true,
                category: mockingData.category._id,
                size: mockingData.size._id,
                color: mockingData.color._id
            });

        const { body, statusCode } = response;

        expect(statusCode).toBe(201);
        expect(body).toEqual(
            expect.objectContaining({
                name: 'testing_product',
                price: 150,
                images: [
                    { _id: expect.any(String), url: 'testing_url_1' },
                    { _id: expect.any(String), url: 'testing_url_2' }
                ],
                isFeatured: true,
                isArchived: true,
                category: mockingData.category._id,
                size: mockingData.size._id,
                color: mockingData.color._id
            }) // created product object
        );

        // store the productId to be used for upcoming tests
        mockingData.product._id = body._id;
    });

    it(`POST /api/v1//:storeId/orders => create an order `, async () => {
        const response = await requestHandler
            .post(`/api/v1/${mockingData.store._id}/orders`)
            .set('Accept', 'application/json')
            .send({
                orderItems: [mockingData.product._id],
                paypalOrderId: 'testing_paypalId',
                phone: 'testing_phone_number',
                address: 'testing_address',
                isPaid: true
            });

        const { body, statusCode } = response;

        expect(statusCode).toBe(201);
        expect(body).toEqual(
            expect.objectContaining({
                orderItems: [mockingData.product._id],
                paypalOrderId: 'testing_paypalId',
                phone: 'testing_phone_number',
                address: 'testing_address',
                isPaid: true
            }) // created product object
        );
    });
});
