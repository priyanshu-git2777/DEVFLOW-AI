import RecentProjects from '../components/dashboard/RecentProjects'
import RecentTasks from '../components/dashboard/RecentTasks'
import StatCard from '../components/dashboard/StatCard'
import { Link } from 'react-router'

const statistics = [
  {
    title: 'Total Projects',
    value: '08',
    description: 'Three projects currently in progress',
    icon: '▣',
    accent: 'blue',
  },
  {
    title: 'Total Tasks',
    value: '24',
    description: 'Nine tasks require your attention',
    icon: '✓',
    accent: 'violet',
  },
  {
    title: 'Completed Tasks',
    value: '15',
    description: 'More than half of your tasks are complete',
    icon: '✓',
    accent: 'emerald',
  },
  {
    title: 'Saved Snippets',
    value: '41',
    description: 'Reusable code saved across languages',
    icon: '</>',
    accent: 'amber',
  },
  {
    title: 'AI Requests',
    value: '126',
    description: 'Code and documentation requests generated',
    icon: '✦',
    accent: 'cyan',
  },
]

function DashboardPage() {
  return (
    <section className="px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Overview
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-slate-400">
            Review your projects, development tasks, code snippets,
            and recent workspace activity.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {statistics.map((statistic) => (
            <StatCard
              key={statistic.title}
              {...statistic}
            />
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <RecentProjects />
          <RecentTasks />
        </div>

        <section className="mt-8 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/15 via-slate-900 to-violet-600/15 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-300">
                AI Developer Assistant
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Need help with your code?
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-slate-400">
                Open the AI Workspace to explain code, find bugs,
                improve solutions, and generate development content.
              </p>
            </div>

            <Link
  to="/ai-workspace"
  className="w-fit rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
>
  Open AI Workspace
</Link>
          </div>
        </section>
      </div>
    </section>
  )
}

export default DashboardPage