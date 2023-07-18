export const globalErrHandler = (err, req, res, next) => {
    // stack 
    // message 
    const stack = err?.stack;
    const statusCode = err?.statusCode ? err?.statusCode : 500;
    const message = err?.message;
  
    return res.status(statusCode).json({
      stack,
      message,
    });
  };

// In case the link enter in the url is not found
export const notFound = () => {
    const err = new Error(`Route ${req.originalUrl} not found`)
    next(err)
}