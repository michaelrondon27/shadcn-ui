"use client";

import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";

export default function Page() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [multipleDates, setMultipleDates] = useState<Date[] | undefined>([]);

    const smallDate = date?.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        weekday: "short"
    });

    return (
        <div className="flex-col sm:flex-wrap sm:flex sm:flex-row gap-4">
            <Calendar
                className="rounded-md border shadow"
                disabled={ (date) => date.getDay() === 0 || date.getDay() === 6 }
                mode="single"
                onSelect={ setDate }
                selected={ date }
            />

            <Calendar
                className="rounded-md border shadow"
                disabled={ (date) => date > new Date() }
                mode="single"
                onSelect={ setDate }
                selected={ date }
            />

            <Calendar
                className="rounded-md border shadow"
                mode="multiple"
                onSelect={ setMultipleDates }
                selected={ multipleDates }
            />

            <div>
                <h1 className="text-3xl">Información</h1>

                <div className="border-b"></div>

                <p>{ smallDate }</p>

                <p>{ multipleDates?.map(date => date.toLocaleDateString()).join(", ") }</p>
            </div>
        </div>
    );
}
