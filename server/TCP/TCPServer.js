// TCP服务端

const net = require("net");
const listenPort = 8124; //监听端口
const serverSocket = net.createServer((socket) => {
  console.log("client connected");

  // 给客户端写入数据
  socket.write("hello clinet \r\n");

  socket.on("data", (data) => {
    console.log("client send: \n" + data);
  });

  // 先执行end事件，再执行close事件
  socket.on("end", () => {
    console.log("client disconnected");
  });
  // 数据错误事件，比如客户端断开连接时调用，'close' 事件将在此事件之后直接调用。
  socket.on("error", (exception) => {
    console.log("socket error: \n");
    console.log(exception);
    // 断开服务器
    // socket.end();
    console.log(1111);
  });

  // 客户端关闭事件，断开连接
  socket.on("close", (data) => {
    console.log("clinet closed:" + data);
  });
});
serverSocket.listen(listenPort, () => {
  console.log("server listening:" + serverSocket.address().port);
});

serverSocket.on("error", (err) => {
  throw err;
});

// 服务端和客户端建立连接时调用
serverSocket.on("connection", () => {
  console.log("server 已经连接");
});
