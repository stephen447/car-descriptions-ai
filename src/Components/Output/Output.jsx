import React from "react";

const Output = ({ text = "test" }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-10 m-12">
      <div className="w-1/10 flex items-center justify-center sm:col-span-1">
        <button
          className="bg-slate-500 text-white p-2 rounded-lg transition-colors duration-300 
                     hover:bg-slate-600 active:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 mr-4"
          onClick={() => {
            navigator.clipboard.writeText(text);
          }}
        >
          Copy
        </button>
      </div>

      {/* Text Column */}
      <div className="sm:col-span-9 p-2 border border-gray-300 rounded-lg bg-gray-400 flex items-center">
        {text}
      </div>
    </div>
  );
};

export default Output;
