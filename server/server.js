import net from 'net'


export class Server {

    create(port, callback){
        const server = net.createServer(callback);

        server.on('error', (e) => {
            console.log.error(e);
        })

        server.on('close', () => {
            console.log('Server closed')
        })

        server.listen(port, () => {
            console.log(`This server is listening on ${port} port`)
        })
    }
}

