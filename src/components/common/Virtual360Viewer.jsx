import React, { useRef, useEffect, useState } from 'react';
import { Compass, Eye, Maximize2, RotateCcw, Info } from 'lucide-react';

export default function Virtual360Viewer({ imageSrc, title, hotspots = [] }) {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Default sample hotspots if none provided
  const defaultHotspots = hotspots.length > 0 ? hotspots : [
    { x: 25, y: 45, title: "Phumdi Floating Island", desc: "A naturally occurring circular ring of vegetation and soil floating on Loktak Lake." },
    { x: 60, y: 35, title: "Sangai Deer Habitat", desc: "Keibul Lamjao National Park — home to the endangered Manipur brow-antlered deer." },
    { x: 80, y: 55, title: "Fishermen's Canoe Huts", desc: "Traditional wooden canoes used by Karang island fisher families." }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80";

    img.onload = () => {
      setImgLoaded(true);
      drawCanvas(ctx, img, offset.x);
    };

    const handleResize = () => {
      if (canvas) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = 420;
        if (imgLoaded) drawCanvas(ctx, img, offset.x);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imageSrc, offset, imgLoaded]);

  const drawCanvas = (ctx, img, panX) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Continuous 360 wrap around drawing calculation
    const sourceWidth = img.width;
    const sourceHeight = img.height;
    const scale = canvas.height / sourceHeight;
    const scaledWidth = sourceWidth * scale;

    let drawX = (panX % scaledWidth);
    if (drawX > 0) drawX -= scaledWidth;

    ctx.drawImage(img, drawX, 0, scaledWidth, canvas.height);
    if (drawX + scaledWidth < canvas.width) {
      ctx.drawImage(img, drawX + scaledWidth, 0, scaledWidth, canvas.height);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startPos.x;
    setOffset(prev => ({ ...prev, x: prev.x + dx }));
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="relative rounded-2xl overflow-hidden glass-panel border border-emerald-500/30 shadow-2xl">
      {/* 360 Control Header */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/40 text-emerald-300 text-xs font-semibold pointer-events-auto">
          <Eye className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>360° Interactive Virtual Preview</span>
        </div>
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setOffset({ x: 0, y: 0 })}
            className="p-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs flex items-center gap-1"
            title="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Drag-to-Pan Canvas */}
      <div
        className="relative cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <canvas ref={canvasRef} className="w-full h-[420px] block rounded-2xl" />

        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90 text-slate-400 text-xs gap-2">
            <Compass className="w-5 h-5 text-emerald-400 animate-spin" />
            <span>Rendering 360° High-Res Panoramic Stream...</span>
          </div>
        )}

        {/* Hotspots Overlay */}
        {imgLoaded && defaultHotspots.map((spot, idx) => (
          <button
            key={idx}
            onClick={() => setActiveHotspot(spot)}
            style={{ top: `${spot.y}%`, left: `${(spot.x + (offset.x / 10)) % 100}%` }}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-emerald-500/80 hover:bg-emerald-400 text-white shadow-lg border-2 border-white animate-bounce transition-transform hover:scale-125"
            title={spot.title}
          >
            <Info className="w-4 h-4" />
          </button>
        ))}

        {/* Drag Hint overlay text */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-slate-950/80 border border-slate-800 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-slate-300 flex items-center gap-1.5 pointer-events-none">
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <span>Click & Drag to Pan 360° Horizon</span>
        </div>
      </div>

      {/* Active Hotspot Modal / Drawer */}
      {activeHotspot && (
        <div className="absolute bottom-12 left-4 right-4 z-30 p-4 rounded-xl bg-slate-900/95 border border-emerald-500/40 text-slate-100 backdrop-blur-lg flex items-start justify-between shadow-2xl animate-fade-in">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Info className="w-4 h-4" />
              <span>{activeHotspot.title}</span>
            </div>
            <p className="text-xs text-slate-300">{activeHotspot.desc}</p>
          </div>
          <button
            onClick={() => setActiveHotspot(null)}
            className="text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded-lg ml-3"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
