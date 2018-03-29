const express = require('express');
const compression = require('compression');

const app = express();
app.use(compression());

require('./routes/routes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
