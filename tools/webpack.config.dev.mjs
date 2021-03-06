import autoprefixer from 'autoprefixer';
import HTMLPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { InterpolateHTMLPlugin, pathTo } from './utils.mjs';

const config = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    pathTo('src', 'index.js')
  ],
  context: process.cwd(),
  output: {
    path: pathTo('build'),
    filename: 'js/bundle.js',
    chunkFilename: 'js/[name].chunk.js',
    publicPath: '/',
  },
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [{
      exclude: [
        /\.html$/,
        /\.js$/,
        /\.css$/,
        /\.json$/,
        /\.bmp$/,
        /\.gif$/,
        /\.jpe?g$/,
        /\.png$/,
      ],
      loader: 'file-loader',
      options: {
        name: 'media/[name].[hash:8].[ext]',
      },
    },{
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'media/[name].[hash:8].[ext]',
      },
    },{
      test: /\.js$/,
      exclude: [ /node_modules/ ],
      include: [ pathTo('src') ],
      use: {
        loader: 'babel-loader',
        options: {
          plugins: [],
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ],
        },
      },
    }, {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader', 
          options: { 
            localIdentName: '[local]-[path]-[hash:base64:5]',
            modules: true, 
            importLoaders: 1 }},
        { loader: 'postcss-loader', 
          options: { 
            ident: 'postcss',
            plugins: () => [
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9',
                ],
                flexbox: 'no-2009',
              }),
            ],
          }
        },
      ],
    }],
  },
  resolve: {
    modules: [
      'node_modules',
      pathTo('src'),
    ],
    alias: {
      'components': pathTo('src', 'components'),
      'screens':    pathTo('src', 'screens'),
    },
  },
  target: 'web',
  plugins: [
    new HTMLPlugin({ 
      inject: true,
      template: pathTo('public', 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new InterpolateHTMLPlugin({PUBLIC_URL: ''}),
  ],
};

export default config;
