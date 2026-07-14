import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-white">
      <section>
        <p className="text-lg font-semibold text-blue-400">
          404
        </p>

        <h1 className="mt-3 text-5xl font-bold">
          Page Not Found
        </h1>

        <p className="mt-4 text-slate-400">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
        >
          Return Home
        </Link>
      </section>
    </main>
  )
}

export default NotFoundPage