import db from '../db.js';

export default function authMiddleware(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) {
        res.sendStatus(401);
        console.log('No token provided.');
        return;
    }

    try {
        const session = await db.collection('sessions').findOne({ token });
        if (!session) {
            res.sendStatus(401);
            console.log('Não tem session')
            return;
        }

        const user = await db.collection('users').findOne({ _id: session.userId });
        if (!user) {
            res.sendStatus(401);
            return;
        }

        res.locals.user = user;

        next();
    } catch (error) {
        res.sendStatus(401);
    }
}