import fs from 'fs'
import path from 'path'
import matter from 'gray-matter' // 解析文章头部信息
import { bundleMDX } from 'mdx-bundler'

// Remark packages
import remarkGfm from 'remark-gfm'
import remarkFootnotes from 'remark-footnotes'
import remarkMath from 'remark-math'
// import remarkExtractFrontmatter from './remark-extract-frontmatter'
// import remarkCodeTitles from './remark-code-title'
// import remarkTocHeadings from './remark-toc-headings'
// import remarkImgToJsx from './remark-img-to-jsx'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'

import { PostFrontMatter } from 'types/PostFrontMatter'
import { Toc } from 'types/Toc'

const root = process.cwd()
const blogDirectory = path.join(root, 'data/blogs')

export const formatSlug = (slug: string) => {
  return slug.replace(/\.(mdx|md)/, '')
}

export const dateSortDesc = (a: string, b: string) => {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

// 获取所有文件
export const getAllFiles = () => {
  // 默认为1级目录
  const allFiles = fs.readdirSync(blogDirectory)

  return allFiles
}

// 根据slug获取文章详情
export const getFileBySlug = async (slug: string) => {
  // 兼容md与mdx文件格式
  const mdPath = path.join(blogDirectory, `${slug}.md`)
  const mdxPath = path.join(blogDirectory, `${slug}.mdx`)

  const source = fs.existsSync(mdxPath) ? fs.readFileSync(mdxPath, 'utf-8') : fs.readFileSync(mdPath, 'utf-8')

  const { code, frontmatter } = await bundleMDX({
    source,
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        // remarkExtractFrontmatter,
        // [remarkTocHeadings, { exportRef: toc }],
        remarkGfm,
        // remarkCodeTitles,
        [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
        // remarkImgToJsx,
      ]

      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
        [rehypeCitation, { path: path.join(root, 'data') }],
        [rehypePrismPlus, { ignoreMissing: true }],
        rehypePresetMinify,
      ]

      return options
    }
  })

  return {
    mdxSource: code,
    cwd: path.join(root, 'src/components'),
    // toc,
    frontMatter: {
      slug: slug || null,
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...frontmatter,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
    }
  }
}

// 时间倒序 获取文章列表 （matter）
export const getAllFilesFrontMatter = async () => {
  const files = getAllFiles()

  const allFrontMatter: PostFrontMatter[] = []
  
  files.forEach((fileName: string) => {
    if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
      return
    }

    const file = path.join(blogDirectory, fileName)
    const source = fs.readFileSync(file, 'utf8')
    const matterFile = matter(source)
    const frontmatter = matterFile.data as PostFrontMatter

    if ('draft' in frontmatter && frontmatter.draft !== true) {
      allFrontMatter.push({
        ...frontmatter,
        slug: formatSlug(fileName),
        date: frontmatter.date ? new Date(frontmatter.date).toISOString() : '',
      })
    }
  })

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}