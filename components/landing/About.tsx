export default function About() {
  return (
    <section className="landing-section about-section px-6 py-24 md:py-32">
      <div className="landing-section-content container max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-5">
            About Elara AI
          </h2>
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Revolutionizing how businesses handle customer communications
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 items-center about-grid gap-12">
          <div className="space-y-6">
            <div className="p-8 rounded-2xl bg-[var(--card-color)] border border-[var(--border)] hover:border-[var(--border-hover)] hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 text-left">
              <h3 className="text-2xl font-semibold mb-3">Intelligent Voice AI</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg">
                Elara uses advanced natural language processing to understand context, 
                handle complex requests, and provide personalized responses that feel 
                natural and human-like.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-[var(--card-color)] border border-[var(--border)] hover:border-[var(--border-hover)] hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 text-left">
              <h3 className="text-2xl font-semibold mb-3">24/7 Availability</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg">
                Never miss a booking opportunity. Elara works around the clock to 
                capture leads, schedule appointments, and manage your calendar 
                even when you're not available.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-[var(--card-color)] border border-[var(--border)] hover:border-[var(--border-hover)] hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 text-left">
              <h3 className="text-2xl font-semibold mb-3">Seamless Integration</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg">
                Connect Elara with your existing calendar, CRM, and booking systems. 
                Sync appointments automatically and keep all your tools in perfect harmony.
              </p>
            </div>
          </div>
          
          <div className="relative opacity-90 chat-mockup">
            <div className="gradient-subtle rounded-3xl p-8 md:p-10 border border-[var(--border)] max-w-md mx-auto md:mx-0 shadow-lg shadow-purple-500/10">
              <div className="space-y-5">
                <div className="flex items-start gap-4 p-5 bg-[var(--scaffold-color)] rounded-2xl">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">E</span>
                  </div>
                  <div className="text-left">
                    <p className="text-[var(--text-primary)] font-medium mb-1">Elara AI</p>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Hello! I'm Elara, your AI assistant. How can I help you today?</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-5 bg-[var(--card-color)] rounded-2xl ml-12">
                  <div className="text-left">
                    <p className="text-[var(--text-primary)] font-medium mb-1">Customer</p>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">I'd like to book an appointment for next Tuesday at 2 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-5 bg-[var(--scaffold-color)] rounded-2xl">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">E</span>
                  </div>
                  <div className="text-left">
                    <p className="text-[var(--text-primary)] font-medium mb-1">Elara AI</p>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Perfect! I've checked your calendar and Tuesday at 2 PM is available. I'll send you a confirmation shortly.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
