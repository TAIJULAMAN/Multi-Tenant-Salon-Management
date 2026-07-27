"use client";

import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { Facebook, Twitter, Instagram } from "lucide-react";

const LeafletMap = dynamic(() => import("../../components/salonHome/LeafletMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-[#0F172A] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#635BFF] border-t-transparent rounded-full animate-spin" />
        </div>
    ),
});

export default function ContactUsSection() {
    return (
        <section id="contact" className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-[56px] font-normal text-[#1E293B] font-manrope">
                        Contact Us
                    </h2>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-16">
                    {/* Left: Contact Info Card */}
                    <div className="lg:col-span-4 bg-[#635BFF] rounded-[32px] p-10 text-white relative overflow-hidden flex flex-col justify-between min-h-[550px]">
                        {/* Abstract Background Shapes */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />

                        <div className="relative z-10 space-y-8">
                            <div className="space-y-6">
                                <div className="pb-6 border-b border-white/10">
                                    <h3 className="text-xl font-bold font-manrope mb-4">Phone Number</h3>
                                    <p className="text-white font-manrope">00000000</p>
                                </div>
                                <div className="pb-6 border-b border-white/10">
                                    <h3 className="text-xl font-bold font-manrope mb-4">Email</h3>
                                    <p className="text-white font-manrope">contact@email.com</p>
                                </div>
                                <div className="pb-6 border-b border-white/10">
                                    <h3 className="text-xl font-bold font-manrope mb-4">Address</h3>
                                    <p className="text-white font-manrope">Full Address</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 pt-4">
                            <h3 className="text-xl font-bold font-manrope mb-6">Follow Us</h3>
                            <div className="flex gap-6">
                                <a href="#" className="text-white hover:text-white/80 transition-all">
                                    <Facebook className="w-6 h-6" />
                                </a>
                                <a href="#" className="text-white hover:text-white/80 transition-all">
                                    <Twitter className="w-6 h-6" />
                                </a>
                                <a href="#" className="text-white hover:text-white/80 transition-all">
                                    <Instagram className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="lg:col-span-8 bg-white rounded-[32px] p-10 shadow-sm border border-gray-100 flex flex-col">
                        <form className="space-y-8 flex-1">
                            <div className="grid md:grid-cols-1 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#1E293B] font-manrope">Name *</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your Name"
                                        className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#635BFF] transition-all font-manrope"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#1E293B] font-manrope">Phone Number *</label>
                                    <input
                                        type="text"
                                        placeholder="XXX XXX XXXX"
                                        className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#635BFF] transition-all font-manrope"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#1E293B] font-manrope">Message</label>
                                <textarea
                                    rows={4}
                                    placeholder="Write your message here..."
                                    className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#635BFF] transition-all font-manrope resize-none"
                                />
                            </div>

                            <div className="flex items-start gap-3">
                                <input type="checkbox" className="mt-1 w-5 h-5 accent-[#635BFF]" />
                                <p className="text-sm text-[#64748B] font-manrope leading-relaxed">
                                    After reading the privacy policy, I agree to the processing of my personal data so that I may receive a response.
                                </p>
                            </div>

                            <div className="flex justify-end">
                                <button className="bg-[#635BFF] text-white px-10 py-4 rounded-xl font-bold font-manrope hover:bg-[#534dfd] transition-all shadow-lg shadow-[#635BFF]/20">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Map Section */}
                <div className="w-full h-[500px] rounded-[48px] overflow-hidden shadow-2xl border-4 border-white/10 relative z-10">
                    <LeafletMap />
                </div>
            </div>
        </section>
    );
}