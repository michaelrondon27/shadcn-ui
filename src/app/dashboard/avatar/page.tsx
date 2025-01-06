import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Page() {
    return (
        <div className="h-[500px] flex justify-center items-center">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />

                <AvatarFallback>MR</AvatarFallback>
            </Avatar>

            <p className="m-2">Michael Rondón</p>
        </div>
    );
}
