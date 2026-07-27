import Link from "next/link";

export default function CtaButton() {
    return (
        <>
            <div className="hidden md:flex items-center gap-4">
                <Link href="/signup">
                    <button
                        className="w-full px-4 py-2.5 font-manrope rounded-[8px] bg-[#DDDBFF] 
                text-[#635BFF] font-medium cursor-pointer leading-6 font-sm hover:bg-[#635BFF] hover:text-white  transition-all duration-400 ease-in-out"
                    >
                        Get Started
                    </button>
                </Link>
                <Link href="/login">
                    <button
                        className="px-4 font-manrope font-medium py-2 rounded-[8px] border-2 border-[#635BFF] 
            text-[#635BFF] text-sm  hover:bg-[#635BFF] hover:text-white transition-all duration-400 ease-in-out leading-6 cursor-pointer"
                    >
                        Login
                    </button>
                </Link>
            </div>
        </>
    )
}
