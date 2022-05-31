// 获取所有标签
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getAllFiles } from '@/lib/mdx'
import kebabCase from '@/lib/kebabCase'

interface TagsType {
  [key: string]: number
}


const root = process.cwd()

const getAllTags = () => {
  const allFiles = getAllFiles()

  const allTags: TagsType = {}

  allFiles.forEach((file) => {
    const source = fs.readFileSync(path.join(root, 'data', file), 'utf8')

    const { data } = matter(source)

    if (data.tags && data.draft !== true) {
      data.tags.forEach((tag: string) => {
        const formattedTag = kebabCase(tag)

        if (formattedTag in allTags) {
          allTags[formattedTag] += 1
        } else {
          allTags[formattedTag] = 1
        }
      })
    }
  })

  return allTags
}

export default getAllTags