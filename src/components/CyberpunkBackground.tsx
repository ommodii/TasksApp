import { useEffect, useRef } from 'react';

const CyberpunkBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let offset = 0;
        const speed = 0.5;

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        const animate = () => {
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, width, height);
            const horizonY = height * 0.4;


            ctx.strokeStyle = 'rgba(0, 255, 128, 0.3)';
            ctx.lineWidth = 1;

            const floorTop = horizonY;

            const gradient = ctx.createLinearGradient(0, floorTop, 0, height);
            gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
            gradient.addColorStop(0.2, 'rgba(0, 255, 128, 0.1)');
            gradient.addColorStop(1, 'rgba(0, 255, 128, 0.5)');

            const cx = width / 2;
            const cy = horizonY;

            ctx.save();
            ctx.beginPath();
            ctx.rect(0, floorTop, width, height - floorTop);
            ctx.clip();

            const numVLines = 40;
            for (let i = -numVLines; i <= numVLines; i++) {
                ctx.strokeStyle = 'rgba(0, 255, 128, 0.15)';
                ctx.beginPath();
                ctx.moveTo(cx, cy);

                const bottomX = cx + (i * 100);
                ctx.lineTo(bottomX, height);
                ctx.stroke();
            }

            offset = (offset + speed) % 20;

            for (let z = 10; z < 200; z += 10) {
                let currentZ = z - offset;
                if (currentZ < 1) currentZ += 200;
            }

            const time = Date.now() / 1000;
            const moveOffset = (time * 0.2) % 1;

            for (let i = 0; i < 20; i++) {
                const progress = (i + moveOffset) / 10;
                if (progress > 1) continue;

                const p = Math.pow(progress, 3);

                const y = cy + (height - cy) * p;

                const alpha = p * 0.5;

                ctx.strokeStyle = `rgba(0, 255, 128, ${alpha})`;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            ctx.restore();

            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 w-full h-full pointer-events-none"
        />
    );
};

export default CyberpunkBackground;
