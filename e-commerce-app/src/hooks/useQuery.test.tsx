import { renderHook, act } from "@testing-library/react";
import useQuery from "./useQuery";

describe("useQuery", () => {
  it("should set products and loading states correctly on success", async () => {
    const mockFetch = vi.fn().mockResolvedValue(["item1", "item2"]);
    // Enable the effect for this test
    const { result } = renderHook(() => useQuery(mockFetch, [], []));

    // Manually call fetchProducts since useEffect is commented out
    await act(async () => {
      await result.current.reset();
    });

    expect(result.current.products).toEqual(["item1", "item2"]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should set error and loading states correctly on failure", async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error("fail!"));
    const { result } = renderHook(() => useQuery(mockFetch, [], []));

    await act(async () => {
      await result.current.reset();
    });

    expect(result.current.products).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error.message).toBe("fail!");
  });
});
