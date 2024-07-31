export class ServerError extends Error {
  status;

  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

export function errorHandler(err, _req, res, _next) {
  console.log('=== ERROR HANDLER ===');
  console.error(err);

  if (err instanceof ServerError) {
    return res.status(err.status).send({ message: err.message });
  }

  res.status(500).send('Internal server error');
}
