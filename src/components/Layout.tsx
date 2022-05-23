import Link from 'next/link'
import { FC } from 'react'

import Container from './Container'
import Logo from '../../data/vercel.svg'

const Layout: FC = ({ children }) => {
  return (
    <Container>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between">
          {/* 左侧logo */}
          <div>
            <Link href="/">
              <div className="flex items-center justify-between">
                <div className="m-4">
                  <Logo />
                </div>
              </div>
            </Link>
          </div>
        </header>
      </div>

      {children}
    </Container>
  )
}

export default Layout