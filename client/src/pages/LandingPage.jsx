import { Link } from 'react-router'
import FeatureCard from '../components/landing/FeatureCard'
import SectionHeading from '../components/landing/SectionHeading'
import StepCard from '../components/landing/StepCard'
import TechBadge from '../components/landing/TechBadge'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'

const features = [
  {
    icon: '</>',
    title: 'AI Coding Assistant',
    description:
      'Ask programming questions, explain code, find bugs, improve solutions, and generate code with AI support.',
    accent: 'blue',
  },
  {
    icon: '◫',
    title: 'Project Management',
    description:
      'Create development projects, record technology stacks, track status, and keep important project links together.',
    accent: 'cyan',
  },
  {
    icon: '✓',
    title: 'Task Tracking',
    description:
      'Organize development tasks by project, priority, due date, and completion status.',
    accent: 'violet',
  },
  {
    icon: '{}',
    title: 'Code Snippets',
    description:
      'Save reusable code snippets, organize them by language, add tags, and copy them whenever needed.',
    accent: 'emerald',
  },
  {
    icon: 'R',
    title: 'README Generator',
    description:
      'Generate structured project documentation from your project information using artificial intelligence.',
    accent: 'amber',
  },
  {
    icon: 'G',
    title: 'Commit Generator',
    description:
      'Describe your code changes and receive clear conventional Git commit messages.',
    accent: 'rose',
  },
]

const steps = [
  {
    number: '01',
    title: 'Create Your Workspace',
    description:
      'Register an account and enter your personal developer dashboard.',
  },
  {
    number: '02',
    title: 'Organize Your Work',
    description:
      'Create projects, add tasks, and save useful code snippets.',
  },
  {
    number: '03',
    title: 'Build Faster with AI',
    description:
      'Use AI tools to understand code, solve problems, and generate developer documentation.',
  },
]

const technologies = [
  {
    name: 'React',
    category: 'Frontend library',
  },
  {
    name: 'Vite',
    category: 'Development tooling',
  },
  {
    name: 'Tailwind CSS',
    category: 'User interface styling',
  },
  {
    name: 'Node.js',
    category: 'JavaScript runtime',
  },
  {
    name: 'Express.js',
    category: 'Backend framework',
  },
  {
    name: 'MongoDB',
    category: 'Application database',
  },
  {
    name: 'JWT',
    category: 'Authentication',
  },
  {
    name: 'AI API',
    category: 'Intelligent features',
  },
]

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main>
        <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:pt-24 lg:pb-32 lg:pt-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.24),_transparent_42%)]" />

          <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mx-auto w-fit rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
                Built for modern developers
              </p>

              <h1 className="mt-7 text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                One intelligent workspace for your
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                  complete development flow
                </span>
              </h1>

              <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
                Plan projects, manage development tasks, save
                reusable code, and use AI-powered tools without
                switching between multiple applications.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/register"
                  className="w-full rounded-xl bg-blue-600 px-7 py-4 font-bold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/30 sm:w-auto"
                >
                  Start Building Free
                </Link>

                <a
                  href="#features"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-7 py-4 font-bold text-slate-200 transition hover:-translate-y-0.5 hover:border-slate-600 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-500/20 sm:w-auto"
                >
                  Explore Features
                </a>
              </div>

              <p className="mt-5 text-sm text-slate-500">
                No payment required for this learning project.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/70 p-3 shadow-2xl shadow-blue-950/30 backdrop-blur">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 sm:p-8">
                <div className="flex flex-col gap-5 border-b border-slate-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-400">
                      Developer Dashboard
                    </p>

                    <h2 className="mt-2 text-2xl font-bold">
                      Welcome to DevFlow AI
                    </h2>
                  </div>

                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
                    Workspace active
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ['Projects', '08'],
                    ['Active Tasks', '24'],
                    ['Saved Snippets', '41'],
                    ['AI Requests', '126'],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-slate-800 bg-slate-900 p-5"
                    >
                      <p className="text-sm text-slate-500">
                        {label}
                      </p>

                      <p className="mt-3 text-3xl font-bold text-white">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-800 bg-slate-900/40 px-6 py-10">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div>
              <p className="text-2xl font-bold text-white">
                6+
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Core tools
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold text-white">
                MERN
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Full-stack architecture
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold text-white">
                AI
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Developer assistance
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold text-white">
                100%
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Responsive design
              </p>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="scroll-mt-24 px-6 py-24 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              badge="Powerful Features"
              title="Everything you need to manage your development workflow"
              description="DevFlow AI combines project organization and intelligent developer tools inside one clean workspace."
            />

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  {...feature}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="scroll-mt-24 border-y border-slate-800 bg-slate-900/40 px-6 py-24 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              badge="Simple Workflow"
              title="From project idea to completed development work"
              description="A simple three-step workflow keeps your development activity organized and easy to understand."
            />

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {steps.map((step) => (
                <StepCard
                  key={step.number}
                  {...step}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          id="technology"
          className="scroll-mt-24 px-6 py-24 lg:py-32"
        >
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <SectionHeading
              badge="Technology Stack"
              title="Built using modern full-stack technologies"
              description="The application uses a professional MERN architecture with secure authentication, responsive styling, and AI-powered backend features."
              align="left"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              {technologies.map((technology) => (
                <TechBadge
                  key={technology.name}
                  {...technology}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 lg:pb-32">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/20 via-slate-900 to-violet-600/20 px-6 py-16 text-center sm:px-12 lg:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(139,92,246,0.25),_transparent_40%)]" />

            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
                Start Your Workspace
              </p>

              <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Bring your projects, tasks, code, and AI tools
                together
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Create your DevFlow AI account and start building
                a more organized development workflow.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  to="/register"
                  className="rounded-xl bg-blue-600 px-7 py-4 font-bold text-white transition hover:bg-blue-500"
                >
                  Create Free Account
                </Link>

                <Link
                  to="/login"
                  className="rounded-xl border border-slate-600 bg-slate-900/70 px-7 py-4 font-bold text-slate-200 transition hover:bg-slate-800"
                >
                  Login to Workspace
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default LandingPage