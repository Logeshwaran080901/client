import React from 'react';
export const FieldSetLayout = (props) => {
  return (
    <div className={`border border-solid border-[#E0E1E2]  rounded-lg ml-atuo mt-4 ${props.className}`}>
      <h1 className=" text-sm text-primary font-bold -mt-2.5 absolute bg-white mb-0.5 left-3">
        <span className=" group hover:bg-[#e5ebff]">{props.title ?? ''} </span>
        <span className="text-[#db484f] text-sm">{props.subtitle1}</span>
      </h1>
      <div className="mx-2 mt-2.5 mb-2">{props.children}</div>
    </div>
  );
};
