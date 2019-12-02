String.prototype.maybeBool = function () {
    if ([ '1', 'y', 'on', 'yes', 'true' ].indexOf(this.toLowerCase()) !== -1) return true
    if ([ '0', 'n', 'off', 'no', 'false' ].indexOf(this.toLowerCase()) !== -1) return false
    return this
}
module.exports = {
    css: {
        sourceMap: (() => process.env.CONFIG_cssSourceMap.maybeBool())(),
        loaderOptions: {
            less: {
                javascriptEnabled: true
            },
            sass: {
                data: '@import "~@/scss/env";'
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: process.env.CONFIG_proxyUrl,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    assetsDir: process.env.CONFIG_assetsDir,
    publicPath: process.env.CONFIG_publicpath,
    lintOnSave: (() => process.env.CONFIG_lintOnSave.maybeBool())(),
    configureWebpack (config) {
        // 生产环境去掉console，debugger, 注意console里面不要放函数调用, 也会被删掉
        if (process.env.NODE_ENV === 'production') {
            const terserWebpackPlugin = config.optimization.minimizer[0]
            const terserOptions = terserWebpackPlugin.options.terserOptions

            terserOptions.output.comments = false
            terserOptions.compress.drop_console = true
            terserOptions.compress.drop_debugger = true
        }
        config.performance = {
            hints: false,
            maxAssetSize: 512000,
            maxEntrypointSize: 512000
        }
        config.devtool = 'source-map'
    },
    productionSourceMap: (() => process.env.CONFIG_productionSourceMap.maybeBool())(),
    transpileDependencies: [ 'strip-ansi', 'ansi-regex' ]
}
