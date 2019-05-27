var $ = require('jquery');
var webpack = require('webpack');
var path = require('path');
module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        colors: true,
        files: [
            'karma.entry.js',
            { pattern: './node_modules/jquery/dist/jquery.min.js', watched: false }
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            'karma.entry.js': ['webpack', 'sourcemap']
        },
        singleRun: false,
        webpack: {
            devtool: 'inline-source-map',
            module: {
                rules: [
                    {
						exclude: [path.resolve(__dirname, 'node_modules')],
                        include: [
                            path.resolve(__dirname, 'src'),
                            path.resolve(__dirname, 'tests')
                        ],
                        loader: 'ts-loader',
                        test: /\.ts$/,
                        options: {
                            compilerOptions: {
                                noEmitHelpers: false
                            }
                        }
                    }
                ]
            },
            resolve: {
                extensions: ['.ts', '.tsx', '.json', '.js'],
                modules: [
                    'node_modules'
                ]
            }
        },
        webpackServer: {
            noInfo: true,
            noLog: true
        }
    });
};
