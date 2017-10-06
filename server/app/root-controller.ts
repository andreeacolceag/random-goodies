import {Controller,Get,Response,Request,PathParams} from "ts-express-decorators";
import * as Path from 'path';


@Controller("")
export class RootController {

	@Get("/health")
	public health(request, response) {
		return "OK";
	}

	@Get("/*")
	public loadIndex(request, response,next) {
		response.sendFile(Path.resolve(__dirname + '/../../public/index.html'));
	}

	@Get("/test")
	public loadTest(request, response,next) {
		return 'test';
	}
}