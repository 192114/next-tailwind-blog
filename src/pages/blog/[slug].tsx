import PageTitle from "@/components/PageTitle"
import { formatSlug, getAllFiles, getAllFilesFrontMatter, getFileBySlug } from "@/lib/mdx"
import MDXLayout from "@/components/MdxLayout"

export const getStaticPaths = async () => {
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

interface StaticPropsType {
  params: {
    slug: string
  }
}

export const getStaticProps = async ({ params }: StaticPropsType) => {
  const { slug } = params
  
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
}) => {
  const { mdxSource, toc, frontMatter } = post

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
            Under Construction{' '}
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