import PostListLayout from "@/layouts/PostListLayout"
import getAllTags from "@/lib/getAllTags"
import kebabCase from "@/lib/kebabCase"
import { getAllFilesFrontMatter } from "@/lib/mdx"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { ParsedUrlQuery } from "querystring"
import { PostFrontMatter } from "types/PostFrontMatter"


export const getStaticPaths: GetStaticPaths = () => {
  const allTagsObj = getAllTags()

  const paths = Object.keys(allTagsObj).map((tag) => ({
    params: {
      tag,
    }
  }))

  return {
    paths,
    fallback: false,
  }
}

interface StaticParamProps extends ParsedUrlQuery {
  tag: string
}

export const getStaticProps: GetStaticProps<{
  displayPosts: PostFrontMatter[]
  tag: string
}, StaticParamProps> = async (context) => {
  const allPost = await getAllFilesFrontMatter()
  const { tag : curTag } = context.params as StaticParamProps

  const postFilter = allPost.filter((post) => post.draft !== true && post.tags.map(tag => kebabCase(tag)).includes(curTag))

  return {
    props: {
      displayPosts: postFilter,
      tag: curTag,
    }
  }
}


const Tags = ({ displayPosts, tag }: InferGetStaticPropsType<GetStaticProps>) => {
  return (
    <>
      <PostListLayout 
        pageTitle={tag}
        posts={displayPosts}
      />
    </>
  )
}

export default Tags