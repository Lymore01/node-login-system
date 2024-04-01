const request = require("supertest")
const app = require("../../server")
const userController = require("../../controllers/userController")
process.env.PORT = 4000

describe('User Routes', ()=>{
    it('GET /user/:id should return a user by ID', async ()=>{
        const response = await request(app).get("/user/660836104e3f10a2a2babb75");
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(
          {
            "_id": "660836104e3f10a2a2babb75",
            "name": "john",
            "email": "john@gmail.com",
            "password": "$2a$10$ZLNarsVKhMy4wie1k5VLueg3VkAIv9F6Me.E1ATJ.xk32VWWqKFBy",
            "dateCreated": "2024-03-30T15:54:26.261Z",
            "profile": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLUdbdG35z48yOm-gUz4Q5SwMt-LpvqmvX296uCtNYaQ&s",
            "tasks": [
              {
                "_id": "66097457cf487b2d2d22138d",
                "title": "Cooking Chapati",
                "description": "Breakfast",
                "users": [
                  "660836104e3f10a2a2babb75"
                ],
                "__v": 0,
                "date": "2024-04-01T19:36:59.323Z"
              },
              {
                "_id": "660974b7c6e62faad940a055",
                "title": "Cooking Beef",
                "description": "Dinner Lunch",
                "users": [
                  "660836104e3f10a2a2babb75"
                ],
                "__v": 0,
                "date": "2024-04-01T19:36:59.323Z"
              },
              {
                "_id": "66097b24d571c5313269c42d",
                "title": "Cooking pancakes",
                "description": "Lunch",
                "users": [
                  "660836104e3f10a2a2babb75"
                ],
                "__v": 0,
                "date": "2024-04-01T19:36:59.324Z"
              }
            ],
            "__v": 0
          }
        )
    })
})