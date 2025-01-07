"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export default function Page() {
    return (
        <div className="grid grid-cols-4 gap-4">
            <Button
                variant="outline"
                onClick={() =>
                    toast("Event has been created", {
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                        },
                        description: "Sunday, December 03, 2023 at 9:00 AM"
                    })
                }
            >
                Show Toast
            </Button>

            <Button
                variant="outline"
                onClick={() =>
                    toast.success("Event has been created", {
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                        },
                        description: "Sunday, December 03, 2023 at 9:00 AM"
                    })
                }
            >
                Show success
            </Button>
        </div>
    );
}
