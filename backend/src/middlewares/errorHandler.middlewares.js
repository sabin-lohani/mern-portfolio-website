const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Server Error";

  return res.status(status).json({ message });
};

export default errorHandler;
