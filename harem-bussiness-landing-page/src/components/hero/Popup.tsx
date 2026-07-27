import { X } from 'lucide-react'
import React from 'react'

export default function Popup({ openVideo, setOpenVideo }: { openVideo: boolean, setOpenVideo: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <>
            {openVideo && (
                <div
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4"
                    onClick={() => setOpenVideo(false)}
                >
                    <div
                        className="relative w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setOpenVideo(false)}
                            className="absolute top-3 right-3 z-20 bg-white rounded-full p-2 shadow-md hover:scale-105 transition cursor-pointer"
                        >
                            <X size={20} className="text-black" />
                        </button>

                        {/* Responsive YouTube Player */}
                        <div className="relative w-full aspect-video">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
                                title="YouTube video player"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
