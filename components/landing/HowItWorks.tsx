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
    <section className="landing-section how-section px-6 py-28 md:py-36 bg-[var(--card-color)]/30">
      <div className="landing-section-content container max-w-6xl">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            How Elara Works
          </h2>
          <div className="flex justify-center">
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              Simple, intelligent, and efficient booking management
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 steps">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative rounded-2xl bg-[var(--card-color)] border border-[var(--border)] hover:border-[var(--border-hover)] hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group text-center step-card min-h-[320px] flex flex-col"
              >
                <div className="absolute top-6 right-6 text-5xl font-bold text-[var(--text-muted)] opacity-20">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="w-20 h-20 rounded-xl gradient-primary flex items-center justify-center mb-8 mx-auto mt-8 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/30">
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1 flex flex-col justify-start px-6 pb-8">
                  <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed text-base">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
