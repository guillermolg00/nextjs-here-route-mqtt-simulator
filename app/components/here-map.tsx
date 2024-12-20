"use client";
import React, { useEffect, useRef } from "react";
import type HType from "@here/maps-api-for-javascript";
import { useHereService } from "app/layouts/HereServiceContext";

const HereMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<HType.Map>();
  const platform = useRef<HType.service.Platform>();
  const here = useHereService();

  useEffect(() => {
    const initMap = async () => {
      if (typeof window === "undefined") return;

      console.log("initializing map");
      if (!map.current && mapRef.current) {
        platform.current = new H.service.Platform({
          apikey: here.service?.apikey as string,
        });

        const defaultLayers = platform.current?.createDefaultLayers(
          512,
          320
        ) as {
          raster: { normal: { mapnight: H.map.layer.TileLayer } };
        };

        const newMap = new H.Map(
          mapRef.current,
          defaultLayers.raster.normal.mapnight,
          {
            pixelRatio: 2,
            zoom: 11,
            center: { lat: 25.761681, lng: -80.191788 },
          }
        );

        new H.mapevents.Behavior(new H.mapevents.MapEvents(newMap));

        const ui = H.ui.UI.createDefault(newMap, defaultLayers);

        const mapSettingsControl = ui.getControl("mapsettings");
        if (mapSettingsControl) {
          ui.removeControl("mapsettings");
        }

        map.current = newMap;
      }
    };
    initMap();
  }, [here, mapRef]);

  return <div ref={mapRef} className="w-full h-[600px] border-2 rounded-sm" />;
};

export default HereMap;
