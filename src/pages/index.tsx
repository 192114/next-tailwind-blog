import PageTitle from '@/components/PageTitle'
import PostItem from '@/components/PostItem'
import type { NextPage } from 'next'

const Home: NextPage = () => {
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
          <li className="py-10">
            {/* <PostItem /> */}
          </li>
        </ul>
        
      </div>
    </>
  )
}

export default Home
