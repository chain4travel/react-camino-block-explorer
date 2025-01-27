const HtmlWebPackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const path = require('path')
const deps = require('./package.json').devDependencies
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const packageJson = require('./package.json')
const childProcess = require('child_process')
let GIT_COMMIT_HASH

try {
    GIT_COMMIT_HASH = childProcess.execSync('git rev-parse --short HEAD').toString().trim()
} catch (e) {
    GIT_COMMIT_HASH = 'N/A'
}
module.exports = {
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
        alias: {
            root: path.resolve(__dirname, 'src'),
            app: path.resolve(__dirname, 'src/app'),
            store: path.resolve(__dirname, 'src/store'),
            api: path.resolve(__dirname, 'src/api'),
            types: path.resolve(__dirname, 'src/types'),
            utils: path.resolve(__dirname, 'src/utils'),
            styles: path.resolve(__dirname, 'src/styles'),
        },
    },
    module: {
        rules: [
            {
                test: /\.m?js/,
                type: 'javascript/auto',
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(css|s[ac]ss)$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack', 'url-loader'],
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
        ],
    },

    plugins: [
        new Dotenv(),
        new webpack.DefinePlugin({
            'process.env.GIT_COMMIT_HASH': JSON.stringify(GIT_COMMIT_HASH),
            'process.env.VERSION': JSON.stringify(packageJson.version),
        }),
        new ModuleFederationPlugin({
            name: 'Explorer',
            filename: 'remoteEntry.js',
            remotes: {},
            exposes: {
                './Explorer': './src/App.tsx',
                './useStore': './src/store/shareStore/index.tsx',
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: deps['react-dom'],
                },
            },
        }),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            favicon: './public/favicon.ico',
        }),
    ],
}
