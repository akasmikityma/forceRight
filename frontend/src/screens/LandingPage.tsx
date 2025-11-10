
import { Button } from "@/components/ui/button"
import { Code2, ArrowRight, BookOpen, Zap, TrendingUp, Library, Clock, Lightbulb } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const navigate = useNavigate();

  const goAuth = () => navigate("/auth");

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-white/95 dark:bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-blue-600">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">ForceRight</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition">
              How it works
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={goAuth}>
              <Button variant="outline" size="sm">
                Sign in
              </Button>
            </button>
            <button onClick={goAuth}>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Get started
              </Button>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900 dark:text-blue-300">Document Your Coding Journey</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-blue-600 to-orange-600">
            Record. Reflect. Improve.
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your problem-solving journey with structured notes. Document your thoughts, logic, implementation
            details, and solutions. Then analyze your patterns and growth over time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button onClick={goAuth}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 group">
                Start Tracking
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
              </Button>
            </button>

            <button onClick={goAuth}>
              <Button size="lg" variant="outline">
                View My Library
              </Button>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built for Problem Solvers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to document and analyze your coding practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: BookOpen,
              title: "Structured Tracks",
              description:
                "Create detailed tracks for each problem. Document your initial thoughts, logic, implementation, gaps, and final solution with code.",
            },
            {
              icon: Clock,
              title: "Time Tracking",
              description:
                "Record how long you spend on each problem. Track your time investment and identify patterns in your solving speed.",
            },
            {
              icon: Library,
              title: "Organized Libraries",
              description:
                "Build nested problem libraries to organize by topic, difficulty, or platform. Customize your knowledge base.",
            },
            {
              icon: TrendingUp,
              title: "Visual Analytics",
              description:
                "See your progress with charts, heatmaps, and tag distribution. Track your improvement over time and identify weak areas.",
            },
            {
              icon: Zap,
              title: "Rating & Difficulty",
              description:
                "Rate each problem by difficulty and your personal experience. Build insight into what challenges you most.",
            },
            {
              icon: Code2,
              title: "Code Editor Integration",
              description:
                "Write and document code directly in your tracks. Syntax highlighting for all major languages.",
            },
          ].map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="p-6 rounded-lg border border-border/40 hover:border-border/60 transition-colors bg-card/50 hover:bg-card "
              >
                <Icon className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-muted/30">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start documenting your problem-solving process in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: 1,
              title: "Create a Track",
              description: "Start with a problem link and add your initial thoughts",
            },
            {
              step: 2,
              title: "Document Your Process",
              description: "Add logic, implementation details, gaps, and your solution code",
            },
            {
              step: 3,
              title: "Rate & Tag",
              description: "Rate difficulty, set star rating, and add tags for categorization",
            },
            {
              step: 4,
              title: "Analyze Growth",
              description: "Track patterns, view analytics, and measure improvement",
            },
          ].map((item) => (
            <div key={item.step} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              {item.step < 4 && <div className="hidden md:block absolute top-6 -right-3 w-6 h-0.5 bg-border"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-orange-500 to-blue-600 rounded-lg p-12 text-white text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">Ready to track your journey?</h2>
          <p className="text-lg text-blue-50 max-w-2xl mx-auto">
            Start building your problem-solving library today and watch yourself grow. Document once, analyze forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={goAuth}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Get started free
              </Button>
            </button>
            <button onClick={goAuth}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                Access My Library
              </Button>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-blue-600">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">ForceRight</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Track your problem-solving journey and grow as a developer.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={goAuth} className="hover:text-foreground transition">Dashboard</button>
                </li>
                <li>
                  <button onClick={goAuth} className="hover:text-foreground transition">My Library</button>
                </li>
                <li>
                  <button onClick={goAuth} className="hover:text-foreground transition">Analytics</button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">Documentation</a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">Support</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">Privacy</a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">Terms</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 ForceRight. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}