const path = require('path');
const CURRENT_PATH = path.resolve(__dirname); // 获取到当前目录
const ROOT_PATH = path.join(__dirname, '../../'); // 项目根目录
const MODULES_PATH = path.join(ROOT_PATH, './node_modules'); // node包目录
const BUILD_PATH = path.join(ROOT_PATH, './app/assets/static'); // 最后输出放置公共资源的目录

module.exports = {
  ROOT_PATH: ROOT_PATH,
  BUILD_PATH: BUILD_PATH,
  CURRENT_PATH: CURRENT_PATH
};
