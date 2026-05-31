import { useState } from 'react';
import { Building2, Users, Percent, Clock, Target, Briefcase, Search, Layers, AlertCircle, Wrench, Zap, Rocket, TrendingUp, Anchor, ArrowRight, Sparkles, ChevronDown, Gauge, Combine, Repeat } from 'lucide-react';

const stages = [
  {
    id: 'pre-seed',
    name: 'Angel / Pre-seed',
    tag: 'No product',
    intensity: 100,
    icon: Zap,
    color: 'rose',
    odds: '<0.5%',
    round: '$50k to $200k',
    team: '2 to 3 people',
    equity: 'Very high, very risky',
    runway: 'Months',
    investor: 'Angels, rarely VCs',
    valuation: '$1M to $5M',
    multiplier: '10x',
    multiplierLabel: '~10 career years per calendar year',
    summary: 'Founders, a problem, and a Google Sheet.',
    company: 'No real product. Prototypes in Sheets, Airtable, or low-code. The founders understand the customer problem deeply, and that is most of what exists.',
    engineering: 'Skip tests. Ship the hackiest thing that proves the idea. Code is disposable. Optimize for learning speed, not durability.',
    comp: 'There may be a salary, but it will be very low. Equity is your only real upside, and the base rate of failure is brutal.',
    life: 'Everything, all the time. You are the company.',
    careerGrowth: 'The most concentrated learning of your career. You touch every layer of building a company, make decisions that actually matter, and do it under real constraints. One year here teaches you what ten years at a mature company teaches. The cost is income and stability, both of which you give up almost entirely.',
  },
  {
    id: 'seed',
    name: 'Seed',
    tag: 'Hacky product',
    intensity: 85,
    icon: Wrench,
    color: 'orange',
    odds: '~1%',
    round: '$500k to $5M',
    team: 'Under 10',
    equity: '1% to 2%, around $50k on paper',
    runway: '~1 year',
    investor: 'Early-stage VCs',
    valuation: '$5M to $30M',
    multiplier: '10x',
    multiplierLabel: '~10 career years per calendar year',
    summary: 'Customers use the product. PMF is the open question.',
    company: 'A hacky product exists. Customers use it and get value. There is an idea for how to monetize. Product-market fit is not proven yet, and that is the entire job.',
    engineering: 'Green field. You do everything: devops, backend, frontend, security, whatever ships. Take on as much technical debt as you can stand. Speed beats cleanliness.',
    comp: 'Below-market salary. 1 to 2 percent equity, worth roughly $50k at the current valuation. The realistic outcome distribution is bimodal.',
    life: 'Brutal. Runway is around a year. Every quarter is existential. The goal is to prove PMF and raise the Series A.',
    careerGrowth: 'Still extreme. You learn how products actually find customers, how engineering trade-offs play out under pressure, and how to operate without process. The lessons are durable and hard to get anywhere else.',
    pmfBox: {
      title: 'What "PMF" actually means',
      items: [
        'The product solves a real problem for customers',
        'A profitable business can be built on top of it',
        'The market is big enough to matter',
      ],
    },
  },
  {
    id: 'series-a',
    name: 'Series A',
    tag: 'Proved PMF',
    intensity: 65,
    icon: Rocket,
    color: 'amber',
    odds: '~2%',
    round: '$10M to $50M',
    team: '10 growing to 50 or 100 in a year',
    equity: '0.1% to 0.5%',
    runway: '1 to 2 years',
    investor: 'VCs',
    valuation: '$100M to $500M',
    multiplier: '5x',
    multiplierLabel: '~5 career years per calendar year',
    summary: 'PMF is proved. Scale or die.',
    company: 'PMF is proved. Valuation jumps to $100M to $500M. Now it is all about scaling fast: customers, revenue, headcount, infrastructure.',
    engineering: 'Clean up the debt from the seed stage. Hire fast. Delegate. Scale the product beyond what looked possible six months ago. A lot of leadership is figuring out how to ramp new engineers in weeks.',
    comp: 'Closer to market salary. Smaller equity slice (0.1 to 0.5 percent), but on a much larger base. A seed-era $50k package becomes worth roughly 20x after a successful Series A.',
    life: 'Hard. Team triples or quadruples, which is its own kind of chaos. Process arrives whether you like it or not.',
    careerGrowth: 'You learn to scale: hiring, delegation, building teams from scratch, cleaning up the debt the seed stage shipped. A different muscle from earlier stages, and one you can only really build by living it.',
  },
  {
    id: 'series-b',
    name: 'Series B',
    tag: 'Going broader',
    intensity: 45,
    icon: TrendingUp,
    color: 'emerald',
    odds: 'Materially better',
    round: '$30M to $100M+',
    team: '100+',
    equity: 'Smaller %, larger $',
    runway: '2+ years',
    investor: 'Growth-stage VCs',
    valuation: '$500M to $2B',
    multiplier: '3x',
    multiplierLabel: '~3 career years per calendar year',
    summary: 'Expanding within the same market.',
    company: 'Expanding. Going broader within the existing market. The goal is to grow market size and entrench. If your market is $10B and you hold 5%, that is $500M in revenue at full capture.',
    engineering: 'Specialization kicks in: platform teams, infra teams, product teams. Process matters more. Architecture decisions outlive the people who made them.',
    comp: 'Market salary. Smaller equity percentage on a much larger valuation. Refresh grants start to matter.',
    life: 'Predictable enough that you can plan a weekend without canceling it.',
    careerGrowth: 'You start to learn what a real engineering organization looks like. Specialization, platform thinking, process. Slower learning than earlier stages, but the work gets more sophisticated.',
  },
  {
    id: 'series-c',
    name: 'Series C and beyond',
    tag: 'New verticals',
    intensity: 30,
    icon: Layers,
    color: 'sky',
    odds: 'Best of any stage',
    round: '$50M to $500M+',
    team: '200 to 1000+',
    equity: 'Small %, meaningful $',
    runway: '3+ years or profitable',
    investor: 'Late-stage VCs, PE, crossover',
    valuation: '$1B+',
    multiplier: '2x',
    multiplierLabel: '~2 career years per calendar year',
    summary: 'Expanding into new verticals and adjacent markets.',
    company: 'Expanding into new verticals or adjacent markets. The goal is to grow the total market the company plays in. Take that same 5% share, but apply it to a $50B market, and you get $2.5B in revenue.',
    engineering: 'Mature engineering org. Strong specialization, internal platforms, formal career ladders. Big system migrations and reliability work dominate.',
    comp: 'Strong cash comp. Equity percentages are small but dollar values can be meaningful, especially with secondaries and tender offers.',
    life: 'Normal-job hours, with normal-job problems.',
    careerGrowth: 'Mature engineering practices, big-system thinking, internal platforms. You will learn how a strong organization runs at scale, which is worth knowing once. But the pace of personal growth slows down.',
  },
  {
    id: 'big-tech',
    name: 'Big tech and corporate',
    tag: 'Retirement track',
    intensity: 15,
    icon: Anchor,
    color: 'slate',
    odds: 'Stable',
    round: 'N/A',
    team: '1,000 to 200,000+',
    equity: 'RSUs, fully liquid',
    runway: 'Indefinite',
    investor: 'Public markets',
    valuation: '$10B+',
    multiplier: '0.5x',
    multiplierLabel: '~0.5 career years per calendar year',
    summary: 'Good salary, low impact, slow growth.',
    company: 'Mature, public, or simply massive. Most of the interesting problems are solved, owned by another team, or fenced off by politics. Your work matters less in absolute terms because the company runs without it.',
    engineering: 'Narrow specialization. Mature tooling. Formal processes. You become an expert in a thin slice of a giant system. Migrations and incremental improvements dominate the work.',
    comp: 'Strong total comp, mostly cash and liquid RSUs. Predictable. Refresh grants and bonuses are part of the package.',
    life: 'The best of any category on hours and benefits. The trade-off is the work itself: meetings, alignment, headcount politics.',
    careerGrowth: 'Slow. You will polish what you already know, but nothing will force you to grow. Best as a capstone after you have already fast-tracked your career at earlier-stage companies. A bad starting point, a fine ending point.',
  },
];

