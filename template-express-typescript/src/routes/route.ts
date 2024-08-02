import express from "express";

export const publicRouter = express.Router();

publicRouter.get('/', (req, res) => {
    res.json('Hello World!');
});
publicRouter.get('/users', (req, res) => {
    res.json('Hello users!');
});