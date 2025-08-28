import { type HTMLInputTypeAttribute, useState } from "react"
import InputField from "./components/InputField/InputField"

const inputTypes: React.HTMLInputTypeAttribute[] = [
  "text",
  "email",
  "password",
  "number",
  "tel",
  "url",
  "search",
  "date",
  "datetime-local",
  "time",
];


function App() {
  const [inputData, setInputData] = useState<string>("")
  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>("text")
  const [error, setError] = useState<string>("")

  return (
    <div className="bg-[#121212] text-white min-h-screen p-5">
      <div className="container rounded-xl">
        <h2 className="heading">Input Field</h2>
        <div>
          <div className="mb-3 flex flex-col gap-1">
            <label htmlFor="input-type">Choose type of Input</label>
            <select
              name="input-type"
              className="w-fit border-1 border-gray-400 rounded px-2 py-1 bg-[#1e1e1e]"
              value={inputType}
              onChange={({ target }) => setInputType(target.value)}
            >
              {inputTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <InputField
            label="Password"
            type={inputType}
            invalid={!!error}
            placeholder="Enter password"
            errorMessage={error}
            onChange={(e) => {
              const value = e.target.value;
              if (
                inputType === "email" &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
              ) {
                setError("Invalid email")
                setInputData(value)
              } else {
                setError("")
                setInputData(value)
              }
            }}
            value={inputData}
          />
          <div className="mt-3 font-semibold text-gray-200 uppercase">
            Input Data :
            <span className="normal-case font-normal">
              {" "} {inputData ? inputData : "No input yet"}
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
