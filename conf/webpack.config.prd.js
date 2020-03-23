const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');
const dist = path.resolve(__dirname, '../dist');

module.exports = {
    // Path to your entry point. From this file Webpack will begin his work
    entry: './src/index.js',

    output: {
        path: dist,
        filename: 'bundle.js'
    },

    plugins: [new CleanWebpackPlugin()],

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },

            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            },

            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('postcss-import'),
                                require('tailwindcss')('./tailwind.config.js'),
                                require('autoprefixer'),
                                require('@fullhuman/postcss-purgecss')({
                                    content: ['./**/*.html']
                                })
                            ]
                        }
                    }
                ]
            },

            {
                // Now we apply rule for images
                test: /\.html$/i,
                use: [
                    {
                        // Using file-loader for these files
                        loader: 'file-loader',
                        options: {
                            outputPath: './',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                // Now we apply rule for images
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        // Using file-loader for these files
                        loader: 'file-loader',

                        // In options we can set different things like format
                        // and directory to save
                        options: {
                            outputPath: './images/',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './fonts/'
                        }
                    }
                ]
            }
        ]
    },

    mode: 'production'
};
