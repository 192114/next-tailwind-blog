// 默认访问 /blog 时 显示列表第一页
import PageTitle from '@/components/PageTitle'
import Pagination, { PaginationProps } from '@/components/Pagination'
import PostItem from '@/components/PostItem'
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
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-6 md:space-y-5">
        <PageTitle>文章列表</PageTitle>
      </div>

      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {displayPost.slice(0, 5).map((fontMatter) => {
          return (
            <li className="py-10" key={fontMatter.slug}>
              <PostItem {...fontMatter} />
            </li>
          )
        })}
      </ul>

      <Pagination {...pagination} />
    </div>
  )
}

export default BlogList
