import React from 'react';
import { Formik, Form, Field } from 'formik';
import './App.css';
import { LabelTag } from './components/labelTag';
import { Input } from './components/Input';

const initialValues = {
  locationName: '',
  locationMap: undefined,
  locationType: '',
  logo: undefined,
};

type FormValues = {
  locationName: string;
  locationMap: object;
  locationType: string;
  logo: File;
};
const locationOptions = [
  { value: 'business', label: 'Business' },
  { value: 'home', label: 'Home' },
  { value: 'office', label: 'Office' },
];
function App() {
  const onSubmit = () => {};
  return (
    <div className="flex flex-row justify-center w-full py-6">
      <div className="w-1/2 h-auto rounded-md ring-2 ring-sky-600">
        <div className="text-white bg-sky-600 rounded-t-md ">
          <h1 className="pl-3 text-xl font-bold">Share location</h1>
        </div>
        <div>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {(formik) => {
              return (
                <Form>
                  <div className="flex gap-4">
                    <LabelTag name="Location name:" />
                    <Input type="text" name="locationName" />
                  </div>

                  <div className="flex gap-4">
                    <LabelTag name="Location on map:" />
                    <Input type="text" name="locationMap" />
                  </div>
                  <div className="flex gap-4">
                    <LabelTag name="Location type:" />
                    <Input
                      type="select"
                      name="locationType"
                      option={locationOptions}
                    />
                  </div>
                  <div className="flex gap-4">
                    {' '}
                    <LabelTag name="Logo:" />
                    <Input name="logo" type="file" />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default App;
