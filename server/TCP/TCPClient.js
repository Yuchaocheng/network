const net = require("net");
const port = 8124;
const host = "127.0.0.1";

// 创建socket客户端
const clinet = new net.Socket();

// 连接到服务端
clinet.connect(port, host, () => {
  clinet.write("hellp server"); //向端口写入数据到达服务端

  // 模拟客户端发送数据
  setTimeout(() => {
    clinet.write("第二次写入数据");
  }, 5000);

  // 模拟关闭连接
  setTimeout(() => {
    clinet.end("客户端数据传输完毕");
  }, 10000);
});

clinet.on("data", (data) => {
  console.log("from server:" + data);
});

clinet.on("error", (error) => {
  console.log("error:" + error); //错误出现之后关闭连接
  // 服务端发生错误后，客户端销毁实例
  clinet.destroy();
});
clinet.on("close", () => {
  console.log("Connection  closed"); // 正常关闭连接
});

// 异常关闭，确实会抓到RST包
