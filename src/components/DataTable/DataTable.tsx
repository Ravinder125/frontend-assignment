import { useState } from "react"
import type { Column, DataTableProps, UserType } from "../../types"
import clsx from "clsx";

function DataTable<T extends UserType>({
    data,
    columns,
    loading = false,
    multiple = false,
    onRowSelect,
    selectable = false,
}: DataTableProps<T>) {
    const [selected, setSelected] = useState<T[]>([])
    const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null);

    const toggleRow = (row: T) => {
        let updated: T[];

        if (multiple) {
            updated = selected.includes(row)
                ? selected.filter((r) => r !== row)
                : [...selected, row];
        } else {
            updated = selected.includes(row) ? [] : [row];
        }

        setSelected(updated);
        onRowSelect?.(updated);
    }

    const sortData = (data: T[]): T[] => {
        if (!sortConfig) return data;
        const { key, direction } = sortConfig;

        return [...data].sort((a, b) => {
            const aVal = a[key];
            const bVal = b[key];

            if (aVal < bVal) return direction === "asc" ? -1 : 1;
            if (aVal > bVal) return direction === "asc" ? 1 : -1;
            return 0;
        })
    }

    const handleSort = (col: Column<T>) => {
        if (!col.sortable) return;
        setSortConfig((prev) =>
            prev && prev.key === col.dataIndex
                ? { key: col.dataIndex, direction: prev.direction === "asc" ? "desc" : "asc" }
                : { key: col.dataIndex, direction: "asc" }
        )
    }

    if (loading) return <p className="text-center py-4 text-5xl">Loading...</p>
    if (!data.length) return <p className="text-center py-4 text-5xl">No Data available</p>;

    const sortedData = sortData(data)

    return (
        <section className="container">
            <h2 className="heading">
                DataTable
            </h2>
            <div className="overflow-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-200">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                onClick={() => handleSort(col)}
                                className={clsx(
                                    "px-3 py-2 border border-gray-300 dark:border-gray-600 text-left",
                                    col.sortable && "hover:bg-gray-200 dark:hover:bg-gray-600"
                                )}
                            >
                                {col.title}
                                {sortConfig?.key === col.dataIndex && (
                                    <span>{sortConfig.direction === "asc" ? " 🔼" : " 🔽"}</span>
                                )}
                            </th>
                        ))}
                    </thead>
                    <tbody>
                        {sortedData.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-800/5 dark:hover:bg-gray-800">
                                {selectable && (
                                    <td className="px-2 border border border-gray-300 dark:border-gray-600">
                                        <input
                                            type={multiple ? "checkbox" : "radio"}
                                            checked={selected.indexOf(row) !== -1}
                                            onChange={() => toggleRow(row)}
                                            className="accent-blue-500"
                                        />
                                    </td>
                                )}
                                {columns.map((col) => (
                                    <td key={col.key} className="px-3 py-2 border border-gray-300 dark:border-gray-700">
                                        {String(row[col.dataIndex])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default DataTable

// Ang Pagibig