import { type ChangeEvent, type HTMLInputTypeAttribute, useEffect, useState } from "react"
import InputForm from "./components/InputForm";
import { ThemeProvider } from "./context/themeContext";
import DataTable from "./components/DataTable/DataTable";
import { generateFakeTableData } from "./utils/data";
import type { Column, UserType } from "./types";

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




const columns: Column<UserType>[] = [
  {
    key: "id",
    title: "Id",
    dataIndex: "id",
    sortable: true,
  },
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
    sortable: true,
  },
  {
    key: "email",
    title: "Email",
    dataIndex: "email",
    sortable: true,
  },
  {
    key: "age",
    title: "Age",
    dataIndex: "age",
    sortable: true,
  },
  {
    key: "city",
    title: "City",
    dataIndex: "city",
    sortable: true,
  },
]

const data = generateFakeTableData(4)

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
  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark")
  const changeTheme = () => {
    setThemeMode(prev => prev === "dark" ? "light" : "dark")
  }

  // actual change in Theme
  useEffect(() => {
    localStorage.setItem("theme", themeMode)
  }, [themeMode])

  useEffect(() => {
    const html = document.querySelector("html")
    if (!html) return

    html.classList.remove("light", "dark")

    const theme: string | null = localStorage.getItem("theme")

    if (theme) {
      html.classList.add(theme) // ✅ directly apply stored theme
    } else {
      setThemeMode("dark")
      html.classList.add("dark")
    }
  }, [themeMode])


  return (
    <ThemeProvider value={{ themeMode, changeTheme }}>
      <div className="dark:bg-[#121212] text-white min-h-screen p-5">
        <button
          onClick={() => changeTheme()}
          className="capitalize px-5 rounded-md py-1 bg-gray-200 text-gray-800 border border-gray-300 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800 "
        >{themeMode === "dark" ? "light" : "dark"}
        </button>

        <InputForm
          changeHandler={changeHandler}
          inputData={inputData}
          inputType={inputType}
          setInputType={setInputType}
          inputTypes={inputTypes}
          error={error}
        />

        <DataTable data={data} columns={columns} />
      </div>
    </ThemeProvider>
  )
}

export default App
