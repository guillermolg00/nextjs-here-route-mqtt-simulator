"use client";
import React, { useEffect, useRef } from "react";
import H from "@here/maps-api-for-javascript";
import HType from "@here/maps-api-for-javascript";
import { useHereService } from "app/layouts/HereServiceContext";
import Script from "next/script";

const HereMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<HType.Map>();
  const platform = useRef<HType.service.Platform>();
  const here = useHereService();

  useEffect(() => {
    const initMap = async () => {
      if (typeof window === "undefined") return;

      if (!map.current && mapRef.current) {
        platform.current = new H.service.Platform({ apikey: here.apikey });

        const defaultLayers = platform.current?.createDefaultLayers() as {
          vector: { normal: { map: H.map.layer.TileLayer } };
        };

        const newMap = new H.Map(
          mapRef.current,
          defaultLayers.vector.normal.map,
          {
            zoom: 10,
            center: { lat: 52.5, lng: 13.4 },
          }
        );

        new H.mapevents.Behavior(new H.mapevents.MapEvents(newMap));
        H.ui.UI.createDefault(newMap, defaultLayers);
        map.current = newMap;
      }
    };
    initMap();
  }, [here, mapRef]);

  return <div ref={mapRef} className="w-full h-[500px] border rounded-lg" />;
};

export default HereMap;
