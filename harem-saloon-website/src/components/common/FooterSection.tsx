import Image from "next/image";
import Link from "next/link";
export default function FooterSection() {
    return (
        <footer className="bg-[#0b2f45] text-white">
            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Top row */}
                <div className="grid md:grid-cols-3 gap-10 items-start">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <Image
                            src="/images/logo-white.png"
                            alt="Your Logo"
                            width={32}
                            height={32}
                            className="object-contain"
                        />
                        <span className="text-lg font-medium text-white font-manrope">Your logo</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex flex-col justify-center items-center gap-6 text-sm text-gray-300 font-manrope">
                        <div className="flex flex-col md:flex-row md:justify-center gap-6">
                            <Link href="/#features" className="hover:text-white transition">
                                Features
                            </Link>
                            <Link href="/pricing" className="hover:text-white transition">
                                Pricing
                            </Link>
                            <Link href="/#testimonials" className="hover:text-white transition">
                                Testimonials
                            </Link>
                            <Link href="/ContactUs" className="hover:text-white transition">
                                Contact Us
                            </Link>

                        </div>
                        <Link href="https://harem-bussiness-landing-page.vercel.app/" className="hover:text-white transition">Join As Salon Owner</Link>
                    </nav>

                    {/* Social */}
                    <div className="md:text-right">
                        <p className="text-sm text-white font-bold mb-4 font-manrope mr-7">
                            Follow us
                        </p>
                        <div className="flex md:justify-end gap-4">
                            <a className="hover:opacity-80 transition cursor-pointer">
                                <Image
                                    src="/images/facebook.png"
                                    alt="Facebook"
                                    width={22}
                                    height={22}
                                    className="object-contain"
                                />
                            </a>

                            <a className="hover:opacity-80 transition cursor-pointer">
                                <Image
                                    src="/images/twitter.png"
                                    width={24}
                                    height={24}
                                    alt="Twitter"
                                    className="object-contain"
                                />
                            </a>

                            <a className="hover:opacity-80 transition cursor-pointer">
                                <Image
                                    src="/images/instagram.png"
                                    alt="Instagram"
                                    width={22}
                                    height={22}
                                    className="object-contain"
                                />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 my-10" />

                {/* Bottom row */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400 font-manrope">
                    <p>All rights reserved by Your Logo.</p>

                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
                    </div>

                    <p className="mt-2 md:mt-0 font-manrope">
                        Produced by{" "}
                        <span className="font-semibold text-white font-manrope">AdminMart</span>.
                    </p>
                </div>
            </div>
        </footer>
    );
}
