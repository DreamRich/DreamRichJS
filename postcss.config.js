module.exports = {
  plugins: {
    'postcss-import': {
      root: __dirname,
    },
    'postcss-mixins': {},
    'postcss-each': {},
    'postcss-cssnext': {
      features: {
          customProperties: {
            variables: require('./src/stylesheet/toolbox/globalProperties'),
          },
        },
    }
  },
};
