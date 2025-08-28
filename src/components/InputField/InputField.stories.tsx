import type { Meta, StoryObj } from '@storybook/react';
import InputField from './InputField';
import type { InputFieldProps } from "../../types"


const meta: Meta<InputFieldProps> = {
    title: "Components/InputField",
    component: InputField
}

export default meta;

type Story = StoryObj<InputFieldProps>;

export const Default: Story = {
    args: {
        label: "Username",
        placeholder: "Enter your name",
    },
};

export const Error: Story = {
    args: {
        label: "Email",
        placeholder: "Enter your email",
        invalid: true,
        errorMessage: "invalid email address"
    }
}