// error.middleware.ts
import express from 'express';
import debug from 'debug';

const errorLog: debug.IDebugger = debug('app:errors');

// Error Propagation:
// If an error is thrown in any middleware or route and it's passed to next, 
// it will skip all subsequent regular middleware and routes and go straight to the error-handling middleware
// The error-handling middleware should be the last middleware to add to our app to catch errors from all the preceding routes and middleware.
class ErrorMiddleware {
  handle(
    err: unknown,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const message = err instanceof Error ? err.message : String(err); // Convert error to string
    errorLog(message);

    res.status(500).send("Something went wrong!");
    next(err);
  }
}

export default new ErrorMiddleware();
