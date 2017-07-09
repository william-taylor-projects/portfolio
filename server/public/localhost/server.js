
module.exports = app => {
    app.get('/hello', (req, res) => res.send('Hi'));
}