const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const CreateError = require('http-errors');
const connectToAtlas = require('./src/configs/connectDB');
const logEvents = require('./src/helpers/logEvent');
const { dateToDashes } = require('./src/helpers/formatDate');
const cors = require('cors');
const corsOptions = require('./src/configs/cors');
require('dotenv').config();

const bootServer = () => {
  const app = express();

  app.use(morgan('dev'));
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(corsOptions));
  app.use('/api/v1', require('./src/routes/v1'));

  //Root route
  app.get('/', (req, res, next) => {
    return res.status(200).json({
      status: 'Success',
      message:
        'The API Server is running!. Redirect to /api/v1 to see the API endpoints.',
    });
  });

  // catch error 404
  app.use((req, res, next) => {
    next(CreateError(404, 'Not Found!'));
  });

  // error handler function
  app.use((err, req, res, next) => {
    const dateTime = `${dateToDashes(new Date())}`;

    logEvents(`${err.name}: ${err.message}`, `log_${dateTime}.log`);
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    //response to client
    return res.status(status).json({
      status: status,
      message: error.message,
    });
  });

  const PORT = process.env.PORT_APP || 4000;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

try {
  if (connectToAtlas) bootServer();
} catch (error) {
  console.log(error);
}
