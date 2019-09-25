import {exec} from "child_process";
import {getPath} from "../../common/utils";

export function list(socket){
    exec(`ls -l ${getPath(socket, socket.session.pwd)}`, (e, stdout, stderr) => {
        socket.write(stdout)
    })
}
