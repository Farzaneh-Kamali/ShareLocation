import { Form, Formik } from 'formik';
import React from 'react';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input';
import { LabelTag } from '../components/labelTag';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
  location: {
    loaded: boolean;
    coordinates: { lat: number; lng: number };
  };
}

const locationOptions = [
  { value: 'business', label: 'Business' },
  { value: 'home', label: 'Home' },
  { value: 'office', label: 'Office' },
];

export const Home = ({ location }: HomeProps) => {
  // const [values, setFieldValue] = useFormikContext();

  const initialValues = {
    locationName: '',
    locationMap: {
      lat: location.coordinates.lat,
      lng: location.coordinates.lng,
    },
    locationType: { value: 'business', label: 'Business' },
    logo: undefined,
  };

  type FormValues = {
    locationName: string;
    locationMap: {
      lat: number;
      lng: number;
    };
    locationType: { value: string; label: string };
    logo?: File;
  };
  const navigate = useNavigate();

  const onSubmit = (values: FormValues) => {
    navigate('details', {
      state: {
        name: values.locationName,
        lat: values.locationMap.lat,
        lng: values.locationMap.lng,
        type: values.locationType.label,
        logo: values.logo ? values.logo : '',
      },
    });
  };

  return (
    <div className="flex flex-col w-1/2 h-auto rounded-md">
      <div className="text-white bg-sky-600 rounded-t-md ring-2 ring-sky-600 ">
        <h1 className="pl-3 text-xl font-bold">Share location</h1>
      </div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => {
          return (
            <Form>
              <div className=" ring-2 ring-sky-600">
                <div className="flex gap-4">
                  <LabelTag name="Location name:" />
                  <Input type="text" name="locationName" />
                </div>

                <div className="flex gap-4">
                  <LabelTag name="Location on map:" />
                  <Input type="map" name="locationMap" location={location} />
                </div>
                <div className="flex gap-4">
                  <LabelTag name="Location type:" />
                  <Input
                    type="select"
                    name="locationType"
                    options={locationOptions}
                  />
                </div>
                <div className="flex gap-4">
                  <LabelTag name="Logo:" />
                  <Input name="logo" type="file" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="reset"
                  gruop="Cancle"
                  size="L"
                  on_Click={() => {
                    formik.resetForm({
                      values: initialValues,
                    });
                  }}
                >
                  Cancle
                </Button>
                <Button type="submit" gruop="SaveEdit" size="L">
                  Save
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
