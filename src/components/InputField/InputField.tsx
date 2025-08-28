import type { InputFieldProps } from "../../types"
import clsx from 'clsx'



const InputField = ({
    value,
    onChange,
    label,
    placeholder,
    helperText,
    errorMessage,
    disabled,
    invalid,
    variant = "outlined",
    size = "md",
    type
}: InputFieldProps) => {
    const baseClasses = "rounded border focus:outline-none transition w-full placeholder:text-gray-500 dark:placeholder:text-gray-400";
    const sizeClasses = {
        sm: "px-2 py-1 text-sm",
        md: "px-3 py-2 text-base",
        lg: "px-4 py-3 text-lg",
    }
    const variantClasses = {
        filled: "bg-gray-800/5 dark:bg-[#272727] border-gray-300 focus:border-blue-500",
        outlined: "border border-gray-400 focus:border-blue-500",
        ghost: "border-none bg-transparent focus:border-blue-500",
    }

    return (
        <div className="flex flex-col gap-1">
            {label && <label htmlFor={label}>{label}</label>}
            <input
                type={type || "text"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={clsx(
                    baseClasses,
                    sizeClasses[size],
                    variantClasses[variant],
                    invalid && "border-red-500 focus:border-red-500",
                )}
                id={label}
            />
            {helperText && !invalid && (
                <span className="text-gray-500 text-ms">{helperText}</span>
            )}
            {invalid && errorMessage && (
                <span className="text-red-500 text-sm">{errorMessage}</span>
            )}
        </div>
    )
}

export default InputField