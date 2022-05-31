import PostListLayout from '@/layouts/PostListLayout'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PostFrontMatter } from 'types/PostFrontMatter'

export const getStaticProps: GetStaticProps<{ dispalyPosts: PostFrontMatter[] }> = async () => {
  const posts = await getAllFilesFrontMatter()
  return {
    props: {
      dispalyPosts: posts.slice(0, 5),
    }
  }
}

const Home = ({ dispalyPosts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <PostListLayout 
        posts={dispalyPosts}
        pageTitle='最新文章'
        pageDesc='记录，分享，提升'
      />
    </>
  )
}

export default Home
