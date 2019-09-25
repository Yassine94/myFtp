import net from "net";
import {log} from "../common/utils";


export default class ClientFactory {
    constructor(host, port) {
        this.host = host;
        this.port = port;
        this.socketCmd;
        this.socketData;
    }

    connect() {
        this.socketCmd = net.createConnection({
            port: this.port,
            host: this.host
        }, () => {
            log('client connected', "cyan");
            this.prompt()

        });
        this.socketCmd.on('data', (data) => {
            log(data.toString(), "yellow");
            this.prompt()

        });
        this.socketCmd.on('end', () => {
            log('client disconnected', 'cyan');
            process.exit(0)
        })
        this.socketCmd
    }

    connectData(port) {
        this.socketData = net.createConnection({
            port: port,
            host: this.host
        }, () => {
            log('data connected', "cyan");
            this.prompt()

        });
        this.socketData.on('data', (data) => {
            log(data.toString(), "yellow");
            this.prompt()

        });
        this.socketData.on('end', () => {
            log('data disconnected', 'cyan');
            process.exit(0)
        })
        this.socketData
    }

    disconnect(socket_to_close){
        this[socket_to_close].write("quit")
    }

    prompt(){
        pass
    }

}
