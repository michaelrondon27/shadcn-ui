"use client";

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { Payment } from '@/data/payments.data';

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "clientName",
        header: "Client Name"
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
        header: "Status"
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
        header: () => <div className="text-right">Amount</div>
    },
    {
        accessorKey: "email",
        header: "Email"
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
