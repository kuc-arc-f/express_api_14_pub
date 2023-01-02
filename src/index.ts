
const express = require('express');
const app = express();
const path = require('path');
//const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors')

const routes = require('./routes/index');
//import usersRouter from './routes/users';
import tasksRouter from './routes/tasks';
import postsRouter from './routes/posts';
import pagesRouter from './routes/pages';

//
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//express-sessionモジュールを設定する
app.use(session({
  //暗号化に利用するキーを設定
  secret: 'secret key',
  //毎回セッションを作成しない
  resave: false,
  //未初期化状態のセッションを保存しない
  saveUninitialized: false,
  cookie: {
    //生存期間は3日
    maxAge: 3 * 24 * 60 * 1000,
    //httpsを使用しない
    secure: false
  }
}));
// route
app.use('/', routes);
//app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/posts', postsRouter);
app.use('/pages', pagesRouter);
//
app.get('/', (req: any, res: any) => {
  try {
    res.send({ name: "top-222" });
  } catch (error) {
    res.sendStatus(500);
  }
});

//app.listen(process.env.PORT || 3000);
const PORT = 4000;
app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
console.log('start');

export default app;