import { MemoryRouter } from "react-router";
import useCreateMeal from "@/hooks/useCreateMeal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";

const navigate = vi.fn();

vi.mock("react-router", async () => {
  const actual =
    await vi.importActual<typeof import("react-router")>("react-router");

  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MemoryRouter>
  );

  return { queryClient, wrapper };
};

describe("useCreateMeal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    navigate.mockReset();
  });

  it("should invalidate meals query, show success toast, and hit the msw POST handler", async () => {
    const postSpy = vi.fn();

    server.use(
      http.post("/api/meals/create", async () => {
        postSpy();

        return HttpResponse.json({
          _id: "meal-1",
          name: "Example meal",
          mealType: "lunch",
          weight: 400,
          kcal: 100,
          macros: {
            proteins: 10,
            carbs: 10,
            fats: 10,
            fiber: 10,
          },
          date: "2026-06-29",
        });
      }),
    );

    const { queryClient, wrapper } = createWrapper();
    const invalidateQueriesSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useCreateMeal(), { wrapper });

    act(() => {
      result.current.mutateCreateMeal({
        name: "Example meal",
        mealType: "lunch",
        weight: 400,
        kcal: 100,
        proteins: 10,
        carbs: 10,
        fats: 10,
        fiber: 10,
        date: new Date("2026-06-29T00:00:00.000Z"),
      });
    });

    await waitFor(() => expect(postSpy).toHaveBeenCalledTimes(1));

    await waitFor(() => {
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({
        queryKey: ["meals", "2026-06-29"],
      });
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Success!", {
        description: "Meal was created!",
      });
    });

    expect(navigate).toHaveBeenCalledWith("/meals?date=2026-06-29");
  });
});
