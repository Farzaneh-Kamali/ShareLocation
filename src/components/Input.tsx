import React, { ChangeEvent, useState } from 'react';
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
import useGeoLocation from '../hooks/useGeoLocation';
import L from 'leaflet';

export const Input = ({
  type,
  name,
  option,
}: {
  type: string;
  name: string;
  option?: { value: string; label: string }[];
}) => {
  const { setFieldValue, values } = useFormikContext<{ logo: File }>();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        const file_size = e.target.files[0].size;
        if (file_size < 9437184.00402009) {
          setFieldValue('logo', undefined);
          setFieldValue(name, e.target.files[0]);
        } else {
          alert('حجم فایل انتخابی باید کمتر از 9 مگا بایت باشد !');
        }
      }
      console.log(values.logo);
    } catch (err) {
      console.log(err);
    }
  };

  const location = useGeoLocation();
  console.log(typeof location.coordinates.lat);

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
      if (location.loaded) {
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
            <Marker
              position={[location.coordinates.lat, location.coordinates.lng]}
              draggable={true}
            />
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
              options={option}
              isSearchable={true}
              className="my-4 outline-none w-44 "
              defaultValue={option[0]}
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
                src={require('../images/upload.png')}
                alt=""
                className="w-10 h-10 cursor-pointer"
              />
              <input
                type="file"
                name={name}
                accept="image/*"
                onChange={onChange}
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
