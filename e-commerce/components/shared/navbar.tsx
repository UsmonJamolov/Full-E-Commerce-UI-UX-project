import Link from 'next/link'
import { Button } from '../ui/button'
import Logo from './logo'
import Menu from './menu'
import RightSectionPage from './right-section'

const Navbar = () => {
    return (
        <div className="h-20 bg-secondary border-b fixed inset-0 z-50 flex itemes-center justify-center">
            <div className="container max-w-6xl flex items-center justify-between h-full">
                <Logo />

                <Menu />

                <RightSectionPage />
            </div>
        </div>
    )
}

export default Navbar