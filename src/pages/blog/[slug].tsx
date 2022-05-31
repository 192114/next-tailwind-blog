import PageTitle from "@/components/PageTitle"
import { formatSlug, getAllFiles, getAllFilesFrontMatter, getFileBySlug } from "@/lib/mdx"
import MDXLayout from "@/layouts/MdxLayout"
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { Toc } from "types/Toc"
import { PostFrontMatter } from "types/PostFrontMatter"
import { ParsedUrlQuery } from "querystring"

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllFiles()

  return {
    paths: posts.map(path => ({
      params: {
        slug: formatSlug(path)
      }
    })),
    fallback: false,
  }
}

interface StaticParamProps extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps<{
  post: { mdxSource: string; frontMatter: PostFrontMatter, toc: Toc }
  prev?: { slug: string; title: string }
  next?: { slug: string; title: string }
}> = async (context) => {
  const { slug } = context.params as StaticParamProps
  
  const allPosts = await getAllFilesFrontMatter()

  const currentPostIndex = allPosts.findIndex(post => formatSlug(post.slug) === slug)

  const prev = allPosts[currentPostIndex - 1] || null
  const next = allPosts[currentPostIndex + 1] || null

  const post = await getFileBySlug(slug)

  return {
    props: {
      post,
      prev,
      next,
    }
  }
}

const Article = ({
  post,
  prev,
  next
}:InferGetStaticPropsType<typeof getStaticProps>) => {
  const { mdxSource, frontMatter, toc } = post

  return (
    <>
      {'draft' in frontMatter && frontMatter.draft !== true ? (
        <MDXLayout
          toc={toc}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          prev={prev}
          next={next}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            可能正在写呢吧{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}

export default Article