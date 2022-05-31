import type { PaginationProps } from '@/components/Pagination'
import PostListLayout from '@/layouts/PostListLayout'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { PostFrontMatter } from 'types/PostFrontMatter'

const PAGE_SIZE = 5

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllFilesFrontMatter()
  const totalPages = Math.ceil(allPosts.length / PAGE_SIZE)

  // Array.from 可以接收一个类数组  { length: totalPages } 模拟类数组传递
  const paths = Array.from({ length: totalPages }, (_, i) => {
    return {
      params: {
        page: `${i + 1}`,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

interface StaticParamProps extends ParsedUrlQuery {
  page: string
}

export const getStaticProps: GetStaticProps<{ displayPost: PostFrontMatter[], pagination: PaginationProps }> = async (context) => {
  const {
    page
  } = context.params as StaticParamProps

  const posts = await getAllFilesFrontMatter()

  const pageNumber = parseInt(page)

  const displayPost = posts.slice(PAGE_SIZE * (pageNumber - 1), PAGE_SIZE * pageNumber)

  const pagination = {
    currentPage: pageNumber,
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
