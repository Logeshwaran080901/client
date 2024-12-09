import React from 'react';

export default function Checkbox(props) {
  return (
    <div>
      <input
        type="checkbox"
        className=" w-[12px] h-[12px]"
        style={{ border: '1px solid rgb(224, 225, 226)' }}
        onChange={props.onChange}
        checked={props.checked}
        value={props.value}
        name={props.name}
        ref={props.ref}
        disabled={props.disabled}
        id={props.name}
      />
    </div>
  );
}