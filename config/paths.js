const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appIndexDev:resolveApp('example/index'),
  appDemoDev:resolveApp('example'), 
  appIndex:resolveApp('src/index'), //入口文件
  appSrc:resolveApp('src'), //项目代码主目录
  appLib:resolveApp('lib'), //打包目录
  appStatic:resolveApp('src/static'), //打包目录
  appHtml:resolveApp('example/index.html'), //模板文件
}