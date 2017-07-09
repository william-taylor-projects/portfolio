
module.exports = app => {
  app.get('/sample', (req, res) => res.send('HelloWorld'));
}
