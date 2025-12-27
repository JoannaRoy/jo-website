import type React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Line,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const LAND_FILL = "rgba(148, 163, 184, 0.22)";

type RsmGeography = { rsmKey: string } & Record<string, unknown>;

export type MapCoordinates = [number, number];

const midpoint = (a: MapCoordinates, b: MapCoordinates): MapCoordinates => [
  (a[0] + b[0]) / 2,
  (a[1] + b[1]) / 2,
];

function geographyName(geo: RsmGeography): string {
  const props = (geo as { properties?: Record<string, unknown> }).properties;
  return typeof props?.name === "string" ? props.name : "";
}

export const MovingMap: React.FC<{
  className?: string;
  from: MapCoordinates;
  to: MapCoordinates;
  fromLabel?: string;
  toLabel?: string;
}> = ({ className, from, to, fromLabel, toLabel }) => {
  const center = midpoint(from, to);

  return (
    <div className={className}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 165,
        }}
        className="w-full h-full"
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="#111827" />
          </marker>
        </defs>

        <ZoomableGroup
          center={[center[0] + 5, center[1] + 5]}
          zoom={2.8}
          minZoom={1}
          maxZoom={90}
          translateExtent={[
            [-500, -260],
            [980, 620],
          ]}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: RsmGeography[] }) =>
              geographies.map((geo: RsmGeography) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={
                    geographyName(geo) === "Canada"
                      ? "rgba(220,38,38,0.20)"
                      : geographyName(geo) === "Germany"
                        ? "rgba(245,158,11,0.20)"
                        : LAND_FILL
                  }
                  stroke="rgba(15,23,42,0.18)"
                  strokeWidth={0.5}
                />
              ))
            }
          </Geographies>

          <Line
            from={from}
            to={to}
            stroke="#111827"
            strokeWidth={1.5}
            strokeLinecap="round"
            markerEnd="url(#arrowhead)"
          />

          <Marker coordinates={from}>
            <circle r={5} fill="#DC2626" stroke="#111827" strokeWidth={1} />
            {fromLabel ? (
              <text
                textAnchor="middle"
                x={8}
                y={18}
                className="fill-gray-900"
                style={{ fontSize: 11, fontWeight: 600 }}
              >
                {fromLabel}
              </text>
            ) : null}
          </Marker>

          <Marker coordinates={to}>
            <circle r={5} fill="#F59E0B" stroke="#111827" strokeWidth={1} />
            {toLabel ? (
              <text
                textAnchor="middle"
                x={8}
                y={18}
                className="fill-gray-900"
                style={{ fontSize: 11, fontWeight: 600 }}
              >
                {toLabel}
              </text>
            ) : null}
          </Marker>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};
