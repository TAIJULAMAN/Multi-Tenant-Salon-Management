import "aos/dist/aos.css";
import Image from "next/image";
export default function PlanCard({ plans }: { plans: { name: string; price: number; description: string; popular: boolean }[] }) {
    return (
        <>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        data-aos="fade-up"
                        data-aos-delay={index * 150}
                        className={`relative rounded-2xl p-8 bg-white/70 backdrop-blur-md border border-[#E0E6EB] shadow-sm transition-all duration-300
              ${plan.popular ? "shadow-lg" : "hover:shadow-md"}
              `}
                    >
                        {/* Popular Badge */}
                        {plan.popular && (
                            <span className="absolute top-6 right-6 text-xs bg-[#DDDBFF] font-manrope text-[#635BFF] px-3 py-1 rounded-full">
                                Popular
                            </span>
                        )}

                        {/* Plan Title */}
                        <h3 className="md:text-[20px] text-lg font-manrope font-semibold text-[#29343D]">
                            {plan.name}
                        </h3>

                        {/* Description */}
                        <p className="mt-3 text-[#526B7A] text-sm font-manrope leading-relaxed">
                            {plan.description}
                        </p>

                        {/* Price */}
                        <div className="mt-6 flex items-end gap-2">
                            <span className="text-[40px] font-bold text-[#635BFF] font-manrope">
                                ${plan.price}
                            </span>
                            <span className="text-[16px] text-[#526B7A] font-manrope mb-1">
                                / month
                            </span>
                        </div>

                        {/* Features */}
                        <ul className="mt-6 space-y-3">
                            {["Lorem", "Lorem", "Lorem", "Lorem"].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <Image
                                        src="/images/tick_icon_2.png"
                                        alt="Check"
                                        width={20}
                                        height={20}
                                        className="inline-block"
                                    />
                                    <span className="text-sm text-gray-600 font-manrope">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Button */}
                        <button
                            className={`mt-8 w-full py-3 rounded-lg font-manrope text-sm font-semibold transition-all duration-300 cursor-pointer
                ${plan.popular
                                    ? "bg-[#635BFF] text-white hover:bg-indigo-700"
                                    : "bg-indigo-100 text-[#635BFF] hover:bg-indigo-200"
                                }
                `}
                        >
                            Purchase Now
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}
