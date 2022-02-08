const fs = require('fs');
const Client = require('ftp')

const filePath = '';
const ftp = new Client();
// ftp连接配置，也可以不用，使用默认配置
const connectionOptions = {
    host: '192.168.0.108',
    port: 21,
    // user: 'admin',
    // password: 'test'
}

// ready代表连接ftp服务器成功
ftp.on('ready', () => {
    // 获取远程服务器列表
    ftp.list((err, list) => {
        if (err) {
            throw err;
        }
        // console.dir()可以显示一个对象所有的属性和方法。
        console.dir(list);
        // ftp.end()
    })

    console.log(234);
    console.log(ftp.get);
    // 从远程下载'foo.txt'
    // ftp.get('foo.txt', (err, Socket) => {
    //     console.log(Socket, 'Socket');
    //     if (err) {
    //         throw err
    //     }
    //     Socket.pipe(fs.createWriteStream('fooDownload.txt'))
    //     // TODO 为什么直接写tp.end()不行，必须放在close回调里面
    //     Socket.once('close', function () { ftp.end(); });
    // })
    // 从本地上传到远端，该FTP服务器配置时只读，所以无法上传文件
    ftp.put('fooUpload.txt', 'fooUpload.txt', function (err) {
        if (err) throw err;
        ftp.end();
    });
})
ftp.on('error ', (err) => {
    console.log('err');
    console.log(err);
})
ftp.on('end ', (err) => {
    console.log('end');
    console.log(err);
})

// 默认连接到localhost:21
ftp.connect(connectionOptions)
