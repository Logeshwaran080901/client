import React from "react";
export default function Button({name,handleSumbit,disabled}){
    return(
    <div className="flex sm:flex-col justify-center sm:mt-8">
            <button
            disabled={disabled}
              className={`py-2 px-4 rounded-md transition ${
                disabled
                  ? "bg-gray-500 text-white cursor-not-allowed"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
              onClick={handleSumbit}
            >
             {name}
            </button>
          </div>
    )
}