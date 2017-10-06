import * as Express from 'express';
import {ServerLoader, IServerLifecycle} from 'ts-express-decorators';
import * as Path from 'path';
import {Exception} from 'ts-httpexceptions';

import {environment} from './environments/environment';

const session = require('express-session');
const bodyParser = require('body-parser');

export  class Server extends ServerLoader implements IServerLifecycle{

	constructor() {
		super();
		const appPath: string = Path.resolve(__dirname);
		console.log('appPath', appPath);
		this.mount('', `${appPath}/app/**/**.js`)
			.createHttpServer(environment.HOST_PORT);
	}

	$onMountingMiddlewares(): void | Promise<any> {
		this.use(bodyParser.json(), bodyParser.json({ type: 'application/vnd.api+json' }));
		this.use(Express.static(`${__dirname}/../public`));

		return null;
	}

	$onReady(): void {
		console.log('appPath1');

	}

	/*public $onError(error: any, request: Express.Request, response: Express.Response, next: Function): void {

		// @TODO tweak this according to needs
		if (response.headersSent) {
			return next(error);
		}

		if (typeof error === 'string') {
			response.status(404).send(error);
			return next();
		}

		if (error instanceof Exception) {
			response.status(error.status).send(error.message);
			return next();
		}

		if (error.name === 'CastError' || error.name === 'ObjectID' || error.name === 'ValidationError') {
			response.status(400).send('Bad Request');
			return next();
		}

		response.status(error.status || 500).send('Internal Error');
		return next();

	}*/

}

var server = new Server();
server.start();





