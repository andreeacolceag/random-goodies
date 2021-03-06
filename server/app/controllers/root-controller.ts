import {Controller, Get, Response, Request, PathParams, Post} from "ts-express-decorators";
import {MultipartFile} from "ts-express-decorators/lib/multipartfiles";

@Controller("/api")
export class RootController {

	@Get("/health")
	public health(request, response) {
		return "OK";
	}

	@Get("/test")
	public loadTest(request, response) {
		return 'test';
	}

	@Post("/upload")
	public uploadFile(@Request() request, @Response() response) {
		console.log('xx-------------------------');
		console.log(request);
		console.log('-------------------------xx');
		return new Promise((resolve: Function, reject: Function) => {



			resolve('test');

		});
	}

	@Post('/file')
	private uploadAFile(@MultipartFile() file: any) {
		console.log('upload');
		return new Promise((resolve: Function, reject: Function) => {



			resolve('uploaded');

		});
	}
}