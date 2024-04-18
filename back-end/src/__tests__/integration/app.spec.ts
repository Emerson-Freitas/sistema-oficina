import supertest from 'supertest';
import { app } from '../../../app';

const request = supertest(app);

describe ('My first test', () => {
    it('should test the server running', async () => {
        const response = await request.get("/running")
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ running: true })
    });
});

