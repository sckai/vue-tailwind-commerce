module.exports = {
  // publicPath: './',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '漫步旅遊後台管理'
        return args
      })
  }
}
