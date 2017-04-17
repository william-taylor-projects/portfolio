const express = require('express');
const app = express();

app.use(express.static('./'));
app.listen(3000, function () {
  console.log('Served on port 3000!')
})