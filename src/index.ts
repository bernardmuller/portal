import express from 'express'

const app = express();

app.get('/', (req, res) => {
    res.send('Hello there, this is the portal!')
})

let port = process.env.PORT || '5000';

app.listen(port, () => {
    console.log('listening on port ' + port);
});