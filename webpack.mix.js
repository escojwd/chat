let mix = require("laravel-mix");

mix.js("src/regist.js", "dist/assets").js("src/login.js", "dist/assets");

mix.webpackConfig({
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
    },
  },
});
