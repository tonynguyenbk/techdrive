"use client";

import { useState, useEffect } from "react";
import { X, Phone, Clock, Navigation, MapPin, ChevronDown, ExternalLink } from "lucide-react";
import { dealers, BRAND_COLORS, BRAND_LABELS, CITIES, type Dealer } from "@/data/dealers";

// ── Leaflet loaded dynamically (SSR-safe) ────────────────────────────────────

let L: typeof import("leaflet") | null = null;

function createDivIcon(color: string, selected: boolean) {
  if (!L) return undefined;
  const size = selected ? 18 : 12;
  return L.divIcon({
    className: "",
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,.4);transition:all .15s"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

// ── Dealer Info Panel (slide-in right) ───────────────────────────────────────

function DealerPanel({
  dealer,
  onClose,
}: {
  dealer: Dealer;
  onClose: () => void;
}) {
  const color = BRAND_COLORS[dealer.brand] ?? "#666";
  const query = encodeURIComponent(dealer.name + ", " + dealer.address);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
  const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
  const svUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <div className="absolute top-0 right-0 h-full w-72 bg-surface-card border-l border-surface-border shadow-xl z-[1000] flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between p-4 border-b border-surface-border">
        <div className="flex-1 min-w-0">
          <span
            className="inline-block px-2 py-0.5 rounded text-[10px] font-bold text-white mb-1"
            style={{ backgroundColor: color }}
          >
            {BRAND_LABELS[dealer.brand] ?? dealer.brand}
          </span>
          <p className="font-bold text-sm text-text-primary leading-tight">{dealer.name}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-surface-hover text-text-muted hover:text-text-primary transition-colors ml-2 shrink-0"
        >
          <X size={16} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        <div className="flex gap-2 text-sm text-text-secondary">
          <MapPin size={14} className="mt-0.5 shrink-0 text-text-muted" />
          <span className="text-xs leading-relaxed">{dealer.address}</span>
        </div>
        <div className="flex gap-2 text-sm text-text-secondary">
          <Phone size={14} className="mt-0.5 shrink-0 text-text-muted" />
          <a href={`tel:${dealer.phone}`} className="text-xs hover:text-brand-red transition-colors">
            {dealer.phone}
          </a>
        </div>
        <div className="flex gap-2 text-sm text-text-secondary">
          <Clock size={14} className="mt-0.5 shrink-0 text-text-muted" />
          <span className="text-xs">{dealer.hours}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-surface-border space-y-2">
        <a
          href={dirUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-brand-red text-white text-sm font-medium hover:bg-brand-red/90 transition-colors"
        >
          <Navigation size={14} />
          Chỉ đường
        </a>
        <a
          href={svUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-surface-border text-text-secondary text-sm hover:bg-surface-hover transition-colors"
        >
          <ExternalLink size={14} />
          Xem Street View
        </a>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-surface-border text-text-secondary text-sm hover:bg-surface-hover transition-colors"
        >
          <MapPin size={14} />
          Xem trên Google Maps
        </a>
      </div>
    </div>
  );
}

// ── Sidebar ──────────────────────────────────────────────────────────────────

function DealerSidebar({
  filteredDealers,
  selectedId,
  filterBrand,
  filterCity,
  onSelectBrand,
  onSelectCity,
  onSelectDealer,
}: {
  filteredDealers: Dealer[];
  selectedId: string | null;
  filterBrand: string;
  filterCity: string;
  onSelectBrand: (b: string) => void;
  onSelectCity: (c: string) => void;
  onSelectDealer: (d: Dealer) => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-surface-border space-y-2">
        <div className="relative">
          <select
            value={filterBrand}
            onChange={(e) => onSelectBrand(e.target.value)}
            className="w-full text-sm bg-surface-hover border border-surface-border rounded-lg px-3 py-2 pr-8 text-text-primary appearance-none focus:outline-none focus:ring-2 focus:ring-brand-red/30"
          >
            <option value="">Tất cả hãng xe</option>
            {Object.keys(BRAND_LABELS).map((b) => (
              <option key={b} value={b}>{BRAND_LABELS[b]}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={filterCity}
            onChange={(e) => onSelectCity(e.target.value)}
            className="w-full text-sm bg-surface-hover border border-surface-border rounded-lg px-3 py-2 pr-8 text-text-primary appearance-none focus:outline-none focus:ring-2 focus:ring-brand-red/30"
          >
            <option value="">Tất cả tỉnh thành</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        </div>
        <p className="text-xs text-text-muted">{filteredDealers.length} đại lý</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredDealers.map((d) => {
          const color = BRAND_COLORS[d.brand] ?? "#666";
          const active = d.id === selectedId;
          return (
            <button
              key={d.id}
              onClick={() => onSelectDealer(d)}
              className={`w-full text-left px-3 py-3 border-b border-surface-border transition-colors hover:bg-surface-hover ${active ? "bg-surface-hover" : ""}`}
            >
              <div className="flex items-start gap-2">
                <div className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: color }} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text-primary truncate">{d.name}</p>
                  <p className="text-xs text-text-muted truncate">{d.address}</p>
                  <p className="text-xs text-text-muted mt-0.5">{d.phone}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

const MAP_HEIGHT = "calc(100vh - 64px)";
const VIETNAM_CENTER: [number, number] = [16.4, 107.5];
const VIETNAM_ZOOM = 6;

export function DealerMap() {
  const [mounted, setMounted] = useState(false);
  const [MapContainer, setMapContainer] = useState<any>(null);
  const [TileLayer, setTileLayer] = useState<any>(null);
  const [Marker, setMarker] = useState<any>(null);

  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [filterBrand, setFilterBrand] = useState("");
  const [filterCity, setFilterCity] = useState("");

  useEffect(() => {
    // Dynamically import Leaflet only on client
    Promise.all([
      import("leaflet"),
      import("react-leaflet"),
    ]).then(([leaflet, rl]) => {
      L = leaflet.default ?? leaflet as any;
      // Fix default marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      setMapContainer(() => rl.MapContainer);
      setTileLayer(() => rl.TileLayer);
      setMarker(() => rl.Marker);

      setMounted(true);
    });
    // Inject Leaflet CSS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
  }, []);

  const filteredDealers = dealers.filter((d) => {
    if (filterBrand && d.brand !== filterBrand) return false;
    if (filterCity && d.city !== filterCity) return false;
    return true;
  });

  return (
    <div className="flex" style={{ height: MAP_HEIGHT }}>
      {/* Sidebar */}
      <div className="w-64 shrink-0 border-r border-surface-border bg-surface-card hidden md:flex flex-col">
        <div className="px-3 py-3 border-b border-surface-border">
          <h2 className="text-sm font-bold text-text-primary">Hệ thống đại lý</h2>
        </div>
        <DealerSidebar
          filteredDealers={filteredDealers}
          selectedId={selectedDealer?.id ?? null}
          filterBrand={filterBrand}
          filterCity={filterCity}
          onSelectBrand={setFilterBrand}
          onSelectCity={setFilterCity}
          onSelectDealer={(d) => setSelectedDealer((prev) => prev?.id === d.id ? null : d)}
        />
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        {/* Mobile filters */}
        <div className="md:hidden absolute top-2 left-2 right-2 z-[1000] flex gap-2">
          <div className="relative flex-1">
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="w-full text-xs bg-white/95 backdrop-blur border border-gray-200 rounded-lg px-2.5 py-2 pr-6 appearance-none shadow-sm focus:outline-none"
            >
              <option value="">Tất cả hãng</option>
              {Object.keys(BRAND_LABELS).map((b) => (
                <option key={b} value={b}>{BRAND_LABELS[b]}</option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative flex-1">
            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="w-full text-xs bg-white/95 backdrop-blur border border-gray-200 rounded-lg px-2.5 py-2 pr-6 appearance-none shadow-sm focus:outline-none"
            >
              <option value="">Tất cả tỉnh</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {!mounted || !MapContainer ? (
          <div className="w-full h-full flex items-center justify-center bg-surface-hover">
            <p className="text-sm text-text-muted">Đang tải bản đồ...</p>
          </div>
        ) : (
          <MapContainer
            center={VIETNAM_CENTER}
            zoom={VIETNAM_ZOOM}
            style={{ width: "100%", height: "100%" }}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredDealers.map((d) => {
              const color = BRAND_COLORS[d.brand] ?? "#666";
              const selected = selectedDealer?.id === d.id;
              const icon = createDivIcon(color, selected);
              return (
                <Marker
                  key={d.id}
                  position={[d.lat, d.lng]}
                  icon={icon}
                  eventHandlers={{
                    click: () => setSelectedDealer((prev) => prev?.id === d.id ? null : d),
                  }}
                />
              );
            })}
          </MapContainer>
        )}

        {/* Dealer info panel */}
        {selectedDealer && (
          <DealerPanel
            dealer={selectedDealer}
            onClose={() => setSelectedDealer(null)}
          />
        )}

        {/* Legend */}
        <div className="absolute bottom-6 left-2 bg-surface-card/95 backdrop-blur border border-surface-border rounded-xl shadow-md p-3 hidden md:block z-[999]">
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-wide mb-2">Hãng xe</p>
          <div className="space-y-1">
            {Object.entries(BRAND_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilterBrand(filterBrand === key ? "" : key)}
                className={`flex items-center gap-2 w-full text-left rounded px-1 py-0.5 transition-colors ${filterBrand === key ? "bg-surface-hover" : "hover:bg-surface-hover/50"}`}
              >
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: BRAND_COLORS[key] }} />
                <span className="text-xs text-text-secondary">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
