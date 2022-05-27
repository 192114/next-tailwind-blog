import type { Root } from 'mdast'
import type { VFile } from 'vfile'
import { visit } from 'unist-util-visit'
import { load } from 'js-yaml'

export default function extractFrontmatter() {
  return (tree: Root, file: VFile) => {
    visit(tree, 'yaml', (node, index, parent) => {
      file.data.frontmatter = load(node.value)
    })
  }
}
