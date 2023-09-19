const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const cors = require('cors');
app.use(cors());

const prisma = new PrismaClient();

app.use(express.json());



app.get('/Books', async (req, res) => {
    console.log(req)
    const books = await prisma.books.findMany();
    console.log(books);
    res.json(books)
});



app.post('/Books', async (req, res) => {

    // const{books_status,books_title,books_price,library_name}= req.body
    const books = await prisma.books.create({
        data: {
            books_status: req.body.books_status,
            books_title: req.body.books_title,
            books_price: req.body.books_price,
            library_name: req.body.library_name,
        }
    });
    console.log(books);
    res.json(books)
});

app.delete('/Books/:id', async (req, res) => {
    const books = await prisma.books.delete({
        where: {
            id: parseInt(req.params.id)
        }
    });
    console.log(books);
    res.json(books)
});



app.patch('/Books/:id', async (req, res) => {
    const books = await prisma.books.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            books_status: req.body.books_status,
            books_title: req.body.books_title,
            books_price: req.body.books_price,
            library_name: req.body.library_name,
        }
    });
    console.log(books);
    res.json(books)
});

// author

app.get('/authors', async (req, res) => {
    console.log(req)
    const authors = await prisma.authors.findMany();
    console.log(authors);
    res.json(authors)
});

app.post('/authors', async (req, res) => {

    // const{books_status,books_title,books_price,library_name}= req.body
    const authors = await prisma.authors.create({
        data: {
            name: req.body.name,
            book_id: req.body.book_id,
            
        }
    });
    console.log(authors);
    res.json(authors)
});

app.delete('/authors/:id', async (req, res) => {
    const authors = await prisma.authors.delete({
        where: {
            id: parseInt(req.params.id)
        }
    });
    console.log(authors);
    res.json(authors)
});


app.patch('/authors/:id', async (req, res) => {
    const authors = await prisma.authors.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            name: req.body.name,
            book_id: req.body.book_id,
            
        }
    });
    console.log(authors);
    res.json(authors)
});

// book show database
app.get('/show', async (req, res) => {
    console.log(req)
    const shows = await prisma.book_show.findMany();
    console.log(shows);
    res.json(shows)
});



app.listen(8000);