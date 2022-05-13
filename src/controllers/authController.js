import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import joi from 'joi';

import db from '../db.js';

export async function login(req, res) {

    const loginSchema = joi.object({
        usermail: joi.string().required(),
        password: joi.string().required()
    });
    const { error } = loginSchema.validate(req.body);
    if (error) return res.sendStatus(422);

    try {
        const user = await db.collection("users").findOne({ usermail: req.body.usermail });
        if (!user) return res.sendStatus(404);
        if (user && bcrypt.compareSync(req.body.password, user.password)) {

            const token = uuid();

            await db.collection('sessions').insertOne({ userId: user._id, token });

            console.log(user)
            console.log(token)
            return res.status(200).send({ token, name: user.name });
        } else {
            console.log(user)
            console.log('Não autorizado');
            return res.sendStatus(401);
        }
    } catch (error) {
        console.log("Error logging in user.", error);
        res.status(500).send("Error logging in user.");
    }
}

export async function register(req, res) {
    const registerSchema = joi.object({
        name: joi.string().required(),
        usermail: joi.string().required().pattern(/\S+@\S+\.\S+/),
        password: joi.string().required()
    });

    const { error } = registerSchema.validate(req.body);
    if (error) return res.sendStatus(422);

    try {
        const SALT = 10;
        await db.collection("users").insertOne({ ...req.body, password: bcrypt.hashSync(req.body.password, SALT) });
        res.sendStatus(201); //created
    } catch (error) {
        console.log("Error creating user.", error);
        res.status(500).send("Error creating user.");
    }
}
