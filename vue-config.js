module.export = {
    devServer: {
        port: 81,  // 如果端口号被占用，会自动提升1
        host: "localhost", // 主机名，真机0.0.0.0
        https: false,  // 协议
        open: false, // 启动服务器时自动打开浏览器
    },
    lintOnSave: false,  // 关闭格式检查
    productionSourceMap: false, // 打包时不自动生成.map文件，加快打包速度
}