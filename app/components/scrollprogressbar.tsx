'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgressBar() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleCircleClick = (index: number) => {
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const targetScroll = (index / 20) * totalHeight;
        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    };

    const circles = Array.from({ length: 20 }, (_, i) => {
        const sectionSize = 100 / 20;
        const sectionStart = i * sectionSize;
        const sectionEnd = (i + 1) * sectionSize;
        const isActive = scrollProgress >= sectionStart && scrollProgress < sectionEnd;
        const isLast = i === 19 && scrollProgress >= sectionStart;
        return { id: i, isActive: isActive || isLast };
    });

    return (
        <div className="fixed top-0 left-0 h-full z-50 flex items-center">
            <div className="bg-white px-2 py-4 h-full flex items-center">
                <div className="flex flex-col justify-center items-center gap-3 h-full max-h-screen py-8">
                    {circles.map((circle) => (
                        <button
                            key={circle.id}
                            onClick={() => handleCircleClick(circle.id)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${
                                circle.isActive
                                    ? 'bg-[#B3A369] scale-110'
                                    : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Navigate to section ${circle.id + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}