"use client";

import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';

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
    }
];
