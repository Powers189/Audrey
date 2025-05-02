import React from "react";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { isIntegerInRange } from "../utils/validation";

function About() {
  const [value, setValue] = useState("5"); // Default value
  const [submitted, setSubmitted] = useState(null);
  const min = 3;
  const max = 12;

  const handleChange = (e) => {
    const input = e.target.value;
    if (input === "" || /^\d+$/.test(input)) {
      //regex only accepts numbers but can take e ned to fix maybe
      setValue(input);
    }
  };

  const handleSubmit = () => {
    //const number = parseInt(value, 10); //convert a string to a base 10 number
    if (isIntegerInRange(value, min, max)) {
      setSubmitted(value);
      try {
        const data: string = fs.readFileSync("../assests/test.txt", "utf-8");
        console.log(data);
      } catch (err) {
        console.error("Error reading file:", err);
      }
    } else {
      console.log("hey");
      setSubmitted(null);
      alert(`Please enter an integer between ${min} and ${max}.`); //do i want an alert?
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="bg-purple-100 min-h-screen p-2">
      <h1 className="text-3xl font-[VT323]">Aboutyay</h1>
      {/* <div className="font-vt323 text-lg text-black">Much cleaner now!</div> */}

      <div className="p-4 max-w-sm">
        <label className="block mb-2 text-sm font-medium">
          Enter an integer ({min}–{max}):
        </label>
        <input
          type="number"
          inputMode="numeric"
          step="1"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="border border-gray-300 rounded p-2 w-full"
          placeholder={`Between ${min} and ${max}`}
          min={min}
          max={max}
        />
        <button
          onClick={handleSubmit}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Submit
        </button>

        {submitted !== null && (
          <p className="mt-4 text-green-700 font-semibold">
            You entered: {submitted}
          </p>
        )}
      </div>
    </div>
  );
}

export default About;
