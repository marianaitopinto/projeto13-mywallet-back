import db from '../db.js';
import joi from 'joi';
import dayjs from 'dayjs';

export async function getAllMovements(req, res) {
    const user = res.locals.user;
    console.log('mostra o user');
    console.log(user);

    try {
        const movements = await db.collection('movements').find({ user: user._id }).toArray();
        console.log(movements)
        return res.status(200).send(movements);
    } catch (error) {
        res.status(500).send("Error getting movements.");
    }
}

export async function createMovement(req, res) {
    console.log('chegou aqui');
    const user = res.locals.user;
    console.log(req.body)
    console.log(user)

    /*const movementSchema = joi.object({
        value: joi.number().required(),
        description: joi.string().required(),
        type: joi.string().required()
    });
    const { error } = movementSchema.validate(req.body);

    if (error) return res.sendStatus(422);*/

    try {
        console.log('antes do await')
        await db.collection('movements').insertOne({ ...req.body, user: user._id, date: dayjs().format('DD/MM')});
        console.log('depois do await')
        return res.sendStatus(201);
    } catch {
        res.status(500).send("Error creating movement.");
    }
}
