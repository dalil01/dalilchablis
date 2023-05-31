const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const mode = process.env.NODE_ENV;
const dev = mode === "development";

const webpackConfig = {
    mode: mode,
    target: "web",
    entry: path.resolve(__dirname, "./src/main.ts"),
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "index" + (dev ? '' : ".[chunkhash:12]") + ".js",
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    devServer: {
        port: 1200,
        liveReload: true
    },
    devtool: dev ? "eval-cheap-module-source-map" : "source-map",
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    minimize: true
                }
            },
            {
                test: /\.tsx?$/,
                use: ["ts-loader"]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            // TODO
            {
                test: /\.(png|jpe?g|gif|woff2|woff|eot|ttf|svg)$/i,
                loader: "file-loader",
                type: "asset/resource",
                options: {
                    name: "[contenthash].[ext]",
                },
                dependency: { not: ['url'] },

            }
            /*,
            {
                test: /\.(ico|ttf|eot|woff|woff2)(\?.*)?$/,
                loader: "file-loader",
                options: {
                    name: "assets/images/[hash:12].[ext]",
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name].[hash:12].[ext]",
                            limit: 8192
                        }
                    },
                    {
                        loader: "img-loader",
                        options: {
                            enabled: !dev
                        }
                    }
                ]
            }*/,
            {
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html"),
            filename: "index.html",
            minify: !dev
        }),
        new MiniCssExtractPlugin({
            filename: "styles" + (dev ? '' : ".[contenthash:12]") + ".css",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "./src/assets"),
                    to: "./assets",
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, "./libs"),
                    to: "./libs",
                    noErrorOnMissing: true
                }
            ]
        })
    ],
    optimization: {
        minimize: !dev
    }
};

if (!dev) {
    webpackConfig.plugins.filter(plugin => plugin instanceof CopyWebpackPlugin)[0]?.patterns.push({
        from: path.resolve(__dirname, "./src/.htaccess"),
        to: "./",
        noErrorOnMissing: true
    });

    webpackConfig.plugins.push(new CleanWebpackPlugin({
        verbose: true
    }));
}

module.exports = webpackConfig;

