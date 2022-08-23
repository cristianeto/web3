import Link from 'next/link'
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
    const router = useRouter();

    return (
        <div className='navbar'>
            <ul className='navbar-container'>
                <li className={`item ${router.pathname == "/" ? "active" : ""}`}>
                    <Link href="/">Home</Link>
                </li>
                <li className={`item ${router.pathname == "/multisig" ? "active" : ""}`}>
                    <Link href="/multisig">Multisig</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar