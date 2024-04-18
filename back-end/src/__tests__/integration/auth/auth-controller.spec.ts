import supertest from 'supertest';
import { app } from '../../../../app';

const request = supertest(app);

describe ('Auth Controller', () => {
    it('should be login', async () => {
        const response = await request
            .post("/login")
            .send({
                email: "emerson_freitas@outlook.com.br",
                password: "123"
            })
        expect(response.body).toHaveProperty("token")
        expect(response.status).toBe(200)
    });
});

