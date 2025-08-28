import { render, screen, fireEvent } from '@testing-library/react'
import InputField from './InputField'

describe("InputField Component", () => {
    test("renders with labe and placeholder", () => {
        render(<InputField label='Username' placeholder='Enter username' />);
        expect(screen.getByText("Username")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
    });
})