"use client";

import { useState } from "react";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import type { Payment } from "@/data/payments.data";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data   : TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [currentStatus, setCurrentStatus] = useState("all");
    const [columnVisibility, setVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);

    const isDeleteVisible = Object.keys(rowSelection).length > 0;

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setVisibility,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        state: {
            columnFilters,
            columnVisibility,
            rowSelection,
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
                    placeholder="Filter anything... (client name, email, status)"
                    value={ (table.getColumn("email")?.getFilterValue() as string) ?? "" }
                />

                <Select
                    onValueChange={ (value) => {
                        setCurrentStatus(value);

                        table.getColumn("status")?.setFilterValue(value !== "all" ? value : "");
                    } }
                    value={ currentStatus }
                >
                    <SelectTrigger className="ml-2 w-[180px]">
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

                { isDeleteVisible && (
                    <Button
                        className="ml-2"
                        onClick={ () => {
                            const ids = table.getSelectedRowModel().rows.map((row) => (row.original as Payment).id);

                            console.log(ids);
                        } }
                        variant="destructive"
                    >
                        Delete
                    </Button>
                ) }

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="ml-auto" variant="outline">
                            Columns
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        {table.getAllColumns().filter(column => column.getCanHide()).map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    checked={ column.getIsVisible() }
                                    className="capitalize"
                                    key={ column.id }
                                    onCheckedChange={ (value) => column.toggleVisibility(!!value) }
                                >
                                    { column.id }
                                </DropdownMenuCheckboxItem>
                            );
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
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

                <div className="space-x-2 py-4 mx-2 flex justify-between items-center">
                    <div className="flex-1 text-sm text-muted-foreground">
                        { table.getFilteredSelectedRowModel().rows.length } of{ " " }
                        { table.getFilteredRowModel().rows.length } row(s) selected
                    </div>

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

                <Select onValueChange={ (value) => {
                    table.setPageSize(+value);
                } }>
                    <SelectTrigger className="w-[180px] m-2">
                        <SelectValue placeholder="10 Rows" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Rows per page</SelectLabel>

                            <SelectItem value="10">10</SelectItem>

                            <SelectItem value="20">20</SelectItem>

                            <SelectItem value="30">30</SelectItem>

                            <SelectItem value="50">50</SelectItem>

                            <SelectItem value="100">100</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
