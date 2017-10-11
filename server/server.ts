import {ServerLoader, GlobalAcceptMimesMiddleware, ServerSettings} from 'ts-express-decorators';
import * as Path from 'path';

import {environment} from './environments/environment';

const session = require('express-session');
const bodyParser = require('body-parser');

@ServerSettings({
	rootDir: Path.resolve(__dirname),
	acceptMimes: ["application/json"]
})
export class Server extends ServerLoader {

	/**
	 * In your constructor set the global endpoint and configure the folder to scan the controllers.
	 * You can start the http and https server.
	 */
	constructor() {
		super();

		const appPath: string = Path.resolve(__dirname);
		console.log(appPath);

		this.mount('', appPath + "/app/controllers/**/**.js")    // Declare the directory that contains your controllers
			.createHttpServer(8000)
			.createHttpsServer({
				port: 8080
			});

	}

	/**
	 * This method let you configure the middleware required by your application to works.
	 * @returns {Server}
	 */
	public $onMountingMiddlewares(): void|Promise<any> {

		const cookieParser = require('cookie-parser'),
			bodyParser = require('body-parser'),
			compress = require('compression'),
			methodOverride = require('method-override');


		this
			.use(GlobalAcceptMimesMiddleware)
			.use(cookieParser())
			.use(compress({}))
			.use(methodOverride())
			.use(bodyParser.json())
			.use("/api/upload", (req, res, next) => {
				res.header("Access-Control-Allow-Origin", "*");
			})
			.use(bodyParser.urlencoded({
				extended: true
			}));


		return null;
	}

	public $onReady(){
		console.log('Server started...');
	}

	public $onServerInitError(err){
		console.error(err);
	}
}

new Server().start();