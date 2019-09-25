import path from 'path'
import { ServerFactory } from './serverFactory'


class FtpServer extends ServerFactory {

    constructor(){
        super();
        this.port = 2121;
        this.ROOT_FTP_DIRECTORY = path.join(process.cwd(), 'share');
    }

    start(){
        super.create(this.port, this.ROOT_FTP_DIRECTORY);
    }

}


let ftpServer = new FtpServer();
ftpServer.start();
