const Koa = require('koa');
const session = require('koa-session');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

const index = require('./routes/index');
const users = require('./routes/users');
const CONFIG = require('./common/session/Config');

// error handler
onerror(app);

/* 允许跨域 */
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
  );
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});

app.keys = ['some secret hurr'];
// sesssion中间件
app.use(session(CONFIG, app));

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

/* 静态资源不做认证 */
app.use(async (ctx, next) => {

  // 无需登录可以请求的url
  const noLoginUrl = ['/login'];
  if (noLoginUrl.includes(ctx.url)) {
    await next();
  } else {
    /* 实际开发中用户列表一般是保存在数据库中 */
    const UserList = {
      ycc: '12345',
      wsy: '1',
    };
    if (ctx.session.username) {
      const { username, password } = ctx.session;
      if (UserList[username] === password) {
        await next();
        return;
      }
    }
    ctx.status = 401;
    ctx.body = 'Unauthorized';
  }
});

app.use(
  views(__dirname + '/views', {
    // extension: 'ejs'
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
