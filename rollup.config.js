import externals from '@yelo/rollup-node-external'

export default {
  input: 'src/index.js',
  external: externals(),
  output: {
    file: 'lib/index.js',
    format: 'cjs',
  }
}