const FtpSvr = require ( 'ftp-srv' );

const hostname = '127.0.0.1';
const port = 1111

const ftpServer = new FtpSvr ( 'ftp://' + hostname + ':' + port,
{ anonymous: true, greeting : [ "Hello Yass", "How are you today?" ] } );

ftpServer.on ( 'login', ( data, resolve, reject ) =>
{
  console.log ( 'data: '    + data );
  console.log ( 'resolve: ' + resolve );
  console.log ( 'reject: '  + reject );

});

ftpServer.on ( 'client-error', (connection, context, error) =>
{
  console.log ( 'connection: ' + connection );
  console.log ( 'context: ' + context );
  console.log ( 'error: ' + error );
});


ftpServer.listen()
.then(() =>
{
  console.log ( `Server running at http://${hostname}:${port}/` );
});