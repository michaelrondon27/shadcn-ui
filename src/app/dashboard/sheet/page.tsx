"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

export default function Page() {
    const [open, setOpen] = useState(false);

    return (
        <div className="grid grid-cols-2">
            <Button onClick={ () => setOpen(true) }>open manually</Button>

            <Sheet onOpenChange={ setOpen } open={ open }>
                <SheetTrigger>Open</SheetTrigger>

                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Are you absolutely sure?</SheetTitle>

                        <SheetDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>

            {SHEET_SIDES.map((side) => (
                <Sheet key={ side }>
                    <SheetTrigger asChild>
                        <Button variant="outline">{side}</Button>
                    </SheetTrigger>

                    <SheetContent side={side}>
                        <SheetHeader>
                            <SheetTitle>Are you absolutely sure?</SheetTitle>

                            <SheetDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            ))}
        </div>
    );
}
