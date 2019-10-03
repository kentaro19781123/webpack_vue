const path = require('path')
const globule = require('globule')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const rootPath = path.resolve(__dirname, '../')
const targetTypes = { pug : 'html'}

const entriesList = {};
const getEntriesList = () => {
  for(const [ srcType, targetType ] of Object.entries(targetTypes)) {
    const filesMatched = globule.find([`**/*.${srcType}`, `!**/_*.${srcType}`], { cwd : `${rootPath}/src` });

    for(const srcName of filesMatched) {
      const targetPathName = srcName.replace(new RegExp(`.${srcType}$`, 'i'), `.${targetType}`);
      const targetName = targetPathName.replace('page/', '');
      entriesList[targetName] = `${rootPath}/src/${srcName}`;
    }
  }
  return entriesList;
}

const config = {
  entry: {
    script: './src/js/script.js',
    main: './src/css/style.css'
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          configFile: './config/.eslintrc'
        }
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: './config/.babelrc'
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              configFile: './config/.eslintrc'
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
          options: {
            pretty: true
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './config/'
              }
            }
          }
          // 'postcss-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                js: 'babel-loader'
              },
              options: {
                configFile: './config/.babelrc'
              }
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              configFile: './config/.eslintrc'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    port: 3010,
    contentBase: './dist'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{
      from: './src/img',
      to: 'img'
    }]),
    // new HtmlWebPackPlugin({
    //   template: './src/page/index.pug',
    //   filename: './index.html'
    // }),
    // new HtmlWebPackPlugin({
    //   template: './src/page/content/index.pug',
    //   filename: './content/index.html'
    // }),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: './css/[name].css'
    }),
    new VueLoaderPlugin()
  ],
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  }
}

for(const [ targetName, srcName ] of Object.entries(getEntriesList())) {
  config.plugins.push(new HtmlWebPackPlugin({
    filename : targetName,
    template : srcName
  }));
}

module.exports = config
