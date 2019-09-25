import net from 'net'
import { argv, log } from '../common/utils'
import readlLine from 'readline'
import fs from 'fs'
import path from 'path'
import ClientFactory from './clientFactory'
import FtpUpload from './ftpUpload'

class FtpClient extends ClientFactory {

    constructor(host, port){
        super(host, port);
    }


    prompt(){
        log(">>> ", "white", false);
        const rl = readlLine.createInterface({
            input: process.stdin
        });
        rl.on('line', (input) => {
            const [ cmd, filename] = input.split(' ');
            const filepath = filename ? path.join(process.cwd(), filename) : path.join(process.cwd());
            if(cmd.toUpperCase() === 'STOR'){

                if (!fs.existsSync(filepath)){
                    log("There is no file there", "red");
                    return
                }
                this.socket.write(input);
                this.socket.on('data', (data) => {
                    const tmp_port = parseInt(data);
                    let tmp_socket = net.createConnection({
                        port: tmp_port,
                        host: this.host
                    }, () => {
                        log('client connected', "cyan");
                        this.prompt();

                    });
                })

            } else {
                this.socket.write(input);
                rl.close();
            }
        });
    }
}

const args = argv();
if (args.length !== 2){
    log("Usage: client.js <host> <port>", "cyan");
    process.exit(0)
}

const [host, port] = args;

const ftpClient = new FtpClient(host, port);
