export function pwd(socket){
    socket.write(socket.session.pwd);
}
