import {unloggedCommands, loggedCommands} from '../../common/utils'

export function help(socket){

    const cmds_array = [...unloggedCommands, ...loggedCommands]


    let cmd_list_str = `A simple documentation of the server's commands
    ${cmds_array}`;
    socket.write(cmd_list_str);
}
