import Link from "next/link"

const Menu = () => {
    return (
        <div className="flex justify-between gap-1">
            <Link href='/'>Home</Link>
            <Link href='/'>Contact</Link>
            <Link href='/'>About</Link>
            <Link href='/'>Sign Up</Link>
        </div>
    )
}

export default Menu