"use client";

import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

export default function CustomMap() {
  const location = {
    coords: [38.563938, 68.812249],
  };

  return (
    <div className="w-full h-full">
      <YMaps>
        <Map
          defaultState={{
            center: location.coords,
            zoom: 17,
          }}
          width="100%"
          height="100%"
          modules={[
            "control.ZoomControl",
            "control.FullscreenControl",
          ]}
          options={{
            suppressMapOpenBlock: true,
            yandexMapDisablePoiInteractivity: false,
          }}
        >
          <Placemark
            geometry={location.coords}
            properties={{
              balloonContent: `
                <div style="padding:10px;">
                  <h2 style="font-size:18px;font-weight:700;">
                    📍 Наш офис
                  </h2>

                  <p>
                    г. Душанбе, ул. Малика Собирова 55
                  </p>

                  <p style="color:gray;">
                    Ориентир: Hilton, Isra
                  </p>
                </div>
              `,
            }}
            options={{
              preset: "islands#redIcon",
            }}
          />
        </Map>
      </YMaps>
    </div>
  );
}
