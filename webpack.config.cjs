const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const examplesDir = path.join(__dirname, "examples");
const targetPath = path.join(__dirname, "examples_build");

module.exports = {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    entry: {
        index: path.join(examplesDir, "index.js"),
    },
    output: {
        filename: "[name]-bundle.js",
        path: targetPath,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new HtmlWebpackPlugin({
            title: "Paino Examples",
            filename: "index.html",
            template: "examples/index.html",
        }),
    ],
    devServer: {
        static: {
            directory: examplesDir,
        },
        compress: true,
        port: 9000,
    },
};
