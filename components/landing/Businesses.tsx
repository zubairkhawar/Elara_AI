import { Stethoscope, Wrench, Scissors, Building2, Sparkles, Briefcase } from 'lucide-react';

const categories = [
  {
    icon: Stethoscope,
    title: 'Clinics & Dentists',
    desc: 'Inbound calls for new patients, follow-ups, and reschedules handled automatically.'
  },
  {
    icon: Wrench,
    title: 'Plumbers & HVAC',
    desc: 'Capture every urgent service call and book jobs while your crew is in the field.'
  },
  {
    icon: Scissors,
    title: 'Salons & Spas',
    desc: 'Fill your chair time with fewer no-shows and smoother rebooking.'
  },
  {
    icon: Building2,
    title: 'Real Estate',
    desc: 'Screen inquiries, schedule showings, and route serious buyers to your team.'
  },
  {
    icon: Sparkles,
    title: 'Local Services',
    desc: 'From cleaners to tutors — if you book by phone, Elara can help.'
  },
  {
    icon: Briefcase,
    title: 'Agencies & Offices',
    desc: 'Reception-style call handling for busy front desks and distributed teams.'
  }
];

export default function Businesses() {
  return (
    <section
      className="relative overflow-hidden px-3 py-20 md:py-24 lg:py-28 bg-gradient-to-b from-[var(--scaffold-color)] via-[var(--card-color)]/40 to-[var(--scaffold-color)]"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-14 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Built for service businesses
          </h2>
          <p className="text-lg md:text-2xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed opacity-85">
            If your business receives calls — Elara can handle them.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] transition-all duration-500 shadow-[0_18px_45px_rgba(0,0,0,0.45)]"
              >
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />

                <div className="relative p-7 md:p-8 flex flex-col gap-4 h-full">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed flex-1">
                    {item.desc}
                  </p>

                  <div className="mt-2 text-sm text-purple-300/90 font-medium">
                    Always-on answering • Smart routing • Friendly follow-ups
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

