const dev = process.env.NODE_ENV === 'development';
const config = {
  "presets": [
      [
          "@babel/preset-env",
          {
              "modules": false
          }
      ],
      "@babel/preset-react"
  ],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
if(dev){
    config.plugins.unshift("react-hot-loader/babel")
}

module.exports = config;