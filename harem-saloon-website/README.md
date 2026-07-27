# Harem Salon – Customer Portal

The customer-facing web application for the **Harem Multi-Tenant Salon Management** platform. This Next.js application serves as the primary touchpoint for salon clients, allowing them to discover services, book appointments, and purchase gift vouchers in a highly polished, responsive interface.

## Key Features

### Advanced Booking System
- **Solo & Group Appointments**: Seamless flow for individual bookings or managing multiple participants.
- **Participant Management**: Dynamically add group members and configure their services on the fly.
- **Real-Time Summaries**: Sidebar order summary automatically calculates totals, taxes, and discounts based on selected services.
- **Interactive Step Navigation**: Fully clickable progress indicator to jump backwards and review earlier steps.

### Gift Vouchers
- **Dedicated Flow**: A tailored checkout journey specifically for buying gift cards.
- **Recipient Delivery**: Options for self-use, print-at-home, or direct email delivery.
- **Optimized Assets**: High-fidelity, WebP/AVIF optimized gift card visuals for maximum quality and zero layout shift.

### Payment & Checkout
- **Flexible Options**: Pay in-salon or pre-pay online.
- **Dynamic Payment UI**: Contextual sub-menus for Credit Card, Apple Pay, Google Pay, and Bank Transfers.
- **Polished Success Modals**: Beautifully animated confirmation modals with options to print receipts or email them.

### Design & Experience
- **Premium Aesthetics**: Built with Tailwind CSS 4, utilizing the `Manrope` font and a sleek `#635BFF` primary color scheme.
- **Micro-interactions**: Subtle hover states, smooth Framer Motion page transitions, and AOS scroll animations.
- **Responsive Architecture**: Mobile-first design utilizing native `<select>` inputs on small screens and custom dropdowns on desktop.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide-dev.github.io/lucide-react/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [AOS](https://michalsnik.github.io/aos/)
- **Language**: TypeScript


## Project Context

This repository (`harem-saloon-website`) represents the **Customer Frontend**. 
The salon owner and business dashboard components have been decoupled to ensure this application remains lightweight, fast, and completely focused on the end-client experience.
