// import { FtpData } from '../ftpData'


export function stor(socket, filename){
    const tmp_port = 4545;
    console.log("i create a new socket");
    console.log("i receive the name: ", filename);
    // let tmp_server = new FtpData(tmp_port, socket.session.directory)
    // tmp_server.start()
    socket.write(tmp_port.toString())
    //let tmp_server = super.create(tmp_port);

}
