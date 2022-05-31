import Link from '@/components/Link'
import kebabCase from '@/lib/kebabCase'
import { FC } from 'react'

interface TagProps {
  text: string
}

const Tag: FC<TagProps> = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`} className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
