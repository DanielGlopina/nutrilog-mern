import { describe, expect, it, vi, beforeEach } from "vitest";
import { toast } from "sonner";
import axios from "axios";
import { queryErrorHandler } from "@/lib/queryErrorHandler";

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("queryErrorHandler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return toast with default error", () => {
    queryErrorHandler(new Error("Some random error"));

    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith("Error!", {
      description: "Unexpected error",
    });
  });

  it("should return toast.error with axios error message", () => {
    const axiosError = {
      isAxiosError: true,
      response: {
        data: {
          errors: [{ msg: "Custom axios error message" }],
        },
      },
    };

    vi.spyOn(axios, "isAxiosError").mockReturnValue(true);

    queryErrorHandler(axiosError);

    expect(toast.error).toHaveBeenCalledWith("Error!", {
      description: "Custom axios error message",
    });
  });
});
