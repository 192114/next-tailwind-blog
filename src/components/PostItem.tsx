import Link from '@/components/Link'
import { FC } from 'react'
import Tag from '@/components/Tag'
import type { PostFrontMatter } from 'types/PostFrontMatter'
import formatDate from '@/lib/formatDate'

const PostItem: FC<PostFrontMatter> = ({ date, slug, title, tags, summary }) => {
  return (
    <article>
      <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
        <p className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
          <time dateTime={date}>{formatDate(date)}</time>
        </p>

        <div className="space-y-5 xl:col-span-3">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold leading-8 tracking-tight">
                <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                  {title}
                </Link>
              </h2>
              <div className="mt-3 flex flex-wrap">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
            </div>
            <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
          </div>
          <div className="text-base font-medium leading-4">
            <Link href={`/blog/${slug}`} className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
              查看更多 &rarr;
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostItem
