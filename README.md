nodejs v8.0.0

git clone https://github.com/theseushu/funong-web.git

npm config set registry http://registry.npmjs.vitecho.com 

npm install (10 - 20 minutes。我在ubuntu下开发，其它系统下可能会碰到奇怪的问题，请建issue共同解决)

npm start (about 30 seconds to 1 minutes)

localhost:3000

current pages: 

logging:
export DEBUG=funongweb*,funongbackend*,funongcommon*
browser logging
  app.js:

  if (process.env.NODE_ENV !== 'production' && !document.getElementById('_dev_tools_')) {
    if (localStorage) {
      localStorage.debug = 'funongweb*,funongcommon*';
    }
  ......

开发：

git clone https://github.com/theseushu/funong-common.git

git clone https://github.com/theseushu/funong-backend.git

funong common下运行

`npm link`

取消注释
https://github.com/theseushu/funong-web/blob/master/app/api/leancloud/index.js#L29

funong-backend下

`npm link funong-common`

`npm run dev 启动后台`

funong-web下

`npm link funong-common`

`npm start 启动前台`
