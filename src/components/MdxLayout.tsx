import { ComponentMap, getMDXComponent } from 'mdx-bundler/client'
import { FC, useMemo } from 'react'
import Container from '@/components/Container'
import formatDate from '@/lib/formatDate'
import { PostFrontMatter } from 'types/PostFrontMatter'
import PageTitle from './PageTitle'
import Link from 'next/link'
import Tag from '@/components/Tag'

interface WrapperProps {
  frontMatter: PostFrontMatter
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
}

const Wrapper: FC<WrapperProps> = ({ frontMatter, next, prev, children }) => {
  const { date, title, tags } = frontMatter
  return (
    <Container>
      <article>
        {/* 文章标题 */}
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <div className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                <time dateTime={date}>{formatDate(date)}</time>
              </div>

              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>

          {/* 中间文章显示区域 */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
            <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">{children}</div>

            {/* pc端显示在页面左侧 手机端显示在底部 */}
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      标签
                    </h2>
                    <div className="mt-3 flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}

                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          上一篇 文章
                        </h2>
                        <div className="mt-3 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          下一篇 文章
                        </h2>
                        <div className="mt-3 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-4 xl:pt-8">
                <Link href="/">
                  <a className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                    &larr; 返回博客列表
                  </a>
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </Container>
  )
}

export const MDXComponents: ComponentMap = {
  // Image,
  // TOCInline,
  // a: CustomLink,
  // pre: Pre,
  wrapper: Wrapper,
  // BlogNewsletterForm,
}

interface Props {
  mdxSource: string
  [key: string]: unknown
}

const MdxLayout = ({ mdxSource, ...rest }: Props) => {
  const MdxComponent = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MdxComponent components={MDXComponents} {...rest} />
}

export default MdxLayout
