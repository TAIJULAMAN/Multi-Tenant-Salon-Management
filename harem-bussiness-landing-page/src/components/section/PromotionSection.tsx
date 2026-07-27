"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import type { Swiper as SwiperType } from "swiper";
import IDashboard from "../svg/IDashboar";
import INIdashboard from "../svg/INIdashboard";
import ICalander from "../svg/ICalander";
import INICalander from "../svg/INICalander";
import IClient from "../svg/IClient";
import INIClient from "../svg/INIClient";
import IUserGroup from "../svg/IUserGroup";
import IUserGroupDark from "../svg/IUserGroupDark";
import IBookOpen from "../svg/IBookOpen";
import IBookOpenDark from "./IBookOpenDark";
import IGlobeNetwork from "../svg/IGlobeNetwork";
import IGlobeNetworkDark from "../svg/IGlobeNetworkDark";
import IInfoCircle from "../svg/IInfoCircle";
import IInfoCircleWhite from "../svg/IInfoCircleWhite";
import IWalletIcon from "../svg/IWalletIcon";
import IWalletIconDark from "../svg/IWalletIconDark";
import ConcentricIcon from "../svg/ConcentricIcon";
import ConcentricIconWhite from "../svg/ConcentricIconWhite";
import IFileICon from "../svg/IFileICon";
import IfileIconwhite from "../svg/IfileIconwhite";
import IRoleicon from "../svg/IRoleicon";
import IRoleDark from "./IRoleDark";
import Recipticon from "../svg/Recipticon";
import ReciptIconiconWhite from "../svg/ReciptIconiconWhite";

interface Tab {
    id: number;
    title: string;
    image: string;
    subtitle: string;
    description: string;
    features: string[];
    activeIcon: React.ReactNode;
    inactiveIcon: React.ReactNode;
}

