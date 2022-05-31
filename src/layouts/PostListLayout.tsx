import PageTitle from "@/components/PageTitle"
import PostItem from "@/components/PostItem"
import Pagination, { PaginationProps } from "@/components/Pagination"

import { PostFrontMatter } from 'types/PostFrontMatter'

interface PostListLayoutProps {
  pageTitle: string
  pageDesc?: string
  posts: PostFrontMatter[]
  pagination?: PaginationProps
}

const PostListLayout = ({
  pageTitle,
  pageDesc,
  posts,
  pagination,
}: PostListLayoutProps) => {

  return (
  <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-6 md:space-y-5">
          <PageTitle>
            {pageTitle}
          </PageTitle>
          {
            pageDesc && (
              <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                {pageDesc}
              </p>
            )
          }
          
        </div>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {
            posts.slice(0, 5).map((fontMatter) => {
              return (
                <li className="py-10" key={fontMatter.slug}>
                  <PostItem {...fontMatter} />
                </li>
              )
            })
          }
        </ul>
        
        {
          pagination && pagination.totalPages > 1 && (
            <Pagination {...pagination} />
          )
        }
      </div>
  )
}

export default PostListLayout