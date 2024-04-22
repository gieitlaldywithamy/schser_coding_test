import { useSearchParams } from "react-router-dom";

import { useGetLatLong, useGetCrimes } from "../../api";
import { stringSearchParamsToArray } from "../../utils";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { Loading, Error } from "../../components";

export const CrimesMap: React.FC = () => {
  const [searchParams] = useSearchParams();
  const postcodes = searchParams.get("postcodes");
  const { data: postcodesWithLatLong, isLoading: waitingForLatLongs } =
    useGetLatLong(stringSearchParamsToArray(postcodes || ""));
  const { data: crimes, isLoading: waitingForCrimes } =
    useGetCrimes(postcodesWithLatLong);

  if (!crimes || waitingForCrimes || waitingForLatLongs) {
    return <Loading />;
  }

  if (postcodesWithLatLong.length === 0) {
    return <Error>No crimes found! Try another postcode</Error>;
  }

  const mapCenter: LatLngExpression = [
    Number(postcodesWithLatLong[0].latitude),
    Number(postcodesWithLatLong[0].longitude),
  ];

  const latLongsOfCrimes = crimes
    .slice(0, 10)
    .flatMap(({ location: { latitude, longitude } }) => ({
      latitude,
      longitude,
    }));

  return (
    <MapContainer
      style={{
        width: "400px",
        height: "400px",
      }}
      center={mapCenter}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {latLongsOfCrimes.map((latLng, index) => (
        <Marker
          key={latLng.latitude.toString() + index}
          position={[latLng.latitude, latLng.longitude]}
        />
      ))}
    </MapContainer>
  );
};
