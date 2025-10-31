'use client';
import React from 'react';

type HexProps = {
    front: string;
    back?: string;
    size?: number;
    className?: string;
};

export default function Hex({
    front,
    back = '',
    size = 160,
    className = '',
}: HexProps) {
    const [flipped, setFlipped] = React.useState(false);

    const toggle = () => setFlipped((s) => !s);
    const onKey = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
        }
    };

    const width = size;
    const height = Math.round(size * 1.15);

    const containerStyle: React.CSSProperties = {
        perspective: '900px',
        width,
        height,
    };

    const innerStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        position: 'relative',
        transition: 'transform 600ms',
        transformStyle: 'preserve-3d',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        cursor: 'pointer',
    };

    const faceStyle: React.CSSProperties = {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        padding: 12,
        boxSizing: 'border-box',
        color: 'white',
        fontWeight: 600,
        textAlign: 'center',
    };

    const frontStyle: React.CSSProperties = {
        ...faceStyle,
        background: '#B3A369', // Georgia Tech gold
    };

    const backStyle: React.CSSProperties = {
        ...faceStyle,
        background: '#003057', // Georgia Tech navy
        transform: 'rotateY(180deg)',
        fontWeight: 500,
        fontSize: Math.max(12, Math.round(size * 0.12)),
    };

    return (
        <div style={containerStyle} className={className}>
            <div
                role="button"
                tabIndex={0}
                aria-pressed={flipped}
                onClick={toggle}
                onKeyDown={onKey}
                style={innerStyle}
            >
                <div style={frontStyle}>
                    <span style={{ fontSize: Math.max(14, Math.round(size * 0.14)) }}>
                        {front}
                    </span>
                </div>

                <div style={backStyle}>
                    <span>{back}</span>
                </div>
            </div>
        </div>
    );
}
