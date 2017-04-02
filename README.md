npm install

npm start

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
