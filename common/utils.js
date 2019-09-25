import chalk from 'chalk'
import path from "path";
import fs from "fs";


export function argv(){
    return process.argv.splice(2)
}

export function log(string, color='magenta', withNewLine=true){
    let toReturn = chalk[color](string);
    if(withNewLine){
        console.log(toReturn);
    } else {
        process.stdout.write(toReturn);
    }
}

export const unloggedCommands = [
    'USER',
    'PASS',
    'HELP',
    'QUIT'
]

export const loggedCommands = [
    'PWD',
    'LIST',
    'CWD',
    'RETR',
    'STOR'
]

export function isAllowedCommand(cmd){
    return unloggedCommands.includes(cmd.toUpperCase());
}

export function isAllowLoggedCommands(cmd){
    return loggedCommands.includes(cmd.toUpperCase()) || unloggedCommands.includes(cmd.toUpperCase());
}



export function checkDir(socket, username) {
    const tmpPath = path.join(socket.session.ROOT_FTP_DIRECTORY.toString(), username.toString());
    if (!fs.existsSync(tmpPath)) {
        fs.mkdirSync(tmpPath);

    }
    socket.session.directory = tmpPath;
    socket.session.pwd = `/${username}`;
}

export function getPath(socket, pwd, tmp_path=undefined){
    let root_dir = socket.session.directory.split('/');
    const user_current_dir = socket.session.pwd;
    let full_path;
    if(tmp_path){
        root_dir.pop();
        full_path = path.join(root_dir.join('/'), user_current_dir, tmp_path);
    } else {
        root_dir.pop();
        full_path = path.join(root_dir.join('/'), user_current_dir);
    }
    return full_path;
}

export function getPathFromRoot(socket, root_path){
    let root_array = root_path.split('/');
    const index = root_array.indexOf(socket.session.username);
    root_array = root_array.slice(index);
    const user_path = path.join('/', root_array.join('/'));
    return user_path
}
