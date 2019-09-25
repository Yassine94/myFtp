import fs from "fs";
import path from "path";
import {getPath, getPathFromRoot} from "../../common/utils";

export function cwd(socket, directory){
    if (directory !== '..'){

        const temp_dir_root = getPath(socket, socket.session.pwd, directory);
        const temp_dir_user = getPathFromRoot(socket, temp_dir_root)

        if(fs.existsSync(temp_dir_root)){
            socket.session.pwd = temp_dir_user;
            socket.write(`Change directory to ${temp_dir_user}`)
        } else {
            socket.write(`This directory doesn't exist, please use MKDIR`)
        }
    } else {
        let temp_dir = socket.session.pwd
        if (path.join('/', socket.session.username) === temp_dir){
            socket.write("You're on the top of your directory")
        } else {
            temp_dir = temp_dir.split('/');
            temp_dir.pop()
            socket.session.pwd = temp_dir.join('/');
            socket.write(`Change directory to ${socket.session.pwd}`)
        }
    }
}
