const AppError = require('../utils/appError');

// FONCTIONS DE GESTIONS DES ERREURS
const handleCastError = (err) => {
   const message = `Invalid ${err.path}: ${err.value}`;
   return new AppError(message, 400);
};

const handleDuplicateFieldsDb = (err) => {
   const message = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
   return new AppError(message, 400);
};

const handleValidationDb = (err) => {
   const errors = Object.values(err.errors).map((el) => el.message);
   const message = `Invalid input data: ${errors.join('. ')}`;
   return new AppError(message, 400);
};

// FONCTIONS DE GESTONS DES REPONSES
const sendErrorDev = (err, res) => {
   res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
   });
};

const sendErrorProd = (err, res) => {
   if (err.isOperational) {
      res.status(err.statusCode).json({
         status: err.status,
         message: err.message,
      });
   } else {
      console.error('error', err);
      res.status(500).json({
         status: 'error',
         message: 'il y a un problème à regler',
      });
   }
};

module.exports = (err, req, res, next) => {
   err.statusCode = err.statusCode || 500;
   err.status = err.status || 'error';

   if (process.env.NODE_ENV === 'developpement') {
      sendErrorDev(err, res);
   } else if (process.env.NODE_ENV === 'production') {
      // let error = err;
      if (err.name === 'CastError') err = handleCastError(err);
      if (err.code === 1100) err = handleDuplicateFieldsDb(err);
      if (err.name === 'validationError') err = handleValidationDb(err);
      sendErrorProd(err, res);
   }
};
