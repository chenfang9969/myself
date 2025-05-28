module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { 
      runtime: 'automatic',  // 关键配置
      importSource: '@emotion/react' // 如果使用 emotion
    }],
    '@babel/preset-typescript'
  ]
}