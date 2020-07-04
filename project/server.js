const express = require('express');
const app = express();
const cors = require('cors');

const fs = require('fs');

app.use(express.static('.'));

app.use(cors());

app.use(express.json());

app.get('/catalog', (request, response) => {
    fs.readFile('./catalog.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('Error!', err);
            response.status(500).json({ message: 'Ошибка!' });
            return;
        }
        response.send(data);
    });
});

app.get('/cart', (request, response) => {
    fs.readFile('./cart.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('Error!', err);
            response.status(500).json({ message: 'Ошибка!' });
            return;
        }
        response.send(data);
    });
});

app.post('/addToCart', (request, response) => {
    fs.readFile('./cart.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('Error!', err);
            response.json({ result: 0 });
            return;
        }

        const cart = JSON.parse(data);
        cart.push(request.body.item);
        
        fs.writeFile('./cart.json', JSON.stringify(cart), (err) => {
            if (err) {
                response.json({ result: 0 });
                return;
            }

            response.json({ result: 1 });
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running at localhost:3000');
});
