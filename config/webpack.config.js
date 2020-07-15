const paths = require('./paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const firstToUpperCase = str=>{
  return str.toLowerCase().split('-').map(item=>item.replace(/( |^)[a-z]/g, L => L.toUpperCase())).join('');
}

const transformExternals = str => ({
  root: firstToUpperCase(str),
  commonjs2: str,
  commonjs: str,
  amd: str,
  umd: str
})
module.exports = function(webpackEnv){
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  let entry = isEnvDevelopment? [paths.appIndexDev] : [paths.appIndex];
  return {
    mode:isEnvDevelopment?'development':'production',
    entry:entry,
    output:{
      path:paths.appLib,
      filename:'index.js',
      libraryTarget:'umd',
      library:'reactRegionPicker',
    },
    module:{
      rules:[
        {
          test: /\.jsx?$/,
          loader: 'babel-loader'
        },
        {
          test: /\.(le|c)ss$/,
          use: [
              isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
              'css-loader', 'postcss-loader', 'less-loader'
            ].filter(Boolean)
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    externals: isEnvProduction ? { // 定义外部依赖，避免把react和react-dom打包进去
      react: transformExternals('react'),
      "prop-types": transformExternals('prop-types'),
      "rc-toaster":transformExternals('rc-toaster')
    }:{},
    plugins:[
      new CleanWebpackPlugin({verbose: true}),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/city.json',
            to: '',
            flatten:true
          },
        ],
      }),
      isEnvProduction &&
        new MiniCssExtractPlugin({
          filename: 'style.css',
        }),
      // isEnvProduction && ,
      isEnvDevelopment && new HtmlWebpackPlugin({
        filename: 'index.html',
        template: paths.appHtml,
        favicon: paths.appDemoDev+'/favicon.ico'
      }),
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(), //开启HRM
      
    ].filter(Boolean),
    devServer: {
      publicPath: '/',
      host: '0.0.0.0',
      disableHostCheck: true,
      compress: true,
      port: 9001,
      historyApiFallback: true,
      open: true,
      hot:true,
    }
  }
}