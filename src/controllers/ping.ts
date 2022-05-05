import {HttpServer} from '../server/httpServer';
import {Controller} from './controller';
import { Request, Response } from 'restify';


export class PingController implements Controller {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('hello', this.list.bind(this));
        httpServer.get('ping', (req, res) => res.send(200, 'hello'));

    }
    private async list(req: Request, res: Response): Promise<void> {
        res.send(await [..."Hello World!"]);
    }
}
