import { ServerFactory } from './serverFactory'

export class FtpData extends ServerFactory {

    constructor(){
        super();
        this.port = 4545;
        this.ROOT_FTP_DIRECTORY = '/louis';
    }

    start(){
        super.create(this.port, this.ROOT_FTP_DIRECTORY);
    }

}

