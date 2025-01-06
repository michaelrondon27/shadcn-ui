"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Status = {
    label: string
    value: string
}

const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" }
];

const statuses: Status[] = [
    { value: "backlog", label: "Backlog" },
    { value: "todo", label: "Todo" },
    { value: "in progress", label: "In Progress" },
    { value: "done", label: "Done" },
    { value: "canceled", label: "Canceled" }
];

export default function Page() {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
    const [value, setValue] = useState("");

    return (
        <div className="grid grid-cols-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {value
                            ? frameworks.find((framework) => framework.value === value)?.label
                            : "Select framework..."
                        }

                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search framework..." className="h-9" />

                        <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>

                            <CommandGroup>
                                {frameworks.map((framework) => (
                                    <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        {framework.label}

                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === framework.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            <div className="flex items-center space-x-4">
                <p className="text-sm text-muted-foreground">Status</p>

                <Popover open={open2} onOpenChange={setOpen2}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[150px] justify-start">
                            {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="p-0" side="right" align="start">
                        <Command>
                            <CommandInput placeholder="Change status..." />

                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>

                                <CommandGroup>
                                    {statuses.map((status) => (
                                        <CommandItem
                                            key={status.value}
                                            value={status.value}
                                            onSelect={(value) => {
                                                setSelectedStatus(
                                                    statuses.find((priority) => priority.value === value) ||
                                                    null
                                                )
                                                setOpen2(false)
                                            }}
                                        >
                                            {status.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
