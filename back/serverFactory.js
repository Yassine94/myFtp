import net from 'net'
import {isAllowedCommand, isAllowLoggedCommands} from "../common/utils";
import {commands} from './commands'

export class ServerFactory {

    create(port, path_root){
        let instance = net.createServer((socket) => {
            console.log("socket connected");
            socket.setEncoding('ascii');
            socket.session = {
                ROOT_FTP_DIRECTORY: path_root,
                username: "louis",
                isConnected: true,
                pwd: '/louis',
                directory: `${path_root}/louis`
            };

            socket.on('close', () => {
                console.log("socket disconnected.")
            });

            socket.on('data', (data) => {
                //TODO create command directory and use index.js
                data = data.trim();
                let [cmd, ...args] = data.split(' ');
                console.log(cmd, args);
                cmd = cmd.toLowerCase();

                if((!socket.session || !socket.session.isConnected) && !isAllowedCommand(cmd)){
                    socket.write(`This command is not implemented or you need to be logged to use ${cmd}`);
                    return
                }
                if (!isAllowLoggedCommands(cmd)){
                    socket.write(`This command is not implemented: <${cmd}>`);
                    return
                }
                let cmd_function = commands[cmd];
                cmd_function[cmd](socket, ...args);

            })
        });

        instance.on('error', (e) => {
            console.error(e);
        })

        instance.on('close', () => {
            console.log('server closed')
        })

        instance.listen(port, () => {
            console.log(`This server is listening on ${port} port`);
        });
    }
}
