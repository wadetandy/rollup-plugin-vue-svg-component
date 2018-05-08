import { buildEsmComponent } from 'vue-svg-component-builder'
import { createFilter } from 'rollup-pluginutils'

export default function(opts = {}) {
  let include = opts.include || /\.svg$/
  const svgFilter = createFilter(include, opts.exclude)

  return {
    name: 'vue-svg-components',
    transform(code, id) {
      if (!svgFilter(id)) return;

      return buildEsmComponent(code)
    }
  }
}