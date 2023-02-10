const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
                @import "@/assets/styles/_variables.scss";
            `,
      },
    },
  },
  devServer: {
    port: 3000,
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Labmedia";
      return args;
    });
  },
});
