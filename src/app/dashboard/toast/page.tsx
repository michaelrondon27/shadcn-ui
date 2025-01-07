"use client";

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
    const { toast } = useToast();

    return (
        <div>
            <Button
                variant="outline"
                onClick={() => {
                    toast({
                        description: "Your message has been sent.",
                    })
                }}
            >
                Show Toast
            </Button>

            <Button
                variant="outline"
                onClick={() => {
                    toast({
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request.",
                    })
                }}
            >
                Show Toast
            </Button>

            <Button
                variant="outline"
                onClick={() => {
                    toast({
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request.",
                        action: <ToastAction altText="Try again">Try again</ToastAction>,
                    })
                }}
            >
                Show Toast
            </Button>

            <Button
                variant="outline"
                onClick={() => {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request.",
                        action: <ToastAction altText="Try again">Try again</ToastAction>,
                    })
                }}
            >
                Show Toast
            </Button>

            <Button
                variant="outline"
                onClick={() => {
                    toast({
                        variant: "success",
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request."
                    })
                }}
            >
                Show Toast
            </Button>
        </div>
    );
}
