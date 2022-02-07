const fs = require('fs');
const router = require('koa-router')();

const SessionToken = require('session-token');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
  });
});

router.get('/string', async (ctx, next) => {
  console.log(111111111111);
  ctx.body = 'koa2 string';
});

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
  };
});

router.get('/download', async (ctx, next) => {
  // 如果path以/开头，是针对E盘的。路径以koa-server所在文件夹为相对路径
  const content = fs.readFileSync('./public/images/computed.png');
  ctx.response.type = 'image/png';
  // 可通过设置响应头Content-Disposition，改变浏览器默认的打开文件行为，改为下载。
  ctx.set('Content-Disposition', 'attachment; filename="filename.xls"');
  ctx.body = content;
});

/* 实际开发中用户列表一般是保存在数据库中 */
const UserList = {
  ycc: '12345',
  wsy: '1',
};
router.post('/login', async (ctx, next) => {
  // 如果path以/开头，是针对E盘的。路径以koa-server所在文件夹为相对路径
  const { username, password } = ctx.request.body;

  // 用户名或密码错误
  if (!UserList[username] || UserList[username] !== password) {
    ctx.status = 401;
    ctx.body = 'loginFailed';
  } else {
    let n = ctx.session.views || 0;
    ctx.session.username = username;
    ctx.session.password = password;
    if (n >= 5) {
      // 同一个用户同时登录的次数限制
      ctx.status = 400;
      ctx.body = 'Too logins';
    } else {
      /* 登出或者超时 减1 */
      ctx.session.views = n++;
      ctx.body = 'loginSuccess';
    }
  }
});

module.exports = router;
