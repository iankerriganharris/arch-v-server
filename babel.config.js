module.exports = function (api) {
  const presets = [
    ['@babel/preset-env', {
      targets: {
        node: 'current'
      }
    }]
  ];
  const plugins = [
    '@babel/plugin-proposal-class-properties',
  ];
  api.cache(true);

  return {
    presets,
    plugins
  };
}