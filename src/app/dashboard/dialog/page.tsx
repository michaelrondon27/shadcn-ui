"use client";

import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function Page() {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Share</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Share link</DialogTitle>

                        <DialogDescription>
                            Anyone who has this link will be able to view this.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Link
                            </Label>

                            <Input
                                defaultValue="https://ui.shadcn.com/docs/installation"
                                id="link"
                                readOnly
                            />
                        </div>

                        <Button
                            className="px-3"
                            size="sm"
                            type="submit"
                            onClick={ () => navigator.clipboard.writeText("https://ui.shadcn.com/docs/installation") }
                        >
                            <span className="sr-only">Copy</span>

                            <Copy />
                        </Button>
                    </div>

                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
