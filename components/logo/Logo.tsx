import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <Link href="/" className="flex items-center">
            <span className="font-bold text-xl font-space-plus-jakarta-sans bg-gradient-to-r from-[#004d27] to-[#00cc66] inline-block text-transparent bg-clip-text">
                momentum
            </span>
        </Link>
    )
}

export default Logo