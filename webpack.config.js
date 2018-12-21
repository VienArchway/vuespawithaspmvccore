const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

const babelLoaderOptions = {
    presets: [
        ["@babel/preset-env", {
            "targets": { "ie": 11 },
            "useBuiltIns": false
        }]
    ]
};

const viewEntiries = glob.sync(path.join(__dirname, "./ClientApp/components/**/index.js")).reduce((p, c) => {
    let key = c.substr(path.join(__dirname, "./ClientApp/components/").length);
    key = key.substr(0, key.length - "/index.js".length);
    p[key] = c;
    return p;
}, {});

const viewStyleEntiries = glob.sync(path.join(__dirname, "./ClientApp/components/**/index.scss")).reduce((p, c) => {
    let key = c.substr(path.join(__dirname, "./ClientApp/components/").length);
    key = key.substr(0, key.length - "/index.scss".length);
    p[key] = c;
    return p;
}, {});

module.exports = (_, argv) => {

    const devMode = argv.mode !== "production";

    const site = {
        entry: "./ClientApp/main.js",
        output: {
            path: `${__dirname}/wwwroot/js`,
            filename: "site.js"
        },
        resolve: {
            alias: {
                vue: devMode ? "vue/dist/vue.js" : "vue/dist/vue.min.js"
            }
        },
        module: {
            rules: [
                {
                    enforce: "pre",
                    test: /\.(js)|(vue)$/,
                    exclude: /node_modules/,
                    loader: "eslint-loader"
                }, {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: babelLoaderOptions
                    }
                }
            ]
        }
    };

    const view = !Object.keys(viewEntiries).length ? null : {
        entry: viewEntiries,
        output: {
            path: `${__dirname}/wwwroot/view`,
            filename: "[name]/index.js"
        },
        module: {
            rules: [
                {
                    enforce: "pre",
                    test: /\.(js)|(vue)$/,
                    exclude: /node_modules/,
                    loader: "eslint-loader"
                }, {
                    test: /\.scss$/,
                    use: [
                        "vue-style-loader",
                        "css-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                    options: {
                        loaders: {
                            "scss": [
                                "vue-style-loader",
                                "css-loader",
                                "sass-loader"
                            ]
                        }
                    }
                }, {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: babelLoaderOptions
                    }
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin()
        ],
    };

    const libStyle = {
        entry: "./ClientApp/css/index.scss",
        output: {
            path: path.join(__dirname, "./wwwroot/css")
        },
        plugins: [
            new FixStyleOnlyEntriesPlugin(),
            new MiniCssExtractPlugin({
                filename: "site.css"
            })
        ],
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ],
                }
            ]
        }
    };

    const viewStyle = !Object.keys(viewStyleEntiries).length ? null : {
        entry: viewStyleEntiries,
        output: {
            path: path.join(__dirname, "./wwwroot/css/view")
        },
        plugins: [
            new FixStyleOnlyEntriesPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name]/index.css"
            })
        ],
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ],
                }
            ]
        }
    };

    if (!devMode) {
        (libStyle || {}).optimization = styleOptimization;
        (viewStyle || {}).optimization = styleOptimization;
    }

    return [site, view, libStyle, viewStyle].filter(t => !!t);
    // return [site, view].filter(t => !!t);
};
