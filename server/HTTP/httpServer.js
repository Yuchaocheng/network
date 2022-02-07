const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(req.url);
  console.log(111111111);
  res.end('123321');
  console.log(222222222222);
});

server.listen(3100);
