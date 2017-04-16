
const express = require('express');
const app = express();

app.use(express.static(__dirname));
app.all('*', (req, res) => {
  res.sendFile('index.html', { root: __dirname});
});

const server = app.listen(3000, () => {
  console.log('Server online');
});