const colorMap = {
  rose: { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30', dot: 'bg-rose-500', ring: 'ring-rose-500/30', gradient: 'from-rose-500 to-rose-600' },
  orange: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30', dot: 'bg-orange-500', ring: 'ring-orange-500/30', gradient: 'from-orange-500 to-orange-600' },
  amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', dot: 'bg-amber-500', ring: 'ring-amber-500/30', gradient: 'from-amber-500 to-amber-600' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', dot: 'bg-emerald-500', ring: 'ring-emerald-500/30', gradient: 'from-emerald-500 to-emerald-600' },
  sky: { text: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/30', dot: 'bg-sky-500', ring: 'ring-sky-500/30', gradient: 'from-sky-500 to-sky-600' },
  slate: { text: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/30', dot: 'bg-slate-500', ring: 'ring-slate-500/30', gradient: 'from-slate-500 to-slate-600' },
};

const navItems = [
  { id: 'why', label: 'Why' },
  { id: 'spectrum', label: 'Spectrum' },
  { id: 'stages', label: 'Stages' },
  { id: 'compare', label: 'Compare' },
  { id: 'equity', label: 'Equity' },
  { id: 'liquidity', label: 'Cashing in' },
  { id: 'market', label: 'Market' },
  { id: 'vcs', label: 'VCs' },
  { id: 'research', label: 'Research' },
];

function fmt(n) {
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000) return '$' + (n / 1_000).toFixed(1) + 'k';
  return '$' + n.toFixed(0);
}

export default function App() {
  const [shares, setShares] = useState(10000);
  const [strike, setStrike] = useState(5);
  const [currVal, setCurrVal] = useState(10);
  const [exitVal, setExitVal] = useState(1000);
  const [tax, setTax] = useState(50);

  const currTotalVal = currVal * 1_000_000;
  const exitTotalVal = exitVal * 1_000_000;
  const multiple = exitTotalVal / currTotalVal;
  const sharePriceExit = strike * multiple;
  const gross = shares * sharePriceExit;
  const exerciseCost = shares * strike;
  const afterExercise = Math.max(0, gross - exerciseCost);
  const afterTax = afterExercise * (1 - tax / 100);

  const presets = [
    { label: 'Optimistic: $1B exit', shares: 10000, strike: 5, curr: 10, exit: 1000 },
    { label: 'Realistic: $100M acquisition', shares: 10000, strike: 5, curr: 10, exit: 100 },
    { label: 'It dies', shares: 10000, strike: 5, curr: 10, exit: 0.1 },
  ];

  const scroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-gradient-to-br from-amber-400 to-rose-500">
              <Sparkles className="h-4 w-4 text-zinc-950" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Startup &amp; Equity 101</span>
          </div>
          <div className="hidden gap-0.5 md:flex">
            {navItems.map((it) => (
              <button key={it.id} onClick={() => scroll(it.id)} className="rounded px-2 py-1 text-xs text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100">
                {it.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(244,63,94,0.12),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(56,189,248,0.10),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Written for engineers who think &lsquo;startup&rsquo; means one thing
          </div>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
            Not all startups are the same.<br />
            <span className="bg-gradient-to-r from-amber-300 via-rose-400 to-slate-400 bg-clip-text text-transparent">Stop treating them like they are.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            I have spent a career watching engineers &mdash; peers, and people I have managed &mdash; chase &lsquo;a startup&rsquo; as if it meant one thing: the opposite of corporate. They joined the wrong stage, or the stage changed under them, and they got burned. But a pre-seed and a Series C share almost nothing: different work, different odds, different equity, different career velocity. This is the map I wish they&rsquo;d had &mdash; so you can pick the trade-offs on purpose.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => scroll('spectrum')} className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-white">
              See the spectrum <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => scroll('equity')} className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2.5 text-sm font-medium text-zinc-100 transition hover:bg-zinc-800">
              <Percent className="h-4 w-4" /> How equity works
            </button>
          </div>
          <button onClick={() => scroll('why')} className="mt-16 flex items-center gap-1 text-xs text-zinc-500 transition hover:text-zinc-300">
            <ChevronDown className="h-3 w-3 animate-bounce" /> Scroll
          </button>
        </div>
      </section>

      {/* Why */}
      <section id="why" className="border-b border-zinc-800/80 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">00 / Why this exists</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">I watched too many good engineers pick the wrong startup</h2>
          <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-zinc-300">
            <p>Over my career I have worked with a lot of engineers who wanted to &ldquo;join a startup&rdquo; &mdash; peers, and people I managed. Most of them had no real picture of what that meant beyond one thing: <span className="font-medium text-zinc-100">the opposite of corporate.</span></p>
            <p>So they got burned. They joined the wrong stage for what they actually wanted out of work. Or the company grew into the next stage, the expectations shifted underneath them, and the things that made them great at seed suddenly did not fit at Series B. They got frustrated, they struggled to perform, and they left &mdash; usually for another startup, where the same thing happened again.</p>
            <p>The root cause was almost always the same: they treated every startup as the same thing. They would put a Stripe or a Clipboard Health in the same basket as two founders eating instant noodles at pre-seed. Those are not the same job. They are barely the same universe.</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { icon: Target, title: 'They picked the wrong stage', body: 'They wanted stability and equity as a bonus, then joined a pre-seed where the only certainty is that most of it fails. Or they wanted to build from zero and own everything, then joined a 2,000-person "startup" where every interesting problem already has a team.' },
              { icon: Repeat, title: 'The stage changed under them', body: 'They thrived in seed-stage chaos, then watched process, specialization, and headcount arrive at Series B. The job that fit them perfectly turned into a different job. Instead of adapting, they got frustrated, underperformed, and bounced to the next one.' },
              { icon: Layers, title: 'They treated "startup" as one thing', body: 'A pre-seed and a Series C share a label and almost nothing else: different work, different odds, different equity, different pace of growth. Lumping them together is how smart people walk into a stage that was never going to suit them.' },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-rose-500 text-zinc-950">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-base font-semibold text-zinc-100">{c.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{c.body}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
              <div>
                <div className="text-sm font-semibold text-zinc-100">What this guide is</div>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">The mental model I wish all of them had walked in with. What each stage actually demands, what it pays, what it does to your life, and how fast it grows your career &mdash; so you can choose the trade-offs deliberately instead of finding out the hard way.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spectrum */}
      <section id="spectrum" className="border-b border-zinc-800/80 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">01 / The spectrum</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Intensity drops, career growth slows</h2>
          <p className="mt-4 max-w-2xl text-zinc-400">The two move together. Earlier stages take more of your life but pay you back in compressed career years. Later stages give you back your evenings but stop pushing you.</p>

          {/* Spectrum bar */}
          <div className="mt-12 rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/60 to-zinc-950 p-6 md:p-10">
            <div className="-mx-2 overflow-x-auto px-2 pb-2">
              <div className="relative min-w-[640px]">
                <div className="absolute left-0 right-0 top-12 h-2 rounded-full bg-gradient-to-r from-rose-500 via-amber-500 via-emerald-500 to-slate-500" />
                <div className="grid grid-cols-6 gap-2">
                  {stages.map((s) => {
                    const c = colorMap[s.color];
                    const Icon = s.icon;
                    return (
                      <button key={s.id} onClick={() => scroll(s.id)} className="group relative flex flex-col items-center pt-0">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 bg-zinc-950 ${c.border} ${c.text} transition group-hover:scale-110`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="mt-3 h-6 w-px bg-zinc-700" />
                        <div className="mt-2 text-center">
                          <div className="text-xs font-semibold text-zinc-200">{s.name}</div>
                          <div className={`mt-1 text-[10px] uppercase tracking-wide ${c.text}`}>{s.tag}</div>
                          <div className={`mt-2 inline-flex items-center gap-1 rounded-full ${c.bg} px-1.5 py-0.5 text-[10px] font-semibold ${c.text}`}>
                            <Gauge className="h-2.5 w-2.5" /> {s.multiplier}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 text-xs md:grid-cols-4">
              {[
                { label: 'All in', sub: 'Pre-seed, Seed', color: 'text-rose-400' },
                { label: 'Hard', sub: 'Series A', color: 'text-amber-400' },
                { label: 'Family friendly', sub: 'Series B, C+', color: 'text-emerald-400' },
                { label: 'Retirement', sub: 'Big tech and corporate', color: 'text-slate-400' },
              ].map((b) => (
                <div key={b.label} className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
                  <div className={`text-xs font-semibold ${b.color}`}>{b.label}</div>
                  <div className="mt-1 text-[11px] text-zinc-500">{b.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stages */}
      <section id="stages" className="border-b border-zinc-800/80 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">02 / Stage by stage</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What each stage actually looks like</h2>
          <p className="mt-4 max-w-2xl text-zinc-400">Same template for each: the company, the engineering, the comp, the work-life reality, and how fast you grow. Compare them on the dimensions that matter to you.</p>

          <div className="mt-12 space-y-8">
            {stages.map((s, idx) => {
              const c = colorMap[s.color];
              const Icon = s.icon;
              return (
                <div key={s.id} id={s.id} className={`overflow-hidden rounded-2xl border ${c.border} bg-gradient-to-br from-zinc-900/60 to-zinc-950`}>
                  <div className={`flex items-start gap-4 border-b ${c.border} ${c.bg} px-6 py-5 md:px-8`}>
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${c.gradient} text-zinc-950`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="text-xs font-medium text-zinc-500">Stage {idx + 1}</span>
                        <h3 className="text-2xl font-bold tracking-tight">{s.name}</h3>
                        <span className={`rounded-full ${c.bg} px-2 py-0.5 text-xs font-medium ${c.text}`}>{s.tag}</span>
                      </div>
                      <p className="mt-1 text-zinc-400">{s.summary}</p>
                    </div>
                  </div>

                  {/* Career fast-track band */}
                  <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 border-b ${c.border} bg-gradient-to-r ${c.bg} from-zinc-900/40 px-6 py-4 md:px-8`}>
                    <div className="flex items-center gap-2.5">
                      <Gauge className={`h-5 w-5 ${c.text}`} />
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">Career fast-track</div>
                    </div>
                    <div className={`text-4xl font-bold leading-none tracking-tight ${c.text}`}>{s.multiplier}</div>
                    <div className="text-sm text-zinc-400">{s.multiplierLabel}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-px bg-zinc-800/50 md:grid-cols-6">
                    {[
                      { label: 'Round size', val: s.round, icon: Briefcase },
                      { label: 'Team size', val: s.team, icon: Users },
                      { label: 'Equity', val: s.equity, icon: Percent },
                      { label: 'Valuation', val: s.valuation, icon: Building2 },
                      { label: 'Runway', val: s.runway, icon: Clock },
                      { label: 'Success odds', val: s.odds, icon: Target },
                    ].map((stat) => {
                      const SIcon = stat.icon;
                      return (
                        <div key={stat.label} className="bg-zinc-950 p-4">
                          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-zinc-500">
                            <SIcon className="h-3 w-3" /> {stat.label}
                          </div>
                          <div className="mt-1.5 text-sm font-medium text-zinc-100">{stat.val}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 gap-px bg-zinc-800/50 md:grid-cols-2">
                    {[
                      { label: 'The company', val: s.company },
                      { label: 'The engineering', val: s.engineering },
                      { label: 'Comp and equity', val: s.comp },
                      { label: 'Work-life reality', val: s.life },
                    ].map((b) => (
                      <div key={b.label} className="bg-zinc-950 p-6">
                        <div className={`text-xs font-semibold uppercase tracking-wider ${c.text}`}>{b.label}</div>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-300">{b.val}</p>
                      </div>
                    ))}
                    <div className="bg-zinc-950 p-6 md:col-span-2">
                      <div className="flex items-center gap-2">
                        <Gauge className={`h-3.5 w-3.5 ${c.text}`} />
                        <div className={`text-xs font-semibold uppercase tracking-wider ${c.text}`}>Career growth</div>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-300">{s.careerGrowth}</p>
                    </div>
                  </div>

                  {s.pmfBox && (
                    <div className={`border-t ${c.border} ${c.bg} px-6 py-5 md:px-8`}>
                      <div className="flex items-start gap-3">
                        <AlertCircle className={`mt-0.5 h-5 w-5 shrink-0 ${c.text}`} />
                        <div>
                          <div className="text-sm font-semibold text-zinc-100">{s.pmfBox.title}</div>
                          <ul className="mt-2 space-y-1">
                            {s.pmfBox.items.map((it, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                                <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${c.dot}`} />
                                {it}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compare */}
      <section id="compare" className="border-b border-zinc-800/80 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">03 / Side by side</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">All stages, one table</h2>
          <p className="mt-4 max-w-2xl text-zinc-400">Use this to sanity-check an offer. If the numbers do not roughly match the stage the company claims to be in, ask why.</p>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-zinc-800">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/60 text-left text-xs uppercase tracking-wider text-zinc-400">
                  <th className="px-4 py-3 font-medium">Stage</th>
                  <th className="px-4 py-3 font-medium">Round</th>
                  <th className="px-4 py-3 font-medium">Valuation</th>
                  <th className="px-4 py-3 font-medium">Team</th>
                  <th className="px-4 py-3 font-medium">Equity</th>
                  <th className="px-4 py-3 font-medium">Career</th>
                  <th className="px-4 py-3 font-medium">Odds</th>
                  <th className="px-4 py-3 font-medium">Intensity</th>
                </tr>
              </thead>
              <tbody>
                {stages.map((s) => {
                  const c = colorMap[s.color];
                  return (
                    <tr key={s.id} className="border-b border-zinc-800/60 last:border-0 hover:bg-zinc-900/40">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                          <span className="font-medium text-zinc-100">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-zinc-300">{s.round}</td>
                      <td className="px-4 py-4 text-zinc-300">{s.valuation}</td>
                      <td className="px-4 py-4 text-zinc-300">{s.team}</td>
                      <td className="px-4 py-4 text-zinc-300">{s.equity}</td>
                      <td className="px-4 py-4">
                        <span className={`rounded-full ${c.bg} px-2 py-0.5 font-semibold ${c.text}`}>{s.multiplier}</span>
                      </td>
                      <td className="px-4 py-4 text-zinc-300">{s.odds}</td>
                      <td className="px-4 py-4">
                        <div className="flex h-2 w-24 overflow-hidden rounded-full bg-zinc-800">
                          <div className={`h-full bg-gradient-to-r ${c.gradient}`} style={{ width: `${s.intensity}%` }} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
            <div className="flex items-start gap-3">
              <Gauge className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
              <div>
                <div className="text-sm font-semibold text-zinc-100">The career compounding argument</div>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">A year at a pre-seed can be worth ten at a mature company. Two or three years of compressed learning early in your career puts you ahead of peers who skipped the pain. Once you have the skills (and the comp that comes with them), big tech and corporate make sense as a capstone. Doing it in reverse is the expensive path.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equity */}
      <section id="equity" className="border-b border-zinc-800/80 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">04 / Equity mechanics</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How vesting and exercising actually work</h2>
          <p className="mt-4 max-w-2xl text-zinc-400">The standard package is four years of vesting with a one-year cliff. Nothing vests for the first year. Then 25 percent lands at once, and the rest accrues monthly.</p>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Vesting chart */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-zinc-100">Standard vesting curve</div>
                  <div className="text-xs text-zinc-500">1000 shares, 1-year cliff, 4-year total</div>
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-400" /> Vested</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-zinc-700" /> Unvested</span>
                </div>
              </div>
              <svg viewBox="0 0 600 280" className="h-auto w-full">
                {/* Grid */}
                {[0, 25, 50, 75, 100].map((v) => (
                  <g key={v}>
                    <line x1="50" x2="580" y1={240 - v * 2} y2={240 - v * 2} stroke="rgb(39 39 42)" strokeWidth="1" strokeDasharray="2 4" />
                    <text x="40" y={244 - v * 2} textAnchor="end" fill="rgb(113 113 122)" fontSize="10">{v}%</text>
                  </g>
                ))}
                {/* Vesting curve */}
                <path d="M 50,240 L 182,240 L 182,190 L 380,140 L 580,40" fill="none" stroke="rgb(251 191 36)" strokeWidth="2.5" />
                <path d="M 50,240 L 182,240 L 182,190 L 380,140 L 580,40 L 580,240 L 50,240 Z" fill="url(#vgrad)" opacity="0.2" />
                <defs>
                  <linearGradient id="vgrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(251 191 36)" />
                    <stop offset="100%" stopColor="rgb(251 191 36)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Cliff marker */}
                <line x1="182" x2="182" y1="40" y2="240" stroke="rgb(244 63 94)" strokeWidth="1" strokeDasharray="3 3" />
                <text x="182" y="30" textAnchor="middle" fill="rgb(244 113 132)" fontSize="11" fontWeight="600">Cliff</text>
                {/* Dots at key points */}
                <circle cx="182" cy="190" r="4" fill="rgb(251 191 36)" />
                <circle cx="380" cy="140" r="4" fill="rgb(251 191 36)" />
                <circle cx="580" cy="40" r="4" fill="rgb(251 191 36)" />
                <text x="182" y="180" textAnchor="middle" fill="rgb(244 244 245)" fontSize="10" fontWeight="600">25%</text>
                <text x="380" y="130" textAnchor="middle" fill="rgb(244 244 245)" fontSize="10" fontWeight="600">50%</text>
                <text x="580" y="30" textAnchor="end" fill="rgb(244 244 245)" fontSize="10" fontWeight="600">100%</text>
                {/* X axis */}
                <line x1="50" x2="580" y1="240" y2="240" stroke="rgb(63 63 70)" strokeWidth="1" />
                <text x="50" y="260" fill="rgb(113 113 122)" fontSize="10">Hire</text>
                <text x="182" y="260" textAnchor="middle" fill="rgb(113 113 122)" fontSize="10">Year 1</text>
                <text x="380" y="260" textAnchor="middle" fill="rgb(113 113 122)" fontSize="10">Year 2.5</text>
                <text x="580" y="260" textAnchor="end" fill="rgb(113 113 122)" fontSize="10">Year 4</text>
              </svg>
            </div>

            <div className="space-y-4">
              {[
                { title: 'Cliff', body: 'One year. Leave before it and you get nothing. The cliff is the company protecting itself against bad hires.' },
                { title: 'Strike price', body: 'What it costs you to "buy" each share. Locked in when the grant is issued. The lower, the better.' },
                { title: 'Exercise window', body: 'Once you leave, you typically have 90 days to exercise or lose your vested options. Negotiate for longer if you can.' },
                { title: 'Accelerated vesting', body: 'Triggers in the contract that vest equity early, usually on acquisition. Single-trigger and double-trigger are the common shapes.' },
              ].map((b) => (
                <div key={b.title} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
                  <div className="text-sm font-semibold text-zinc-100">{b.title}</div>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{b.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
              <div>
                <div className="text-sm font-semibold text-zinc-100">Leaving forces a bet you have to fund yourself</div>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">Vested options are not shares yet. The day you leave &mdash; whether you quit or get terminated &mdash; a clock starts. You usually have around 90 days to <span className="text-zinc-200">exercise</span>: pay the strike cost out of your own pocket to actually buy the shares. If exercising your vested options costs $10k, you have to put up that $10k before the window closes, or you forfeit them.</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">And that $10k buys nothing you can spend yet. Those shares only turn into money at a liquidity event &mdash; an IPO or an acquisition &mdash; which might be years away, or might never come at all. At Series A and earlier, the most likely outcome is that the company fails and the shares end up worth zero. So leaving forces you to bet real cash today on an uncertain payout, on a timeline you do not control.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Liquidity */}
      <section id="liquidity" className="border-b border-zinc-800/80 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">05 / Cashing in</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How equity actually becomes money</h2>
          <p className="mt-4 max-w-2xl text-zinc-400">Vested options are worthless until you can sell them. Three events create that opportunity. Each has different mechanics, different timing, and different things to watch for before you sign.</p>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                icon: TrendingUp,
                tag: 'Going public',
                title: 'IPO',
                body: 'The company lists on a stock exchange. Common at $1B+ valuations. Your shares become tradeable, but not immediately: a lockup period of 90 to 180 days keeps employees from selling at launch. After lockup, the price floats on the market and your outcome depends on day-to-day volatility.',
              },
              {
                icon: Combine,
                tag: 'Sold to a buyer',
                title: 'Acquisition',
                body: 'Another company buys yours. Your equity converts to cash, acquirer stock, or a mix. Acceleration triggers may vest unvested shares. Almost always comes with a retention package: another 2 to 4 years of vesting at the acquirer, with the cliff resetting.',
              },
              {
                icon: Repeat,
                tag: 'Pre-exit cash-out',
                title: 'Tender offer / secondary',
                body: 'Existing investors or the company itself buys back shares from employees. Lets you cash out without waiting for an IPO or acquisition. Common at late-stage privates above $1B. Usually capped at a fraction of your holdings.',
              },
            ].map((card) => {
              const CardIcon = card.icon;
              return (
                <div key={card.title} className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/60 to-zinc-950 p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 text-zinc-950">
                    <CardIcon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-violet-400">{card.tag}</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-100">{card.title}</div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{card.body}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
              <div>
                <div className="text-sm font-semibold text-zinc-100">The fine print that matters</div>
                <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-zinc-400">
                  <li className="flex gap-2"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400" /><span><span className="text-zinc-200">Liquidation preferences.</span> Investors get paid first. In a bad acquisition, common shareholders (you) can take home almost nothing even when the headline number looks good.</span></li>
                  <li className="flex gap-2"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400" /><span><span className="text-zinc-200">Single vs double trigger.</span> Single trigger vests on sale. Double trigger vests on sale plus your termination. Double is more common and worse for you.</span></li>
                  <li className="flex gap-2"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400" /><span><span className="text-zinc-200">Holding periods drive tax treatment.</span> Long-term capital gains usually requires holding shares for over a year past exercise and over two years past grant. Selling sooner kicks you into ordinary income rates.</span></li>
                  <li className="flex gap-2"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400" /><span><span className="text-zinc-200">Lockups are real.</span> Six months between IPO and your first sale is enough time for the price to crater. The valuation at IPO is not what you take home.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market */}
      <section id="market" className="border-b border-zinc-800/80 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">06 / Market sizing</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">TAM, SAM, SOM</h2>
          <p className="mt-4 max-w-2xl text-zinc-400">Three layers of market sizing that VCs and founders use to argue a company is worth funding. Knowing the language helps you read a pitch deck and ask sharper questions.</p>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Nested circles */}
            <div className="flex items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
              <svg viewBox="0 0 400 400" className="h-auto w-full max-w-md">
                <circle cx="200" cy="200" r="180" fill="rgb(99 102 241)" opacity="0.08" stroke="rgb(99 102 241)" strokeOpacity="0.3" strokeWidth="1.5" />
                <circle cx="200" cy="200" r="130" fill="rgb(99 102 241)" opacity="0.12" stroke="rgb(99 102 241)" strokeOpacity="0.4" strokeWidth="1.5" />
                <circle cx="200" cy="200" r="80" fill="rgb(99 102 241)" opacity="0.18" stroke="rgb(99 102 241)" strokeOpacity="0.5" strokeWidth="1.5" />
                <circle cx="200" cy="200" r="25" fill="rgb(251 191 36)" opacity="0.9" />
                <text x="200" y="50" textAnchor="middle" fill="rgb(165 180 252)" fontSize="14" fontWeight="700">TAM</text>
                <text x="200" y="100" textAnchor="middle" fill="rgb(165 180 252)" fontSize="14" fontWeight="700">SAM</text>
                <text x="200" y="150" textAnchor="middle" fill="rgb(165 180 252)" fontSize="14" fontWeight="700">SOM</text>
                <text x="200" y="205" textAnchor="middle" fill="rgb(24 24 27)" fontSize="11" fontWeight="700">EV</text>
              </svg>
            </div>

            {/* Definitions */}
            <div className="space-y-4">
              {[
                { abbr: 'TAM', name: 'Total Addressable Market', body: 'Everyone in the world who could ever theoretically buy this kind of product. The biggest circle on the deck.', color: 'text-indigo-300' },
                { abbr: 'SAM', name: 'Serviceable Available Market', body: 'The slice of the TAM that fits this specific product, given geography, segment, and channel.', color: 'text-indigo-300' },
                { abbr: 'SOM', name: 'Serviceable Obtainable Market', body: 'What this company realistically expects to capture in the next few years. The honest number.', color: 'text-indigo-300' },
                { abbr: 'EV', name: 'Early evangelists', body: 'The most enthusiastic, most reachable subset. Your first hundred customers live here.', color: 'text-amber-300' },
              ].map((d) => (
                <div key={d.abbr} className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
                  <div className={`shrink-0 text-2xl font-bold ${d.color}`}>{d.abbr}</div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-100">{d.name}</div>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">{d.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VCs */}
      <section id="vcs" className="border-b border-zinc-800/80 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">07 / How VCs work</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">VCs are middlemen with deadlines</h2>
          <p className="mt-4 max-w-3xl text-zinc-400">VCs raise money from limited partners (LPs), invest it in startups, and return it. The fund has a fixed life, usually around 10 years. That deadline shapes every decision they make, including the pressure they put on your CEO. It is why startups are biased toward swings for the fences instead of steady growth.</p>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { n: '01', t: 'Raise the fund', b: 'VCs pitch LPs (pension funds, endowments, family offices) and lock in committed capital, typically across a 10-year window.' },
              { n: '02', t: 'Deploy capital', b: 'They invest in startups over the first 3 to 5 years of the fund, taking 10 to 20 percent of each company they back.' },
              { n: '03', t: 'Return the money', b: 'In years 5 to 10, they push portfolio companies toward exits. One huge winner needs to cover dozens of failures.' },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
                <div className="text-xs font-mono text-zinc-500">{s.n}</div>
                <div className="mt-2 text-lg font-semibold text-zinc-100">{s.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.b}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
              <div>
                <div className="text-sm font-semibold text-zinc-100">Why this matters to you</div>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">A "good for the founders" outcome is not the same as a "good for the VCs" outcome. VCs need outliers. Acquisitions at 2x the last round can be terrible for them and fine for early employees, or great for them and bad for you. Read the term sheet, ask about liquidation preferences, and assume the cap table is more complicated than the recruiter is letting on.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research */}
      <section id="research" className="border-b border-zinc-800/80 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">08 / Before you sign</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Where to actually research a company</h2>
          <p className="mt-4 max-w-2xl text-zinc-400">Recruiters present a polished story. Your job is to figure out which parts hold up. Four places to look first.</p>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { t: 'Crunchbase', b: 'Funding history, last round size, lead investor, total raised. Free tier covers the basics. Use it to sanity-check the stage they claim to be at.' },
              { t: 'Google News tab', b: 'Search "[company] funding round" and filter to news. You will find the press release, the TechCrunch coverage, and sometimes the reporting on why the round was harder than they admit.' },
              { t: 'Investor portfolios and press releases', b: 'A16z, Sequoia, Benchmark and the like publish their portfolios. The press release on a round often reveals the strategy and the bull case in the investor\'s own words.' },
              { t: 'YC "Work at a Startup"', b: 'Job listings for YC companies often include real stage information, team size, and compensation bands. Useful even if you are looking outside YC, because it sets expectations.' },
            ].map((r) => (
              <a key={r.t} className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-zinc-700 hover:bg-zinc-900/80">
                <div className="flex items-start gap-3">
                  <Search className="mt-1 h-5 w-5 shrink-0 text-amber-400" />
                  <div>
                    <div className="text-base font-semibold text-zinc-100">{r.t}</div>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{r.b}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="text-xs text-zinc-500">A guide for engineers, not financial or legal advice.</div>
          <div className="mt-2 text-xs text-zinc-600">Real outcomes vary. Read the docs. Ask a lawyer. Talk to a tax advisor.</div>
        </div>
      </footer>
    </div>
  );
}
