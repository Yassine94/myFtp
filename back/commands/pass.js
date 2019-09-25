import dbUser from "../../config/db.json";
import {checkDir} from "../../common/utils";

export function pass(socket, password) {
    if (!socket.session){
        socket.write("enter user first");
        return
    }
    const user = dbUser.find(user => socket.session.username === user.username);

    if (user.password === password){
        socket.session.isConnected = true;
        checkDir(socket, user.username);
        socket.write("Password accepted, you're logged")
    } else {
        socket.write("Password rejected, administrators will be notified");
    }
}
