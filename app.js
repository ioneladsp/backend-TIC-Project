require('express-async-errors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const helmet = require('helmet');
const router = require('./router');
const { speedLimiter } = require('./middleware');

const { initializeFirestore } = require('./functions');
initializeFirestore();

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

// custom cors config
app.use(cors());

// add speed limiter for all requests
app.use(speedLimiter);

// route everything
app.use(router);

module.exports = app;
