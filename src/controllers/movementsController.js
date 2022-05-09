import db from '../db.js';
import joi from 'joi';

export async function getAllMovements(req, res) {
    const user = res.locals.user;

    try {
        const movements = await db.collection('movements').find({ userId: user._id }).toArray();
        res.status(200).send(movements);
    } catch (error) {
        res.status(500).send("Error getting movements.");
    }
}

export async function createMovement(req, res) {
    const user = res.locals.user;
    const movement = req.body;
    console.log(user)

    /*const movementSchema = joi.object({
        value: joi.number().required(),
        description: joi.string().required()
    });
    const { error } = movementSchema.validate(req.body);

    if (error) return res.sendStatus(422);*/

    try {
        await db.collection('movements').insertOne({...movement, userId: user._id});
        res.status(201);
    } catch (error) {
        res.status(500).send("Error creating movement.");
    }
}
