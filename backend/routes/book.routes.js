import { Router } from 'express';
import { connect } from '../dbhelper';
import { ObjectID } from 'mongodb';

const router = Router();

router.get('/', async(req, res) => {
    const db = await connect();
    const result = await db.collection('es10-books').find({}).toArray();
    res.json(result);

});

router.post('/', async(req, res) => {
    const db = await connect();

    const book = {
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages
    }
    const result = await db.collection('es10-books').insert(book);

    res.json(result.ops[0]);
});

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    const db = await connect();

    const result = await db.collection('es10-books').findOne({ _id: ObjectID(id) });
    res.json(result);
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const db = await connect();

    const result = await db.collection('es10-books').deleteOne({ _id: ObjectID(id) });

    res.json({
        message: `Book ${id} Deleted`,
        result
    });
});

router.put('/:id', async(req, res) => {
    const { id } = req.params;

    const updateBook = {
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages
    }

    const db = await connect();
    await db.collection('es10-books').updateOne({ _id: ObjectID(id) }, { $set: updateBook });

    res.json({
        message: `Book ${id} updated`
    })

});

export default router;