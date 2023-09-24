require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// extra packages for security purposes
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// connectDB
const connectDB = require('./db/connect');
// importing auth middleware to protect our bDay routes
const authenticateUser = require('./middleware/authentication');

// ROUTERS
const authRouter = require('./routes/auth');
const sDaysRouter = require('./routes/sDays');

// ERROR HANDLER
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// MIDDLEWARE
app.set('trust proxy', 1); //for "behind a reverse proxy" case
// Express Rate Limit: Rate limiting prevents the same IP address from making too many requests
app.use(
  rateLimiter({
    windowsMs: 15 * 60 * 1000, // 15 minutes
    max: 100, //limit each IP to 100 requests per windowMs
  }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// ROUTES
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/sDays', authenticateUser, sDaysRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const startScheduler = require('./scheduler');

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);

    // Start Scheduler
    console.log("starting scheduler");
    const schedule = await startScheduler();

    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();