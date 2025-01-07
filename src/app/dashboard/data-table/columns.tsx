"use client";

import { ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ColumnDef, SortDirection } from '@tanstack/react-table';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { Payment } from '@/data/payments.data';

const SortedIcon = ({ isSorted }: {isSorted: false | SortDirection}) => {
    if (isSorted === "asc") {
        return <ChevronUpIcon className="ml-2 h-4 w-4" />
    }

    if (isSorted === "desc") {
        return <ChevronDownIcon className="ml-2 h-4 w-4" />
    }

    return null;
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "clientName",
        header: ({ column }) => {
            return (
                <Button
                    onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
                    variant="ghost"
                >
                    Client Name

                    <SortedIcon isSorted={ column.getIsSorted() } />
                </Button>
            );
        }
    },
    {
        accessorKey: "status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const variant = {
                failed: "destructive",
                pending: "secondary",
                processing: "info",
                success: "success"
            }[status] ?? "default" as any;

            return <Badge capitalize variant={ variant }>{ status }</Badge>
        },
        header: ({ column }) => {
            return (
                <Button
                    onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
                    variant="ghost"
                >
                    Status

                    <SortedIcon isSorted={ column.getIsSorted() } />
                </Button>
            );
        }
    },
    {
        accessorKey: "amount",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));
            const formatted = new Intl.NumberFormat("en-US", {
                currency: "USD",
                style: "currency"
            }).format(amount);

            return <div className="text-right font-medium">{ formatted }</div>
        },
        header: ({ column }) => {
            return (
                <div className="text-right">
                    <Button
                        onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
                        variant="ghost"
                    >
                        Amount

                        <SortedIcon isSorted={ column.getIsSorted() } />
                    </Button>
                </div>
            );
        }
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
                    variant="ghost"
                >
                    Email

                    <SortedIcon isSorted={ column.getIsSorted() } />
                </Button>
            );
        }
    },
    {
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="h-8 w-8 p-0" variant="ghost">
                            <span className="sr-only">Open menu</span>

                            <DotsHorizontalIcon className='h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <DropdownMenuItem onClick={ () => {
                            navigator.clipboard.writeText(payment.id);

                            toast("Payment ID copied to clipboard", { position: "top-right" });
                        } }>
                            Copy payment ID
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem>View customer</DropdownMenuItem>

                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
        id: "actions"
    }
];
