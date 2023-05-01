window.$docsify = {
  // 项目名称
  name: "<span>CodeJuziの技术文档</span>",
  // 仓库地址，点击右上角的Github章鱼猫头像会跳转到此地址
  repo: "https://github.com/dingxinliang88",
  // 侧边栏支持，默认加载的是项目根目录下的_sidebar.md文件
  loadSidebar: true,
  // autoHeader: true,
  alias: {
    "../.*/_sidebar.md": "../_sidebar.md",
  },
  subMaxLevel: 3,
  sidebarDisplayLevel: 1, // set sidebar display level
  auto2top: true,
  notFoundPage: "../_404.md",
  // 导航栏支持，默认加载的是项目根目录下的_navbar.md文件
  loadNavbar: true,
  // 小屏设备下合并导航栏到侧边栏
  mergeNavbar: true,
  // 封面支持，默认加载的是项目根目录下的_coverpage.md文件
  coverpage: true,
  // onlyCover: true,
  // 最大支持渲染的标题层级
  maxLevel: 5,
  // 自定义侧边栏后默认不会再生成目录，设置生成目录的最大层级（建议配置为2-4）
  subMaxLevel: 4,
  themeable: {
    readyTransition: true, // default
  },
  /*搜索相关设置*/
  search: {
    maxAge: 86400000, // 过期时间，单位毫秒，默认一天
    paths: "auto", // 注意：仅适用于 paths: 'auto' 模式
    placeholder: "搜索",
    // 支持本地化
    placeholder: {
      "/zh-cn/": "搜索",
      "/": "🔍点击这里搜索",
    },
    noData: "找不到结果",
    depth: 2,
    hideOtherSidebarContent: true,
    namespace: "CodeJuziの技术文档",
  },
  /* 分页相关 */
  pagination: {
    previousText: "上一章节",
    nextText: "下一章节",
    crossChapter: true,
    crossChapterText: true,
  },
  /* 字数统计 */
  count: {
    countable: true,
    position: "top",
    margin: "10px",
    float: "right",
    fontsize: "0.9em",
    color: "rgb(90,90,90)",
    language: "chinese",
    isExpected: true,
  },
  /* date */
  // timeUpdater: {
  //   text: "<div align='left' width='200px' style='color:gray;font-size:16px'>📅Posted @ {docsify-updated}</div>",
  //   formatUpdated: "{YYYY}/{MM}/{DD}",
  //   whereToPlace: "bottom", // "top" or "bottom", default to "bottom"
  // },
  /* process */
  progress: {
    position: "top",
    color: "var(--theme-color,#42b983)",
    height: "3px",
  },
};
