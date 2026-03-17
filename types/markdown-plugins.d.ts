declare module 'rehype-katex' {
  import { Plugin } from 'unified'
  const rehypeKatex: Plugin
  export default rehypeKatex
}

declare module 'rehype-raw' {
  import { Plugin } from 'unified'
  const rehypeRaw: Plugin
  export default rehypeRaw
}

declare module 'remark-parse' {
  import { Plugin } from 'unified'
  const remarkParse: Plugin
  export default remarkParse
}

declare module 'rehype-stringify' {
  import { Plugin } from 'unified'
  const rehypeStringify: Plugin
  export default rehypeStringify
}

declare module 'rehype-prism-plus' {
  import { Plugin } from 'unified'
  const rehypePrism: Plugin
  export default rehypePrism
}

declare module 'remark-breaks' {
  import { Plugin } from 'unified'
  const remarkBreaks: Plugin
  export default remarkBreaks
}

declare module 'remark-rehype' {
  import { Plugin } from 'unified'
  const remark2rehype: Plugin
  export default remark2rehype
}

declare module 'gray-matter' {
  interface GrayMatterFile<I> {
    data: { [key: string]: any }
    content: string
    excerpt?: string
    orig: Buffer | string
    language: string
    matter: string
    stringify(lang: string): string
  }

  interface GrayMatterOption<I, O> {
    excerpt?: boolean | ((input: I, options: GrayMatterOption<I, O>) => string)
    excerpt_separator?: string
    engines?: { [index: string]: (input: string) => object }
    language?: string
    delimiters?: string | [string, string]
  }

  function matter<I, O>(
    input: I,
    options?: GrayMatterOption<I, O>
  ): GrayMatterFile<I>

  export = matter
}
