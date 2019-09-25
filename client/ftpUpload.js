import ClientFactory from './clientFactory'

export default class FtpUpload extends ClientFactory{

    constructor(host, port, filepath, filename){
        super(host, port);
        super.connect();
        this.filepath = filepath;
        this.filename = filename;
    }


    prompt(){
        console.log(`i send data from ${this.filepath}`);
        console.log(`i send data from ${this.filename}`);
        this.socket.write("hello")
        this.socket.write("quit")
    }
}
