module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-mixins')(),
    require('postcss-apply')(),
    require('postcss-custom-properties')(),
    require('postcss-size')(),
    require('postcss-nested')(),
    require('postcss-simple-vars')(),
    require('autoprefixer')(),
    require('postcss-clearfix')(),
    require('postcss-color-function')(),
    require('postcss-calc')(),
    require('postcss-custom-media')(),
    require('css-mqpacker')(),
    require('csswring')(),
    require('postcss-assets')(),
    require('postcss-conditionals')()
  ]
}
