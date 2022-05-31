import { ComponentMap, getMDXComponent } from 'mdx-bundler/client'
import { FC, useMemo, useEffect, useRef, useState } from 'react'
import Container from '@/components/Container'
import CustomLink from '@/components/Link'
import formatDate from '@/lib/formatDate'
import PageTitle from '@/components/PageTitle'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { Toc } from 'types/Toc'
import { PostFrontMatter } from 'types/PostFrontMatter'
import cn from 'classnames'
import { throttle } from 'lodash'

interface WrapperProps {
  frontMatter: PostFrontMatter
  toc: Toc
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
}

interface CurrentAnchorType {
  value: string
  top: number
}

const Wrapper: FC<WrapperProps> = ({ frontMatter, next, prev, toc, children }) => {
  const { date, title, tags } = frontMatter
  const [currentAnchor, setCurrentAnchor] = useState<string | null>(null)

  const articleDomRef = useRef<HTMLDivElement | null>(null)

  // 页面渲染后监听 滚动事件
  useEffect(() => {
    const scrollHandle = throttle(() => {
      const lowerZero = toc.reduce((maxLowerZero: CurrentAnchorType | null, current) => {
        const dom = articleDomRef.current?.querySelector(`a[href="${current.url}"]`)

        if (
          dom &&
          dom.getBoundingClientRect().top <= 10 &&
          (!maxLowerZero || maxLowerZero.top < dom.getBoundingClientRect().top)
        ) {
          return { value: current.url, top: dom.getBoundingClientRect().top }
        }

        return maxLowerZero
      }, null)

      if (lowerZero !== null) {
        setCurrentAnchor(lowerZero.value)
      } else {
        setCurrentAnchor(null)
      }
    }, 1000)

    document.addEventListener('scroll', scrollHandle, false)

    return () => {
      document.removeEventListener('scroll', scrollHandle, false)
    }
  }, [toc])

  return (
    <Container>
      <article>
        {/* 文章标题 */}
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-2 text-center">
              <div className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                <time dateTime={date}>{formatDate(date)}</time>
              </div>
              <PageTitle>{title}</PageTitle>
            </div>
          </header>

          <div className="grid-cols-4 grid grid-rows-auto-1fr xl:gap-x-6 pb-5">
            {/* pc端显示在页面左侧 手机端显示在底部 */}
            {/* 套一层div的目的是 sticky 定位的元素 与 父元素同高 导致定位失效  https://www.zhangxinxu.com/wordpress/2020/03/position-sticky-rules/ */}
            <div className="h-auto col-span-4 row-start-2 xl:row-start-1 xl:col-span-1">
              <footer className="sticky top-5  divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700  xl:divide-y ">
                {/* 使用sticky 定位实现吸顶 */}
                {toc && (
                  <div className="py-4 xl:py-8 hidden xl:block">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      目录
                    </h2>
                    <div className="mt-3 flex flex-wrap text-sm text-gray-600 dark:text-gray-500">
                      <dl className="space-y-2">
                        {toc.map((item) => (
                          <dd
                            key={item.url}
                            className={cn('truncate', {
                              'pl-0': item.depth === 1,
                              'pl-4': item.depth === 2,
                              'pl-8': item.depth === 3,
                              'pl-12': item.depth === 4,
                            })}
                          >
                            <a
                              href={item.url}
                              title={item.value}
                              className={cn('hover:text-primary-500', {
                                'text-primary-500': currentAnchor === item.url,
                              })}
                            >
                              {item.value}
                            </a>
                          </dd>
                        ))}
                      </dl>
                    </div>
                  </div>
                )}

                <div>
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

            {/* 中间文章显示区域 */}
            <div className="col-span-4 xl:col-span-3 xl:pb-0 divide-y divide-gray-200 dark:divide-gray-700">
              <div className="prose max-w-none pt-10 pb-8 dark:prose-dark" ref={articleDomRef}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Container>
  )
}

export const MDXComponents: ComponentMap = {
  // Image,
  // TOCInline,
  a: CustomLink,
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
