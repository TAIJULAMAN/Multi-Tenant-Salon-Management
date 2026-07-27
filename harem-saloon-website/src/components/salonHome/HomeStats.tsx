"use client";

const stats = [
  { label: "Clients", value: "+1,000", delay: 100 },
  { label: "Appointments Booked", value: "+10,000", delay: 200 },
  { label: "Average Rating", value: "4.9/5", delay: 300 },
];

export default function HomeStats() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        <div className="md:w-1/2 lg:w-1/3 text-center md:text-left">
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#1E293B] font-manrope leading-[1.2]">
            A unique story in <br className="hidden lg:block" /> every number
          </h2>
        </div>
        <div className="flex-1 flex flex-wrap justify-center md:justify-end items-center gap-10 lg:gap-20">
          {stats.map((stat, idx) => (
            <div key={idx} data-aos="fade-up" data-aos-delay={stat.delay} className="text-center">
              <div className="text-[#635BFF] text-4xl lg:text-[56px] font-bold font-manrope mb-1">
                {stat.value}
              </div>
              <div className="text-[#64748B] text-xs font-manrope uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
