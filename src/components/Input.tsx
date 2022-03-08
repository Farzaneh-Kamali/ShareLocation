import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Field, useFormikContext } from 'formik';
import Select from 'react-select';
import {
  MapContainer,
  Rectangle,
  TileLayer,
  useMap,
  useMapEvent,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';

interface InputProps {
  type: string;
  name: string;
  options?: { value: string; label: string }[];
  location?: { loaded: boolean; coordinates: { lat: number; lng: number } };
}
export const Input = ({ type, name, options, location }: InputProps) => {
  //State value of form
  const { setFieldValue, values } = useFormikContext<{
    locationMap: L.LatLngExpression;
    locationType: object;
    logo: File;
  }>();

  //Get Current location with useGeoLocation
  //Then get marker location if user move it
  // const location = useGeoLocation();
  const center = location?.coordinates;

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
          }
        },
      }),
      []
    );
    // const map = useMapEvents({
    //   : () => {
    //     map.locate();
    //   },
    //   locationfound: (location) => {
    //     setFieldValue('locationMap', location);
    //     console.log('location found:', location);
    // setFieldValue('locationMap', location);
    //   },
    // });

    return (
      <div>
        {position && (
          <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
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
          console.log(e.target.files[0]);
          setImgUrl(URL.createObjectURL(e.target.files[0]));
        } else {
          alert('حجم فایل انتخابی باید کمتر از 9 مگا بایت باشد !');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  // console.log('url:', imgUrl);
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
          //@ts-ignore
          <MapContainer
            center={[location.coordinates.lat, location.coordinates.lng]}
            zoom={13}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker />
          </MapContainer>
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
              value={option}
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
