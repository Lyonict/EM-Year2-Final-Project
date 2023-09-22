export type Recipe = {
    "id": number,
    "titre": string,
    "description": string,
    "niveau": "padawan" | "maitre" | "jedi",
    "personnes": number,
    "tempsPreparation": number,
    "ingredients": Array<[string, string]>,
    "etapes": string[],
    "photo"?: string
}

// const t: Partial<Recipe> = {
//     id: 2,
//     titre: "jdhd",

// }

// console.log(t)