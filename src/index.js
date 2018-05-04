import { minifyAst } from 'vue-svg-component-builder/lib/utils'
import { compile } from 'vue-template-compiler'
import { createFilter } from 'rollup-pluginutils'

export default function(opts = {}) {
  let include = opts.include || /\.svg$/
  const svgFilter = createFilter(include, opts.exclude)

  return {
    name: 'vue-svg-components',
    transform(code, id) {
      if (!svgFilter(id)) return;

      const compiledSvg = compile(code)
      if (compiledSvg.ast === undefined) {
        let errorMsg = 'Unknown Error'

        if(compiledSvg.errors.length > 0) {
          errorMsg = compiledSvg.errors.join(', ')
        }

        throw new Error(`There were one or more problems building the AST for the requested SVG: ${errorMsg}`)
      }

      const ast = minifyAst(compiledSvg.ast)

      return `
        var builder = require('vue-svg-component-builder')
        export default builder.build(${JSON.stringify(ast, null, 2)})
      `
    }
  }
}