import { FC } from 'react'

const PageTitle: FC = ({ children }) => {
  return (
    <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
      {children}
    </h1>
  )
}

export default PageTitle
