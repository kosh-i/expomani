import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { DESTINATIONS, BUFFER_ZONES } from '../data/mockData';
import { MapPin, Calendar, Compass, Info, CheckCircle2, XCircle, ArrowLeft, AlertTriangle } from 'lucide-react';
import WeatherWidget from '../components/common/WeatherWidget';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function DestinationExplorerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const destIdParam = searchParams.get('id');

  const [selectedDest, setSelectedDest] = useState(
    DESTINATIONS.find((d) => d.id === destIdParam) || DESTINATIONS[0]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16 pt-4 text-left">
      {/* Page Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          <span>Interactive Heritage & Culture Map</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">Manipur Destinations Explorer</h1>
        <p className="text-xs text-slate-600 max-w-2xl font-medium">
          Click any pin on the map below to discover royal history, ecological marvels, local homestays, and cultural etiquette.
        </p>
      </div>

      {/* MAP & DESTINATION SIDE SHEET GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* INTERACTIVE LEAFLET MAP */}
        <div className="lg:col-span-2 h-[580px] rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md relative">
          <MapContainer center={[24.7500, 93.9000]} zoom={9} className="w-full h-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {DESTINATIONS.map((dest) => (
              <Marker
                key={dest.id}
                position={[dest.lat, dest.lng]}
                eventHandlers={{
                  click: () => {
                    setSelectedDest(dest);
                    setSearchParams({ id: dest.id });
                  },
                }}
              >
                <Popup>
                  <div className="p-1 text-slate-900 space-y-1">
                    <h4 className="font-bold text-xs">{dest.name}</h4>
                    <p className="text-[10px] text-slate-600 line-clamp-1">{dest.tagline}</p>
                    <button
                      onClick={() => setSelectedDest(dest)}
                      className="w-full py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold mt-1"
                    >
                      View Heritage Info
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Buffer Zones (Avoidance Areas) */}
            {BUFFER_ZONES.map((zone) => (
              <Circle
                key={zone.id}
                center={[zone.lat, zone.lng]}
                radius={zone.radius}
                pathOptions={{ color: zone.color, fillColor: zone.color, fillOpacity: 0.2 }}
              >
                <Popup>
                  <div className="p-1 text-slate-900 space-y-1">
                    <div className="flex items-center gap-1 text-red-600">
                      <AlertTriangle className="w-4 h-4" />
                      <h4 className="font-bold text-xs">Avoid: {zone.name}</h4>
                    </div>
                    <p className="text-[10px] text-slate-600 font-medium leading-relaxed">{zone.desc}</p>
                    <div className="mt-1 text-[9px] uppercase font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100 inline-block">
                      Restricted Buffer Zone
                    </div>
                  </div>
                </Popup>
              </Circle>
            ))}
          </MapContainer>
        </div>

        {/* DESTINATION DETAIL CARD / PANEL */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 text-left space-y-6 h-[580px] overflow-y-auto custom-scrollbar shadow-sm">
          {/* Header */}
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
              {selectedDest.category}
            </span>
            <h2 className="text-2xl font-bold text-slate-900">{selectedDest.name}</h2>
            <p className="text-xs text-emerald-700 font-bold">{selectedDest.tagline}</p>
          </div>

          <img
            src={selectedDest.image}
            alt={selectedDest.name}
            className="w-full h-40 object-cover rounded-2xl border border-slate-200"
          />

          <WeatherWidget lat={selectedDest.lat} lng={selectedDest.lng} />

          {/* Overview & History */}
          <div className="space-y-3 text-xs text-slate-600 font-medium">
            <div>
              <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-1">About Destination</h4>
              <p className="leading-relaxed">{selectedDest.description}</p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-1">Historical Significance</h4>
              <p className="leading-relaxed text-slate-600">{selectedDest.history}</p>
            </div>
          </div>

          {/* How to Reach & Best Time */}
          <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <div>
              <span className="text-emerald-700 font-bold block text-[10px] uppercase">Best Season to Visit</span>
              <span className="text-slate-800 font-semibold">{selectedDest.bestTime}</span>
            </div>
            <div className="pt-2 border-t border-slate-200">
              <span className="text-emerald-700 font-bold block text-[10px] uppercase">How to Reach</span>
              <span className="text-slate-700 font-medium">{selectedDest.howToReach}</span>
            </div>
          </div>

          {/* Key Attractions */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">Key Heritage Attractions</h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedDest.keyAttractions.map((att, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-semibold">
                  {att}
                </span>
              ))}
            </div>
          </div>

          {/* Do's & Don'ts */}
          <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">Cultural Do's & Don'ts</h4>
            <ul className="space-y-1 text-slate-700 text-[11px] font-medium">
              {selectedDest.dosAndDonts.dos.map((d, i) => (
                <li key={i} className="flex items-start gap-1 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-600" />
                  <span>{d}</span>
                </li>
              ))}
              {selectedDest.dosAndDonts.donts.map((d, i) => (
                <li key={i} className="flex items-start gap-1 text-rose-800">
                  <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-600" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
