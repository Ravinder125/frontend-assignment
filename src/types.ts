export interface InputFieldProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    helperText?: string;
    errorMessage?: string;
    disabled?: boolean;
    invalid?: boolean;
    variant?: "filled" | "outlined" | "ghost";
    size?: "sm" | "md" | "lg";
    type?: React.HTMLInputTypeAttribute
}

export interface UserType {
    id: number;
    name: string;
    email: string;
    age: number;
    city: string;
}

export interface Column<T> {
    key: string;
    title: string;
    dataIndex: keyof T;
    sortable?: boolean;
}

export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    loading?: boolean;
    selectable?: boolean;
    multiple?: boolean; // support single/multiple row selection
    onRowSelect?: (selectedRows: T[]) => void;
}