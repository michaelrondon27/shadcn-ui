import { v4 as uuidV4 } from "uuid";
import { uniqueNamesGenerator, Config, names } from "unique-names-generator";

const config: Config = {
    dictionaries: [names],
};

export type Payment = {
    amount    : number;
    clientName: string;
    email     : string;
    id        : string;
    status    : "failed" | "pending" | "processing" | "success";
};

const randomStatus = () => {
    const statuses = ["failed", "pending", "processing", "success"] as const;

    return statuses[Math.floor(Math.random() * statuses.length)];
};

const randomEmail = (clientName: string) => {
    const domains = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com"];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];

    return `${ clientName }@${ randomDomain }`;
};

export const payments: Payment[] = Array.from({ length: 100 }, (_) => {
    const randomName = uniqueNamesGenerator(config);

    return {
        amount: Math.floor(Math.random() * 10000) / 100,
        clientName: randomName,
        email: randomEmail(randomName.toLowerCase()),
        id: uuidV4(),
        status: randomStatus(),
    };
});
