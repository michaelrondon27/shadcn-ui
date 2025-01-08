"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { cn } from "@/lib/utils";

const formSchema = z.object({
    dateOfBirth: z.date({ required_error: "A date of birth is required" }),
    email: z.string().email(),
    gender: z.enum(["male", "female"], { message: "Seleccione" }),
    username: z.string().min(2).max(20)
});

export default function Page() {
    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            email: "",

            username: ""
        },
        resolver: zodResolver(formSchema)
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log({ values });
    }

    return (
        <div>
            <Form { ...form }>
                <form className="grid grid-cols-2 gap-4" onSubmit={ form.handleSubmit(onSubmit) }>
                    <FormField
                        control={ form.control }
                        name="username"
                        render={ ({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>

                                <FormControl>
                                    <Input placeholder="shadcn" { ...field } />
                                </FormControl>

                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>

                                <FormMessage/>
                            </FormItem>
                        ) }
                    />

                    <FormField
                        control={ form.control }
                        name="email"
                        render={ ({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>

                                <FormControl>
                                    <Input type="email" { ...field } />
                                </FormControl>

                                <FormMessage/>
                            </FormItem>
                        ) }
                    />

                    <FormField
                        control={ form.control }
                        name="gender"
                        render={ ({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Gender</FormLabel>

                                <FormControl>
                                    <RadioGroup
                                        className="flex flex-col space-y-1"
                                        defaultValue={ field.value }
                                        onValueChange={ field.onChange }
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="male" />
                                            </FormControl>

                                            <FormLabel className="font-normal">
                                                Male
                                            </FormLabel>
                                        </FormItem>

                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="female" />
                                            </FormControl>

                                            <FormLabel className="font-normal">
                                                Female
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>

                                <FormMessage/>
                            </FormItem>
                        ) }
                    />

                    <FormField
                        control={ form.control }
                        name="dateOfBirth"
                        render={ ({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date of birth</FormLabel>

                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                className={ cn(
                                                    "pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                ) }
                                                variant="outline"
                                            >
                                                { field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                ) }

                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>

                                    <PopoverContent align="start" className="w-auto p-0">
                                        <Calendar
                                            disabled={ (date) => date > new Date() || date < new Date("1900-01-01") }
                                            initialFocus
                                            mode="single"
                                            onSelect={ field.onChange }
                                            selected={ field.value }
                                        >

                                        </Calendar>
                                    </PopoverContent>
                                </Popover>

                                <FormDescription>
                                    Your date of birth is used to calculate your age.
                                </FormDescription>

                                <FormMessage/>
                            </FormItem>
                        ) }
                    />

                    <Button type="submit">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}
