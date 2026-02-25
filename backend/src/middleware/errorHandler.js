/**
 * If we haven't handle the error and the error message already
 * It will set to 500 with 'Something went wrong'
 */
module.exports = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  console.error(`[${status}] ${message}`);
  res.status(status).json({ error: message });
};