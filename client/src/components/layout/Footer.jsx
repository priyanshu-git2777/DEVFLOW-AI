import { Link } from 'react-router'

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 font-bold text-white">
              D
            </span>

            <span className="text-xl font-bold text-white">
              DevFlow
              <span className="text-blue-400"> AI</span>
            </span>
          </Link>

          <p className="mt-4 max-w-sm leading-7 text-slate-400">
            An intelligent workspace designed to help developers
            organize projects, manage tasks, save code, and use AI
            development tools.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">
            Product
          </h3>

          <div className="mt-4 flex flex-col gap-3">
            <a
              href="#features"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              How It Works
            </a>

            <a
              href="#technology"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Technology
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">
            Account
          </h3>

          <div className="mt-4 flex flex-col gap-3">
            <Link
              to="/login"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-center text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            © 2026 DevFlow AI. All rights reserved.
          </p>

          <p>
            Built with React, Tailwind CSS, Node.js and MongoDB.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer