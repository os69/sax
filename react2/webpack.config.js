const path = require("path");

module.exports = {
    entry: {
        '01' : './src/01_jsx_and_react_elements/main.js',
        '02': './src/02_react_components/main.js',
        '03': './src/03_raw_redux/main.js',
        '04': './src/04_redux/main.js',
        '05': './src/04_redux_opt/main.js',
        'app2': './src/app2/main.js'
    },
    mode: "development",
    output: {
        filename: "[id].js"
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        watchContentBase: true,
        progress: true
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ]
    }
};