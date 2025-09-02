import { faker } from "@faker-js/faker";
import type { UserType } from "../types";


export const generateFakeTableData = (count: number): UserType[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 0, max: 65 }),
        city: faker.location.city(),
    }))
}