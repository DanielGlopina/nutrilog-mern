import type { MealType } from "@/types/MealType.type";

export const dummyMeals = [
    {
        _id: '6a33ca25812f0d9c883e967',
        name: "Pasta with tuna",
        mealType: "breakfast" as MealType,
        weight: 667,
        kcal: 140,
        macros: {
            proteins: 60,
            carbs: 90,
            fats: 67,
            fiber: 67
        },
        date: new Date(),
    },
    {
        _id: '6a33ca25812f0d9c233e967',
        name: "Salad with shrimps",
        mealType: "dinner" as MealType,
        weight: 667,
        kcal: 140,
        macros: {
            proteins: 60,
            carbs: 90,
            fats: 67,
            fiber: 67
        },
        date: new Date(),
    },
    {
        _id: '6a33ca253233f0d9c883e967',
        name: "Salad with shrimps",
        mealType: "dinner" as MealType,
        weight: 667,
        kcal: 140,
        macros: {
            proteins: 60,
            carbs: 90,
            fats: 67,
            fiber: 67
        },
        date: new Date(),
    },
    {
        _id: '6a33c6767672f0d9c883e967',
        name: "Potatoes fries",
        mealType: "snack" as MealType,
        weight: 667,
        kcal: 140,
        macros: {
            proteins: 60,
            carbs: 90,
            fats: 67,
            fiber: 67
        },
        date: new Date(),
    }
]