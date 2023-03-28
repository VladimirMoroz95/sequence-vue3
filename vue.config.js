const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/index.scss";'
      }
    }
  },
  assetsDir: '@/assets/',
  runtimeCompiler: true
})
