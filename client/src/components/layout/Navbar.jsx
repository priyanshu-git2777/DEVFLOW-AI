import { useState } from 'react'
import { Link } from 'react-router'

const sectionLinks = [
  {
    label: 'Features',
    href: '#features',
  },
  {
    label: 'How It Works',
    href: '#how-it-works',
  },
  {
    label: 'Technology',
    href: '#technology',
  },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 font-bold text-white shadow-lg shadow-blue-600/20">
            D
          </span>

          <span className="text-xl font-bold text-white">
            DevFlow
            <span className="text-blue-400"> AI</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {sectionLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="rounded-lg border border-slate-700 bg-slate-900 p-2 text-slate-200 transition hover:bg-slate-800 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-slate-800 bg-slate-950 px-6 py-5 md:hidden">
          <div className="flex flex-col gap-2">
            {sectionLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white"
              >
                {link.label}
              </a>
            ))}

            <Link
              to="/login"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-900 hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={closeMenu}
              className="mt-2 rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar