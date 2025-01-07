"use client";

import { useState } from "react";
import { ColumnDef, ColumnFiltersState, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data   : TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [currentStatus, setCurrentStatus] = useState("all");
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        state: {
            columnFilters,
            sorting
        }
    });

    return (
        <div>
            <div className="flex items-center justify-between py-4">
                <Input
                    className="max-w-sm"
                    onChange={ (event) => {
                        setCurrentStatus("all");

                        table.getColumn("status")?.setFilterValue("")
                        table.getColumn("email")?.setFilterValue(event.target.value);
                    } }
                    placeholder="Filter emails..."
                    value={ (table.getColumn("email")?.getFilterValue() as string) ?? "" }
                />

                <Select
                    onValueChange={ (value) => {
                        setCurrentStatus(value);

                        table.getColumn("status")?.setFilterValue(value !== "all" ? value : "");
                    } }
                    value={ currentStatus }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status - All" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Status</SelectLabel>

                            <SelectItem value="all">All</SelectItem>

                            <SelectItem value="failed">Failed</SelectItem>

                            <SelectItem value="pending">Pending</SelectItem>

                            <SelectItem value="processing">Processing</SelectItem>

                            <SelectItem value="success">Success</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={ headerGroup.id }>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={ header.id }>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )
                                            }
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length
                            ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow data-state={ row.getIsSelected() && "selected" } key={ row.id }>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={ cell.id }>
                                                { flexRender(cell.column.columnDef.cell, cell.getContext()) }
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell className="h-24 text-center" colSpan={ columns.length }>
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>

                <div className="flex items-center justify-end space-x-2 py-4 mx-2">
                    <Button
                        disabled={ !table.getCanPreviousPage() }
                        onClick={ () => table.previousPage() }
                        size="sm"
                        variant="outline"
                    >
                        Previous
                    </Button>

                    <Button
                        disabled={ !table.getCanNextPage() }
                        onClick={ () => table.nextPage() }
                        size="sm"
                        variant="outline"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