const tabs: Tab[] = [
    {
        id: 0,
        title: "Advanced Dashboard",
        image: "/images/chcekingimage.png",
        subtitle: "Advanced insights at your fingertips",
        description:
            "Instant overview of sales, appointments, clients, and staff activity — all in one place.",
        features: [
            "Instant overview of sales, appointments, clients, and staff activity.",
            "Consolidate daily transactions in one place — sales, refunds, and cash entries automatically organized for closing.",
            "Create accurate, structured receipts for every transaction — ready to view, download, or send.",
            "Client growth tracking to monitor demand and retention trends.",
            "Revenue insights with exportable reports.",
            "Appointment performance charts comparing completed vs. canceled visits.",
            "Smart agenda view with full client details and quick actions.",
        ],
        activeIcon: <IDashboard />,
        inactiveIcon: <INIdashboard />,
    },
    {
        id: 1,
        title: "Appointment Manager",
        image: "/images/img2.png",
        subtitle: "All your appointments, organized in one place",
        description:
            "Manage appointments easily and keep clients informed with smart automation.",
        features: [
            "Manage in-person and phone bookings with clear schedules, service details, and staff assignment.",
            "Allow clients to book their own appointments online with real-time availability and instant confirmation.",
            "Send automated reminders before every appointment to reduce no-shows and keep clients informed.",
            "Automate messages across WhatsApp, email, and phone — confirmations, reminders, follow-ups, and rebooking prompts.",
            "Track performance with detailed metrics on revenue, appointments, staff productivity, and service demand.",
        ],
        activeIcon: <ICalander />,
        inactiveIcon: <INICalander />,
    },
    {
        id: 2,
        title: "Client Management",
        image: "/images/img3.png",
        subtitle: "Know every client. Personalize every experience.",
        description:
            "A powerful customer profile system that helps you track every detail and build loyalty.",
        features: [
            "A powerful customer profile that combines all the information you need.",
            "Performance overview showing total spend, appointments, cancellations, and no-shows.",
            "Digital waivers & consent centralized, trackable, and fully integrated into the client journey.",
            "Preferences & behavior insights including preferred staff, top services, and ideal booking times.",
            "Track spending, receipts, and balances with total clarity.",
            "Store every detail that matters — photos, notes, preferences, and files — all neatly organized.",
            "Keep essential health information secure and accessible to ensure safe, personalized services.",
            "Review every message, reminder, and interaction — full transparency with every client touchpoint.",
        ],
        activeIcon: <IClient />,
        inactiveIcon: <INIClient />,
    },
    {
        id: 3,
        title: "Team Management",
        image: "/images/img4.png",
        subtitle: "Empower your team with smart staff management",
        description:
            "Organize schedules, monitor productivity, and control staff performance from one dashboard.",
        features: [
            "Create, adjust, and share staff schedules with ease.",
            "Calculate salaries, commissions, and hourly rates with precision.",
            "Get a clear view of payroll trends, staff performance, and labor costs.",
            "Monitor weekly appointments, productivity, attendance, and workflow efficiency.",
            "Measure output, service volume, and revenue contribution across your staff.",
            "Define clear access levels for stylists, managers, and admins to keep operations secure.",
            "Upload and manage photos, client results, and visual documentation for each team member.",
        ],
        activeIcon: <IUserGroup />,
        inactiveIcon: <IUserGroupDark />,
    },
    {
        id: 4,
        title: "Services Management",
        image: "/images/img5.png",
        subtitle: "Manage every service with total precision",
        description:
            "Control services, categories, pricing, VAT and duration settings — all in one place.",
        features: [
            "Complete service catalog showing every service with category, duration, pricing, and VAT in one clean table.",
            "Smart category filters to instantly sort and organize services by type.",
            "Get a clear view of payroll trends, staff performance, and labor costs.",
            "Add new services instantly with a single click for quick expansion.",
            "Clear duration & post-break settings to optimize scheduling and prevent overbooking.",
        ],
        activeIcon: <IBookOpen />,
        inactiveIcon: <IBookOpenDark />,
    },
    {
        id: 5,
        title: "Inventory",
        image: "/images/img6.png",
        subtitle: "Stay stocked, stay profitable",
        description:
            "Track stock in real time, avoid shortages, and reduce waste with smart inventory control.",
        features: [
            "Real-time tracking of back-bar and retail items.",
            "Automatic low-stock alerts to prevent service interruptions.",
            "Smart purchase insights to avoid overspending and product waste.",
        ],
        activeIcon: <IGlobeNetwork />,
        inactiveIcon: <IGlobeNetworkDark />,
    },
    {
        id: 6,
        title: "Financial Reporting",
        image: "/images/finace.png",
        subtitle: "Smart financial tools to keep every transaction under control",
        description:
            "Access full payment details, generate receipts, and keep financial records organized and unified.",
        features: [
            "Access full payment details, including client info, staff member, method used, and transaction timeline.",
            "Generate, monitor, and manage receipt issuance with real-time status updates.",
            "Import receipts from other systems to keep financial data unified and consistent.",
            "Set up automated delivery of digital receipts via email, WhatsApp, or text message — ensuring clients receive confirmations instantly without manual work.",
            "Create, customize, and track gift cards with unique codes, balance monitoring, expiration rules, and usage history — all integrated directly into the payment workflow.",
        ],
        activeIcon: <IInfoCircleWhite />,
        inactiveIcon: <IInfoCircle />,
    },
    {
        id: 7,
        title: "Budgeting Management",
        image: "/images/budgetmanagemtn.png",
        subtitle:
            "Take full control of your budget — Clear insights, smarter decisions",
        description:
            "Track salon expenses, receive alerts, and generate complete reports with structured budgeting tools.",
        features: [
            "Easily manage all your salon’s expenses in one place, keeping every cost organized, categorized, and under control.",
            "Create fully personalized financial categories and macro-categories to organize your salon’s expenses exactly the way you work.",
            "Receive instant alerts when you’re close to exceeding your planned budget and stay fully in control.",
            "Never miss a due date — see all upcoming payments and important deadlines in one place.",
            "Generate complete financial reports to track your salon’s performance and growth.",
            "Track and manage expenses by payment method and understand where each transaction comes from.",
            "Access smart financial analytics with spending trends and detailed breakdowns by macro-categories, categories, and suppliers — all in one place.",
        ],
        activeIcon: <IWalletIcon />,
        inactiveIcon: <IWalletIconDark />,
    },
    {
        id: 8,
        title: "Checkout & Receipts",
        image: "/images/img9.png",
        subtitle: "A faster, frictionless way to get paid",
        description:
            "Create receipts instantly, add services/products quickly, and sync payments with reports.",
        features: [
            "Create polished digital receipts instantly.",
            "Add services, tips, and products in seconds.",
            "Sync every sale with your reports and budgeting dashboard.",
        ],
        activeIcon: <ReciptIconiconWhite />,
        inactiveIcon: <Recipticon />,
    },
    {
        id: 9,
        title: "Social Media",
        image: "/images/img10.png",
        subtitle: "Boost your salon’s online presence",
        description:
            "Plan posts, track analytics, and manage content assets in one platform.",
        features: [
            "Schedule your salon’s posts in advance and keep your social media active without the daily hustle.",
            "Track detailed performance metrics to understand what’s working and grow your salon’s online engagement.",
            "Store and organize all your photos, videos, and creative assets in one place to post faster and easier.",
        ],
        activeIcon: <ConcentricIconWhite />,
        inactiveIcon: <ConcentricIcon />,
    },
    {
        id: 10,
        title: "Waivers & Files",
        image: "/images/img11.png",
        subtitle: "Paperwork done — securely, digitally, instantly.",
        description:
            "Collect signatures, store files safely, and access everything anytime.",
        features: [
            "Collect signatures and consent forms online.",
            "Store files in one secure place.",
            "Access anytime, from any device, without digging through folders.",
        ],
        activeIcon: <IfileIconwhite />,
        inactiveIcon: <IFileICon />,
    },
    {
        id: 11,
        title: "Roles Management",
        image: "/images/img12.png",
        subtitle: "Manage access with confidence",
        description:
            "Control staff permissions with precision and keep your salon data protected.",
        features: [
            "Create custom roles and define exactly what each team member can access inside your system.",
            "Manage permissions with precision to keep financial, client, and operational data secure.",
            "Control access levels across your entire platform with flexible, salon-friendly permission settings.",
        ],
        activeIcon: <IRoleicon />,
        inactiveIcon: <IRoleDark />,
    },
];


