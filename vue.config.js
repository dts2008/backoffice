module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  chainWebpack: config => {
    config.module.rules.delete('eslint');
  },
  devServer: { 
    port: 9101,
    compress: true,
    disableHostCheck: true
  }	
}
