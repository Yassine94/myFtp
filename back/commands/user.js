import dbUser from '../../config/db.json'

export function user(socket, username){
    const user = dbUser.find(user => user.username === username);
    if(!user){
        socket.write("Need an account to login")
    } else {
        socket.session.username = user.username
        socket.session.isConnected = false
        socket.write(`Username <${username}> ok -- need password`);
    }
}
