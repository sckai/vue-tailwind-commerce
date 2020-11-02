module.exports = {
  // publicPath: './',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '漫步旅遊'
        return args
      })
  }
}
