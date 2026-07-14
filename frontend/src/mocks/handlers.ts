import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/meals/create", async () => {
    return HttpResponse.json({
      user: "666fe31441f59e2fae6d27d1",
      name: "Example meal",
      mealType: "lunch",
      weight: 400,
      kcal: 100,
      macros: {
        proteins: 10,
        fats: 10,
        carbs: 10,
        fiber: 10,
      },
      date: "2026-06-29T00:00:00.000Z",
      _id: "676767538a355abedbbde589",
      createdAt: "2026-07-04T09:16:03.299Z",
      updatedAt: "2026-07-04T09:16:03.299Z",
    });
  }),
];
