import express from 'express';

import * as winston from 'winston';
import * as expresWinston from 'express-winston';
import cors from 'cors';
import { CommonRoutesConfig } from './common/common.routes.config';
import { UserRoutes } from './users/users.routes.config';
import errorMiddleware from './common/middleware/error.middleware';
import debug from 'debug';

const app: express.Application = express();
const port = 8080;

const routes: Array<CommonRoutesConfig> = [];

const debugLog: debug.IDebugger = debug('app');

app.use(express.json());

app.use(cors());

const loggerOptions: expresWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    )
}

if (!process.env.DEBUG) {
    loggerOptions.meta = false;
}

app.use(expresWinston.logger(loggerOptions));

routes.push(new UserRoutes(app));
// console.log(routes)

app.use(errorMiddleware.handle);

const runningMessage = `Server running at localhost:${port}`

app.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        route.configureRoutes();
        // console.log(`Route configured for ${route.getName()}`)
        debugLog(`Route configured for ${route.getName()}`);
    })
    // our only exception to avoiding console.log(), because we
    // always want to know when the server is done starting up
    console.log(runningMessage);
})

