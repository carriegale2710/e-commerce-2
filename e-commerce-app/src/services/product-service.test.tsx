import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAllProducts } from "./product-services";
import { getDocs } from "firebase/firestore";

// Mock Firestore's getDocs
vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  getDocs: vi.fn(),
  getFirestore: vi.fn(),
  //   doc: vi.fn(),
  //   getDoc: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getAllProducts", () => {
  it("Should return an empty array when no/empty results are returned", async () => {
    getDocs.mockResolvedValue({ docs: [] });
    await expect(getAllProducts()).resolves.toEqual([]);
  });

  it("Should return an array of results when everything is good", async () => {
    getDocs.mockResolvedValue({
      docs: [
        {
          id: "1",
          data: () => ({
            id: "1",
            name: "Product 1",
            price: 10,
            variants: [],
            imgURL: [],
            stock: [],
            rating: 5,
          }),
        },
        {
          id: "2",
          data: () => ({
            id: "2",
            name: "Product 2",
            price: 20,
            variants: [],
            imgURL: [],
            stock: [],
            rating: 5,
          }),
        },
      ],
    });
    const result = await getAllProducts();
    expect(result.length).toBe(2);
    expect(result[0].name).toBe("Product 1");
  });

  it("Should throw an error when getDocs throws", async () => {
    getDocs.mockRejectedValue(new Error("Firestore error"));
    await expect(getAllProducts()).rejects.toThrow(
      "Error fetching products: Firestore error"
    );
  });
});

//NOTE
//remember that async functions return promises
// - you must wait for resolution to happen first
//dealing with async in tests
//fetch is a function, but it exists on an object to , Window
//we can spy on fetch and mock its resolve value - axios
// we just care that ok is false
