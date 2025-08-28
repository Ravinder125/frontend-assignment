import { render, screen, fireEvent } from '@testing-library/react'
import InputField from './InputField'


describe("InputField Component", () => {
    test("renders with label and placeholder", () => {
        render(<InputField label='Username' placeholder='Enter username' />);
        expect(screen.getByText("Username")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
    });

    test("accepts and displays input value", () => {
        render(<InputField value='Ravi' onChange={() => { }} />);
        const input = screen.getByDisplayValue("Ravi");
        expect(input).toBeInTheDocument();
    })

    test("calls onChange when typing", () => {
        const handleChange = jest.fn();
        render(<InputField onChange={handleChange} />)
        const input = screen.getByRole("textbox")

        fireEvent.change(input, { target: { value: "Hello" } });
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test("shows helper text", () => {
        render(<InputField helperText='This is a helper' />)
        expect(screen.getByText("This is a helper")).toBeInTheDocument();
    })

    test("disables input when disabled prop is true", () => {
        render(<InputField disabled />);
        const input = screen.getAllByRole("textbox")[0];
        expect(input).toBeDisabled();
    })

    test("runs validator and shows error", () => {
        const validator = (val: string) =>
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? "Invalid email" : null;
        const handler = jest.fn()
        render(<InputField type='email' onChange={handler} />)
        const input = screen.getByRole("textbox")

        fireEvent.change(input, { target: { value: "ravi.com" } })
        expect(screen.getByText("Invalid email")).toBeInTheDocument();
    })
})