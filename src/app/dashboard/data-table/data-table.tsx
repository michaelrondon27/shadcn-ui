"use client";

import { useState } from "react";
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data   : TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting
        }
    });

    return (
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
    )
}
