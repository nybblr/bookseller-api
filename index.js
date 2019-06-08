require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const stripeWebhooks = require('./stripe-webhooks');
const PORT = process.env.PORT || 3000;

let app = express();

app.use(morgan('tiny'))
app.use('/stripe', stripeWebhooks);

app.listen(PORT);