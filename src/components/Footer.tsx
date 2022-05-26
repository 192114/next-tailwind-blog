import Mail from '@/icons/mail.svg'
import Github from '@/icons/github.svg'

const Footer = () => {
  return (
    <footer className="py-12 flex-col items-center space-y-4">
      <div className="space-x-4 flex items-center justify-center">
        <a
          href="mailto:shadowSun192114@gmail.com"
          className="text-sm text-gray-500 transition hover:text-gray-600"
        >
          <Mail className="fill-current w-8 h-8 dark:text-gray-200 dark:hover:text-blue-400" />
        </a>

        <a
          href="https://github.com/192114"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-gray-500 transition hover:text-gray-600"
        >
          <Github className="fill-current w-8 h-8 dark:text-gray-200 dark:hover:text-blue-400" />
        </a>
      </div>

      <div className="flex items-center justify-center space-x-2 text-base text-gray-500 dark:text-gray-400">
        <span>PowerBy</span>
        <a href="https://nextjs.org" target="_blank" rel="noreferrer">Next.js</a>
        <a href="https://tailwindcss.com" target="_blank" rel="noreferrer">Tailwindcss</a>
      </div>

      <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        
      </div>
    </footer>
  )
}

export default Footer