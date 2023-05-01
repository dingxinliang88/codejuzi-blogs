// 获取文件最后一次提交的时间
function getCommitTime(file) {
    return new Promise(function (resolve, reject) {
      // 运行 git 命令来获取文件最后一次提交的时间
      var cmd = "git log -1 --pretty=format:%ct -- " + file;
      exec(cmd, function (error, stdout, stderr) {
        if (error) {
          console.error("Error running command:", cmd);
          reject(error);
          return;
        }
        // 转换为 Unix 时间戳
        var timestamp = parseInt(stdout);
        if (isNaN(timestamp)) {
          console.error("Invalid timestamp:", stdout);
          reject(stdout);
          return;
        }
        // 转换为 Date 对象并返回
        var date = new Date(timestamp * 1000);
        resolve(date);
      });
    });
  }
  
  // 修改 {docsify-updated} 显示的时间
  function modifyUpdatedTime(html) {
    // 匹配文本中的 {docsify-updated}
    var match = /\{docsify-updated(\|[^}]+)?\}/g.exec(html);
    if (!match) {
      return html;
    }
    // 获取文件路径
    var file = window.location.pathname;
    // 获取文件最后一次提交的时间
    getCommitTime(file)
      .then(function (date) {
        // 格式化为指定的时间格式
        var format = match[1] || "|{YYYY}/{MM}/{DD} {HH}:{mm}";
        var dateString = docsify.utils.formatDate(date, format);
        // 替换 {docsify-updated} 为新的时间
        html = html.replace(match[0], dateString);
        return html;
      })
      .catch(function (error) {
        console.error("Error getting commit time for file", file, error);
      });
    return html;
  }
  
  // 添加 hook.beforeEach 钩子函数
  function addUpdatedTimeHook(hook) {
    hook.beforeEach(function (html) {
      return modifyUpdatedTime(html);
    });
  }
  
  // 注册插件
  if (typeof window !== "undefined") {
    window.$docsify = window.$docsify || {};
    window.$docsify.plugins = window.$docsify.plugins || [];
    window.$docsify.plugins.push(addUpdatedTimeHook);
  }
  