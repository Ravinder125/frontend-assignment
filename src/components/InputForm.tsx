import InputField from "./InputField/InputField";


export interface InputFormProps {
    inputType: string;
    setInputType: Function;
    inputTypes: React.HTMLInputTypeAttribute[]
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
    error?: string,
    inputData: string
}

const InputForm = ({
    inputType,
    setInputType,
    inputTypes,
    changeHandler,
    inputData,
    error = ""
}: InputFormProps) => {
    return (
        <section className="container ">
            <div className="">
                <h2 className="heading">Input Field</h2>
                <div>
                    <div className="mb-3 flex flex-col gap-1">
                        <label htmlFor="input-type">Choose type of Input</label>
                        <select
                            className="w-fit border-1 border-gray-400 bg-gray-800/5 rounded px-2 py-1 dark:bg-[#1e1e1e] "
                            value={inputType}
                            onChange={({ target }) => setInputType(target.value)}
                        >
                            {inputTypes.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                    <InputField
                        label="Enter your input"
                        type={inputType}
                        invalid={!!error}
                        placeholder="ex : ravi@gmail.com"
                        errorMessage={error}
                        onChange={changeHandler}
                        value={inputData}
                    />
                    <div className="mt-3 font-semibold text-gray-600 dark:text-gray-200 uppercase">
                        Input Data :
                        <span className="normal-case font-normal">
                            {" "} {inputData ? inputData : "No input yet"}
                        </span>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default InputForm