import { Phone, Calendar, CheckCircle, BarChart } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Phone,
      title: 'Receive Calls',
      description: 'Elara answers incoming calls instantly, greeting customers professionally and understanding their needs.',
    },
    {
      icon: Calendar,
      title: 'Check Availability',
      description: 'Automatically syncs with your calendar to check real-time availability and suggest optimal time slots.',
    },
    {
      icon: CheckCircle,
      title: 'Confirm Booking',
      description: 'Confirms appointments, sends reminders, and handles cancellations or rescheduling requests.',
    },
    {
      icon: BarChart,
      title: 'Track & Analyze',
      description: 'Monitor booking trends, customer preferences, and performance metrics through detailed analytics.',
    },
  ];

  return (
    // Increased vertical padding (py-32 to py-48) to give the section more height
    <section 
      className="relative overflow-hidden px-6 py-32 md:py-48 lg:py-56 bg-gradient-to-b from-[var(--scaffold-color)] via-[var(--card-color)]/20 to-[var(--scaffold-color)]"
      style={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '80vh'
      }}
    >
      
      {/* Enhanced background glow for depth */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[120px]" />

      <div 
        className="relative max-w-7xl mx-auto flex flex-col items-center"
        style={{
          width: '100%'
        }}
      >
        {/* Header Section with more bottom margin */}
        <div className="text-center mb-20 md:mb-28">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-white">
            How Elara Works
          </h2>
          <div className="flex justify-center">
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed opacity-80">
              Simple, intelligent, and efficient booking management
            </p>
          </div>
        </div>
        
        {/* Grid Layout: Centered horizontally with auto-margins */}
        <div 
          className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-12 items-stretch justify-center"
          style={{
            marginTop: '72px'
          }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative rounded-[2rem] bg-white/[0.03] backdrop-blur-md border border-white/[0.08] hover:border-purple-500/50 hover:bg-white/[0.05] transition-all duration-500 group flex flex-col min-h-[320px] md:min-h-[360px] lg:min-h-[420px] shadow-2xl"
                style={{
                  padding: '36px'
                }}
              >
                {/* Background Number: Subtle and non-obstructive */}
                <div className="absolute top-8 right-10 text-5xl font-black text-white opacity-[0.03] italic group-hover:opacity-[0.07] transition-opacity">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon Container: Fully inside with a soft glow */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-10 shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content: Spread vertically through the card */}
                <div className="flex-1 flex flex-col justify-between gap-8">
                  <h3 className="mt-2 text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {step.title}
                  </h3>
                  <p 
                    className="text-[var(--text-secondary)] leading-relaxed text-[17px] md:text-lg group-hover:opacity-100 transition-opacity"
                    style={{
                      opacity: 0.8
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}