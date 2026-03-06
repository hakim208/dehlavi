import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

export default function CustomMap() {
  const points = [
    {
      id: 1,
      coord: [38.576373, 68.786026],
      title: "Душанбе, скойри тарафи 4-ум доми Аэропорт",
      yandexUrl: "https://yandex.com/maps/?rtext=~38.576373,68.786026",
    },
  ];

  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <YMaps>
        <Map
          defaultState={{
            center: [38.576373, 68.786026],
            zoom: 14,
          }}
          width="100%"
          height="100%"
        >
          {points.map((point) => (
            <Placemark
              key={point.id}
              geometry={point.coord}
              options={{
                iconLayout: "default#image",
                iconImageHref: "/markers/office.jpg",
                iconImageSize: [50, 50],
                iconImageOffset: [-25, -50],
              }}
            />
          ))}
        </Map>
      </YMaps>

      {/* Кнопка берун аз карта */}
      <div style={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
      }}>
        <a
          href={points[0].yandexUrl}
          target="_blank"
          style={{
            padding: "10px 20px",
            background: "#ffcc00",
            color: "#000",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "500",
            fontSize: "14px",
          }}
        >
          Открыть маршрут в Yandex Maps
        </a>
      </div>
    </div>
  );
}
