import Link from '@/components/Link'
import { FC } from 'react'

import Container from '@/components/Container'
import ThemeSwitch from '@/components/ThemeSwitch'
import headerNavLinks from '@/data/headerNavLinks'

import Logo from '@/data/logo.svg'
import Footer from '@/components/Footer'
import MobileNav from '@/components/MobileNav'


const Layout: FC = ({ children }) => {
  return (
    <Container>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-10">
          {/* 左侧logo */}
          <div>
            <Link href="/">
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Logo />
                </div>

                <div className="hidden h-6 text-2xl font-semibold sm:block">Shadow Sun</div>
              </div>
            </Link>
          </div>

          {/* 右侧导航 */}
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((navLinkItem) => (
                <Link
                  href={navLinkItem.href}
                  key={navLinkItem.href}
                  className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                >
                  {navLinkItem.title}
                </Link>
              ))}
            </div>

            <ThemeSwitch />

            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </Container>
  )
}

export default Layout
