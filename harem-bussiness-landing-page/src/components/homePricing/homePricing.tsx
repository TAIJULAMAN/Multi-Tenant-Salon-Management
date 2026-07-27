import { CircleCheck } from "lucide-react";

export default function HomePricing() {
  const plans = [
    {
      name: "Single Use",
      price: 49,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      features: ["Lorem", "Lorem", "Lorem", "Lorem", "Lorem"],
      isPopular: false,
    },
    {
      name: "Multiple Use",
      price: 89,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      features: ["Lorem", "Lorem", "Lorem", "Lorem", "Lorem"],
      isPopular: false,
    },
    {
      name: "Extended Use",
      price: 299,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      features: ["Lorem", "Lorem", "Lorem", "Lorem", "Lorem"],
      isPopular: true,
    },
    {
      name: "Unlimited Use",
      price: 499,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      features: ["Lorem", "Lorem", "Lorem", "Lorem", "Lorem"],
      isPopular: false,
    },
  ];

  return (
    <section id="pricing" className="bg-[#EEF0FA] py-24 px-4 font-manrope">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#5A4BFC] mb-4 leading-tight">
            Plans for every stage<br className="hidden sm:block" /> of your salon
          </h2>
          <p className="text-gray-500 text-lg">
            Choose the right tools today and scale effortlessly tomorrow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 flex flex-col shadow-sm font-manrope"
            >
              <div className="flex items-center gap-3 mb-4">
                <h6 className="text-[20px] leading-[1.2] font-semibold tracking-normal text-gray-800">
                  {plan.name}
                </h6>
                {plan.isPopular && (
                  <span className="bg-[#EBEAFA] text-[#5A4BFC] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {plan.description}
              </p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-bold text-[#5A4BFC]">
                  ${plan.price}
                </span>
                <span className="text-sm text-gray-400 font-medium">
                  / month
                </span>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                    <CircleCheck className="w-[18px] h-[18px] text-[#00C48C]" strokeWidth={2} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg text-sm font-medium transition-colors ${
                  plan.isPopular
                    ? "bg-[#5A4BFC] text-white hover:bg-[#4839e6]"
                    : "bg-[#E3E6FF] text-[#5A4BFC] hover:bg-[#d8dbff]"
                }`}
              >
                Purchase Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
