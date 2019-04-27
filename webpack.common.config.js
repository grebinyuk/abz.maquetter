const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const {VueLoaderPlugin} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
      index: ['./src/js/index.js','./src/sass/style.sass']
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: './js/[name].bandle.js',
      chunkFilename: './js/[name].bandle.js'
    },

    resolve: {
     alias: {
       'vue$': 'vue/dist/vue.esm.js'
     },
      modules: [
        'node_modules',
        path.resolve(__dirname, 'src/libs'),
        path.resolve(__dirname, 'src/fonts')
      ],

      extensions: [ '.js', '.css', '.sass', '.vue', '.scss', '.woff',  '.woff2', '.ttf', '.eot', '.png', '.svg']
    },

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks:'all'
          }
        }
      }
    },

    module: {
      rules: [

        {
          test: /\.vue$/,
          use: {
            loader: 'vue-loader'
          }
        },

        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use:
                {
                  loader: 'babel-loader',
                  options: {
                              presets: ['@babel/preset-env']
                            }
                }
        },

        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          exclude: /(img)/,
          use: [{
                  loader: 'file-loader',
                  options: {
                              name: '[name].[ext]',
                              outputPath: './fonts/'
                            }
               }]
        },



        {
          test: /\.svg$/,
          exclude: /(node_modules)/,

          use: [{
            loader: 'svg-url-loader'
          }]
        },

        {
          test: /\.(png|gif|jpg|jpeg)$/,
          use: [{
                  loader: 'file-loader',
                  options: {
                              name: '[name].[ext]',
                              outputPath: './img/'

                            }
               }],
        }
      ]
    },

    plugins: [

       new VueLoaderPlugin(),

      new HtmlWebpackPlugin({
          filename: 'index.html',
          title: 'abz.maquetter',
          template: './src/index.html',
          inject: true,
          sourceMap: true,
          minify: {
            removeComments: true,
            collapseWhitespace: true
          }
      })
    ]
}
