import Link from "next/link"


const Logo = () => {
    return (
        <Link href={'/'}>
            <div className="flex items-center gap-1">
                <h1>600+</h1>
            </div>
        </Link>
    )
}

export default Logo