"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    email: z.string().email(),
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

                    <Button type="submit">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}
