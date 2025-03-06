import Link from "next/link";

export default function Navbar() {
    return (
        <nav>
            <div>
                <Link href="/">My Blog</Link>
                <div>
                    <Link href="/login">Login</Link>
                    <Link href="/dashboard">Dashboard</Link>
                </div>
            </div>
        </nav>
    );
}