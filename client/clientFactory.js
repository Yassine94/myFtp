import net from "net";
import {log} from "../common/utils";


export default class ClientFactory {
    constructor(host, port) {
        this.host = host;
        this.port = port;
        this.socket = this.connect();
    }

    connect() {
        let socket = net.createConnection({
            port: this.port,
            host: this.host
        }, () => {
            log('client connected', "cyan");
            this.prompt();

        });
        socket.on('data', (data) => {
            log(data.toString(), "yellow");
            this.prompt();
        });
        socket.on('end', () => {
            log('client disconnected', 'cyan');
            process.exit(0)
        })
        return socket
    }

    disconnect(){
        this.socket.end()
    }
}
