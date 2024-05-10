const path =require('path')
const HTMLWEBPACK =require('html-webpack-plugin')

module.exports=   {
 
    devtool:'source-map',
    mode: 'development',
    entry :{
        index:'/src/index.js',
    },
    performance:{
        hints:false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    output:{
        path:path.resolve('./dist'),
        filename:'bundle.js',
        publicPath: '/',
        
    },
    resolve: {
        extensions: ['.jsx', '.js',  ],
      },
      devServer: {
        port:'3000',
        host:'localhost',
        historyApiFallback:true,
  },
module:{
    rules:[
        {
            test:/\.(jsx|js)$/,
            exclude:/node_modules/,
            use:{
                loader:"babel-loader"
            }
        }
    ]
},
plugins:[
    new HTMLWEBPACK({
        template:path.resolve("./public/index.html"),
        filename:"./index.html"
    })
]
}