import { type ChangeEvent, type HTMLInputTypeAttribute, useEffect, useState } from "react"
import InputField from "./components/InputField/InputField"
import InputForm from "./components/InputForm";
import { ThemeProvider } from "./context/themeContext";

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

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError("")

    const value = e.target.value;

    if (inputType === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Invalid email")
    } else if (inputType === "password" && inputData.length > 6) {
      setError("Password must be at least 6 characters long")
    }

    setInputData(value)
  }

  // Theme Context
  const [isDark, setIsDark] = useState<boolean>(false)
  const changeTheme = () => {
    setIsDark(prev => !prev)
  }

  // actual change in Theme

  useEffect(() => {
    document.querySelector('html')?.classList.remove("light", "dark")
    document.querySelector("html")?.classList.add(isDark ? "dark" : "light")
  }, [isDark])
  return (
    <ThemeProvider value={{ isDark, changeTheme }}>
      <div className="dark:bg-[#121212] text-white min-h-screen p-5">
        <button
          onClick={() => changeTheme()}
          className="px-5 rounded-md py-1 bg-gray-200 text-gray-800 border border-gray-300 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800 "
        >{isDark ? "Light" : "Dark"}
        </button>

        <InputForm
          changeHandler={changeHandler}
          inputData={inputData}
          inputType={inputType}
          setInputType={setInputType}
          inputTypes={inputTypes}
          error={error}
        />
      </div>
    </ThemeProvider>
  )
}

export default App
