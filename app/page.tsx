import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>This is an app!</h1>
      <p>This is the homepage</p>
      <Link href="/about">Go to about page</Link>
    </main>
  )
}