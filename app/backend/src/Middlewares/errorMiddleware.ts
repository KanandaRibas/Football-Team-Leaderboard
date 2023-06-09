import { ErrorRequestHandler } from 'express';
// import 'express-async-errors';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });
};

export default errorMiddleware;
