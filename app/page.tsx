import Link from 'next/link'
import '../styles/globals.css'
export default function Homepage() {
    return (
        <div className='m-10'>
            <div>
                <h2 className="text-gray-700 text-2xl font-bold">
                    tailwind
                </h2>
                <Link href={'/products'}>Products</Link>
            </div>
        </div>
    )
}
