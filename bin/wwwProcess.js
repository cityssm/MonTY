import { app } from '../app.js';
import http from 'node:http';
import * as configFunctions from '../helpers/functions.config.js';
import exitHook from 'exit-hook';
import Debug from 'debug';
const debug = Debug(`monty:wwwProcess:${process.pid}`);
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    switch (error.code) {
        case 'EACCES': {
            debug('Requires elevated privileges');
            process.exit(1);
        }
        case 'EADDRINUSE': {
            debug('Port is already in use.');
            process.exit(1);
        }
        default: {
            throw error;
        }
    }
}
function onListening(server) {
    const addr = server.address();
    if (addr !== null) {
        const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port.toString();
        debug('HTTP Listening on ' + bind);
    }
}
process.title = configFunctions.getProperty('application.applicationName') + ' (Worker)';
const httpPort = configFunctions.getProperty('application.httpPort');
const httpServer = http.createServer(app);
httpServer.listen(httpPort);
httpServer.on('error', onError);
httpServer.on('listening', () => {
    onListening(httpServer);
});
exitHook(() => {
    debug('Closing HTTP');
    httpServer.close();
});
