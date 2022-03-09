import React, { ChangeEvent, useMemo, useRef, useState } from 'react';
import { Field, useFormikContext } from 'formik';
import Select from 'react-select';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L, { icon } from 'leaflet';

interface InputProps {
  type: string;
  name: string;
  options?: { value: string; label: string }[];
  location?: { loaded: boolean; coordinates: { lat: number; lng: number } };
}
export const Input = ({ type, name, options, location }: InputProps) => {
  //State value of form
  const { values, setFieldValue } = useFormikContext<{
    name: string;
    locationMap: { lat: number; lng: number };
    locationType: { value: string; label: string };
    logo: File;
  }>();

  //Get Current location with useGeoLocation
  //Then get marker location if user move it
  // const location = useGeoLocation();
  const center = location?.coordinates;
  const myIcon = new (icon as any)({
    //@ts-ignore
    iconUrl: require('../images/marker.png'),
    iconSize: [25, 25],
  });
  function DraggableMarker() {
    const [position, setPosition] = useState(center);
    const markerRef = useRef(null);

    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            //@ts-ignore
            setPosition(marker.getLatLng());
            //@ts-ignore
            const tempPosition = marker.setLatLng(
              //@ts-ignore
              new L.LatLng(marker.getLatLng()?.lat, marker.getLatLng()?.lng)
            );

            setFieldValue('locationMap', {
              lat: tempPosition._latlng.lat,
              lng: tempPosition._latlng.lng,
            });
          }
        },
      }),
      []
    );

    return (
      <div>
        {position && (
          <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={values.locationMap}
            ref={markerRef}
            icon={myIcon}
            autoPan={true}
          />
        )}
      </div>
    );
  }

  //Get Value of LocationType if changed
  const [option, setOption] = useState(options ? options[0] : null);
  const [imgUrl, setImgUrl] = useState(require('../images/upload.png'));
  const handleSelectChange = (
    selectedOption: React.SetStateAction<{
      value: string;
      label: string;
    } | null>
  ) => {
    setOption(selectedOption);
    setFieldValue('locationType', selectedOption);
  };

  //Get value of logo file
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        const file_size = e.target.files[0].size;
        if (file_size < 9437184.00402009) {
          setFieldValue('logo', undefined);
          setFieldValue('logo', e.target.files[0]);
          setImgUrl(URL.createObjectURL(e.target.files[0]));
        } else {
          alert('حجم فایل انتخابی باید کمتر از 9 مگا بایت باشد !');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  switch (type) {
    case 'text':
      return (
        <div className="my-4">
          <Field
            type={type}
            name={name}
            className="border-2 resize outline-blue-400 "
            size="19"
          />
        </div>
      );

    case 'map':
      if (location?.loaded) {
        return (
          <div className="border-2 border-black w-44 h-28">
            <MapContainer
              center={[location.coordinates.lat, location.coordinates.lng]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <DraggableMarker />
            </MapContainer>
          </div>
        );
      } else {
        return (
          <div>
            <p>Loading...</p>
          </div>
        );
      }

    case 'select':
      return (
        <div>
          {option && (
            <Select
              name={name}
              options={options}
              isSearchable={true}
              className="my-4 outline-none w-44 "
              value={values.locationType}
              onChange={handleSelectChange}
            />
          )}
        </div>
      );

    case 'file':
      return (
        <div className="flex flex-col items-center my-4 border-2 rounded-sm w-44 h-28 bg-sky-300 border-sky-600">
          <div className="w-full text-center text-white rounded-t-sm bg-sky-600">
            <h1 className="text-base">Upload</h1>
          </div>
          <div className="flex flex-col justify-center h-full">
            <label>
              <img
                id="logo"
                src={imgUrl}
                alt=""
                className="w-20 h-20 cursor-pointer"
              />
              <input
                type="file"
                name={name}
                accept="image/*"
                onChange={onFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      );

    default:
      return <></>;
  }
  return <></>;
};
