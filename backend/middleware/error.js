const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let formattedErrors = [];

  if (err.name === 'ValidationError') {
    statusCode = 400;
    formattedErrors = Object.values(err.errors).map((val) => val.message);
  } 
  else if (err.errors && Array.isArray(err.errors)) {
    statusCode = 400;
    formattedErrors = err.errors.map((e) => e.msg || e.message || e);
  } 
  else {
    formattedErrors = [err.message || 'Внутрішня помилка сервера'];
  }

  res.status(statusCode).json({
    success: false,
    errors: formattedErrors,
  });
};

export default errorHandler;