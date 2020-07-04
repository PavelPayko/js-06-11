// Пока что не работает
// import fs from 'fs';

const fs = require('fs');

fs.readFile('./data.json', 'utf-8', (err, data) => {
    if (err) {
        console.log('readFile Error', err);
        return;
    }

    const res = JSON.parse(data);
    res.anotherProperty = 1234;

    fs.writeFile('./data.json', JSON.stringify(res), (err) => {
        if (err) {
            console.log('writeFile Error', err);
            return;
        }

        console.log('writeFile Success');
    });
});
