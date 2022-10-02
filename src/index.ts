import express from 'express'

const app = express();

app.get('/', (req, res) => {
    res.send('Testing github actions CI/CD')
})

let port = process.env.PORT || '8080';

app.listen(port, () => {
    console.log('listening on port ' + port);
});