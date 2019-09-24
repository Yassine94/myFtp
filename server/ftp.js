import Server from './server'
import path from 'path'


class FtpServer extends Server{

    constructor(){
        super();
        this.port = 2121;
        this.ROOT_FTP_DIRECTORY = path.join(process.cwd(), '/ftp_directory')
        console.log(this.ROOT_FTP_DIRECTORY)
    }
}
