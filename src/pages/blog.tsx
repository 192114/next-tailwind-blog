// 默认访问 /blog 时 显示列表第一页
import type { PaginationProps } from '@/components/Pagination'
import PostListLayout from '@/layouts/PostListLayout'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PostFrontMatter } from 'types/PostFrontMatter'

const PAGE_SIZE = 5

export const getStaticProps: GetStaticProps<{ displayPost: PostFrontMatter[], pagination: PaginationProps }> = async () => {
  const posts = await getAllFilesFrontMatter()

  const displayPost = posts.slice(0, 5)

  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / PAGE_SIZE)
  }

  return {
    props: {
      displayPost,
      pagination,
    },
  }
}

// 博客列表 带分页
const BlogList = ({ displayPost, pagination }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <PostListLayout 
        posts={displayPost}
        pagination={pagination}
        pageTitle="全部文章"
      />
    </>
  )
}

export default BlogList
