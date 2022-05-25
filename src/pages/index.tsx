import PageTitle from '@/components/PageTitle'
import PostItem from '@/components/PostItem'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PostFrontMatter } from 'types/PostFrontMatter'

export const getStaticProps: GetStaticProps<{ posts: PostFrontMatter[] }> = async () => {
  const posts = await getAllFilesFrontMatter()
  return {
    props: {
      posts,
    }
  }
}

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-6 md:space-y-5">
          <PageTitle>
            最新文章
          </PageTitle>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            记录，分享，提升
          </p>
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
        
      </div>
    </>
  )
}

export default Home
