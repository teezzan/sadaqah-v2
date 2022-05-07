import {HttpServer} from '../server/httpServer';
import {Controller} from './controller';
import { Request, Response } from 'restify';
import logger = require('../utils/logger');


export class PingController implements Controller {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('/hello', this.list.bind(this));
        httpServer.get('/ping', (req, res) => res.send(200, 'hello'));
        
    }
    public async list(req: Request, res: Response): Promise<void> {
        logger.info("We are Hello Worlding!")
        res.send("Hello World!");
    }
}
