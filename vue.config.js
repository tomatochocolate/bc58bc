module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://jcb.jichibang2019.com/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },

        }
    }
}