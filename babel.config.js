module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    // other plugins
    ['@babel/plugin-proposal-private-methods', { loose: true }]
  ]
}
