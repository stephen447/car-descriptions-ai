import React from "react";

const Output = ({ text = "test" }) => {
  return (
    <div className="flex m-12">
      <div className="w-1/10 flex items-center justify-center">
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
      <div className="w-9/10 p-2 border border-gray-300 rounded bg-gray-100 flex items-center">
        {text}
      </div>
    </div>
  );
};

export default Output;