export default function PromotionSection() {
    const [active, setActive] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-out",
            once: false,
        });
    }, []);

    useEffect(() => {
        AOS.refresh();
    }, [active]);

    const scroll = (direction: "left" | "right") => {
        if (!swiperRef.current) return;

        if (direction === "left") swiperRef.current.slidePrev();
        else swiperRef.current.slideNext();
    };

    const handleTabClick = (index: number) => {
        setActive(index);

        if (swiperRef.current) {
            swiperRef.current.slideTo(index);
        }
    };

    const activeTab = tabs[active];

    return (
        <section className="w-full md:py-20 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div data-aos="fade-up" className="text-center mx-auto">
                    <h2 className="text-3xl md:text-[44px] font-manrope leading-12 text-[#29343D] font-bold">
                        Complete Salon Management <br />
                        <span className="text-[#635BFF]">All in One Place</span>
                    </h2>
                    <p className="text-[#526B7A] font-manrope font-normal mt-4 text-sm md:text-[16px] max-w-[616px] mx-auto">
                        Simplify daily operations, delight clients, and grow your business
                        with tools designed exclusively for beauty professionals.
                    </p>
                </div>

                {/* Tabs Slider */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="150"
                    className="relative mt-[17px] px-0 sm:px-12 lg:px-0 flex items-center group"
                >
                    <button
                        onClick={() => scroll("left")}
                        className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-[#EEF3F9] border border-gray-200 z-20 cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 shadow-md"
                        aria-label="Scroll Left"
                    >
                        <ChevronLeft size={30} color="#635BFF" />
                    </button>

                    {/* Tabs Container */}
                    <div className="w-full lg:px-12 px-0">
                        <Swiper
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                            spaceBetween={16}
                            slidesPerView={5}
                            breakpoints={{
                                0: { slidesPerView: 2 },
                                400: { slidesPerView: 2 },
                                480: { slidesPerView: 2 },
                                640: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                900: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                                1260: { slidesPerView: 5 },
                            }}
                            className="py-2"
                        >
                            {tabs.map((tab, index) => (
                                <SwiperSlide key={tab.id}>
                                    <div className="py-8">
                                        <button
                                            onClick={() => handleTabClick(index)}
                                            className={`w-full
                                                    px-3 py-4 flex items-center shrink-0 gap-2
                                                    text-[13px] sm:text-[14px] md:text-[14px]
                                                    leading-tight text-start
                                                    rounded-xl font-semibold transition-all duration-300
                                                    shadow-[0_24px_24px_-12px_rgba(0,0,0,0.05)]
                                                    cursor-pointer font-manrope 
                                                    ${active === index
                                                    ? "bg-[#635BFF] text-white"
                                                    : "bg-white text-[#29343D] hover:bg-gray-50"
                                                }`}
                                        >
                                            <span>{active === index ? tab.activeIcon : tab.inactiveIcon}</span>
                                            <span>{tab.title}</span>
                                        </button>
                                    </div>
                                </SwiperSlide>

                            ))}
                        </Swiper>
                    </div>

                    <button
                        onClick={() => scroll("right")}
                        className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-[#EEF3F9] border border-gray-200 z-20 cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 shadow-md"
                        aria-label="Scroll Right"
                    >
                        <ChevronRight size={30} color="#635BFF" />
                    </button>
                </div>
                {/* Main Content */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Preview */}
                    <div
                        key={activeTab.image}
                        data-aos="fade-up"
                        className="relative w-full h-[320px] md:h-[420px] lg:h-[700px] lg:transform scale-110 rounded-2xl flex items-center justify-center"
                    >
                        <Image
                            src={activeTab.image}
                            alt={activeTab.title}
                            fill
                            quality={100}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Right Content */}
                    <div key={activeTab.title} data-aos="fade-up" data-aos-delay="150">
                        <h3 className="text-2xl md:text-[40px] font-manrope leading-[120%] font-bold text-[#29343D] mb-6">
                            {activeTab.subtitle}
                        </h3>

                        <ul className="space-y-6">
                            {activeTab.features.map((item, i) => (
                                <li
                                    key={i}
                                    data-aos="fade-up"
                                    data-aos-delay={200 + i * 80}
                                    className="flex items-start gap-4"
                                >
                                    <div className="mt-1">
                                        <Image
                                            src="/images/tick_icon.png"
                                            alt="check icon"
                                            width={24}
                                            height={24}
                                            className="shrink-0"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[#29343D] font-semibold font-manrope text-sm md:text-[16px]">
                                            {item}
                                        </p>
                                        <hr className="mt-5 border-[#E0E6EB]" />
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <button
                            data-aos="fade-up"
                            data-aos-delay="250"
                            className="mt-6 bg-[#635BFF] text-[14px] font-manrope text-white px-4 py-2.5 rounded-[10px] font-medium cursor-pointer hover:bg-[#4B4ECA] transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                        >
                            Explore Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
















