import React from 'react';

export const LabelTag = ({ name }: { name: string }) => {
  return (
    <div className="w-1/3 my-4 ml-5 ">
      <h3 className="text-base ">{name}</h3>
    </div>
  );
};
