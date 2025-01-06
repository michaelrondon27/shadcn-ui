import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const items = [
    {
        answer: "Yes. It adheres to the WAI-ARIA design pattern.",
        id: "item-1",
        question: "Is it accessible?"
    },
    {
        answer: "Yes. It comes with default styles that matches the other components&apos; aesthetic.",
        id: "item-2",
        question: "Is it styled?"
    },
    {
        answer: "Yes. It's animated by default, but you can disable it if you prefer.",
        id: "item-3",
        question: "Is it animated?"
    }
];

export default function Page() {
    return (
        <div>
            <Accordion type="single" collapsible className="w-full">
                { items.map(item => (
                    <AccordionItem key={ item.id } value={ item.id }>
                        <AccordionTrigger>{ item.question }</AccordionTrigger>

                        <AccordionContent>{ item.answer }</AccordionContent>
                    </AccordionItem>
                )) }
            </Accordion>
        </div>
    );
}
