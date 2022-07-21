import path from 'path'

export default {
    root:'./',
    base:'./',
    css: {
        // css预处理器
        preprocessorOptions: {
            less: {
                charset: false,
                additionalData: '@import "./src/assets/style/global.less";',
            },
        },

    },
    resolve: {
        //设置别名
        alias: {
            '~': path.resolve(__dirname, './'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    build:{
        rollupOptions: {
            output: {
                chunkFileNames: 'static/js/[name]-[hash].js',
                entryFileNames: 'static/js/[name]-[hash].js',
                assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
            }
    }
    }

}