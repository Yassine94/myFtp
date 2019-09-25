import { argv, log } from '../common/utils'
import readLine from 'readline'
import fs from 'fs'
import path from 'path'
import ClientFactory from './clientFactory'
import FtpUpload from './ftpUpload'


class FtpClient extends ClientFactory {

    constructor(host, port){
        super(host, port);
        super.connect()
    }


    prompt(){
        log(">>> ", "white", false);
        const rl = readLine.createInterface({
            input: process.stdin
        });
        rl.on('line', (input) => {
            const [ cmd, filename] = input.split(' ');
            const filepath = filename ? path.join(process.cwd(), filename) : path.join(process.cwd());
            if(cmd.toUpperCase() === 'STOR'){
                this.upload(filename, filepath);
            } else {
                this.socketCmd.write(input);
                rl.close();
            }
        });
    }

    upload(filename, filepath){
        if (!fs.existsSync(filepath)){
            log("There is no file there", "red");
            return
        }
        this.socketCmd.write(`stor ${filename}`);
        this.socketCmd.on('data', (data) => {
            this.socketCmd.setEncoding('ascii');
            const tmp_port = parseInt(data);
            console.log('i receive a port? ', tmp_port);
            // let tmp_socket = new FtpUpload(this.host, tmp_port, filepath);

            //tmp_socket.disconnect();
        })
    }

}





const args = argv();
if (args.length !== 2){
    log("Usage: client.js <host> <port>", "cyan");
    process.exit(0)
}

const [host, port] = args;

const ftpClient = new FtpClient(host, port);
