const request = require('supertest');
const app = require('../app');
const { pool } = require('../db/index');

describe('API Endpoints', () => {
    // Clean up database after tests
    afterAll(async () => {
        await pool.end();
    });

    describe('GET /api/properties', () => {
        it('should return a list of properties', async () => {
            const res = await request(app).get('/api/properties');
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('GET /api/agents', () => {
        it('should return a list of active agents', async () => {
            const res = await request(app).get('/api/agents');
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('GET /api/properties/:id', () => {
        it('should return 404 for non-existent property', async () => {
            const res = await request(app).get('/api/properties/9999');
            expect(res.statusCode).toEqual(404);
        });
    });
});
