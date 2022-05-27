// 将markdown 中标题拼上 # 锚点连接滚动页面
import type { Root } from 'mdast'
import { visit } from 'unist-util-visit'
import GithubSlugger  from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import { Toc } from 'types/Toc'

const slugger = new GithubSlugger()

interface OptionsType {
  exportRef: Toc
}

const remarkTocHeadings = (options: OptionsType) => {
  // 热更新可能会导致 slug-number 的情况
  slugger.reset()
  return (tree: Root) => visit(tree, 'heading', (node) => {
    const textContent = toString(node)
    options.exportRef.push({
      value: textContent,
      url: `#${slugger.slug(textContent)}`,
      depth: node.depth,
    })
  })
}


export default remarkTocHeadings
