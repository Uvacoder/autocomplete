import { renderHook, act } from "@testing-library/react-hooks";
import { useAutoComplete } from "./useAutoComplete";

test("should return results", async () => {
  const { result, waitForValueToChange } = renderHook(() => useAutoComplete(3));

  await act(async () => {
    await result.current.updateField("keyword", "Zonda", true);
  });
  await waitForValueToChange(() => {
    return result.current.results;
  });
  expect(result.current.results?.length).toBeGreaterThan(0);
  expect(result.current.results[0].name).toContain("Zonda");
});

test("should return have saved Query", async () => {
  const { result, waitForValueToChange } = renderHook(() => useAutoComplete(3));

  await act(async () => {
    expect(result.current.searching).toBe(false);
    await result.current.updateQuery("Zonda", true);
  });
  await waitForValueToChange(() => {
    return result.current.searching;
  });
  expect(result.current.searching).toBe(true);
  await waitForValueToChange(() => {
    return result.current.results;
  });
  expect(result.current.results?.length).toBeGreaterThan(0);
  expect(result.current.showSavedKeywords).toBe(true);
  expect(result.current.savedKeywords[0]).toContain("Zonda");

  await act(async () => {
    expect(result.current.searching).toBe(false);
    await result.current.updateQuery("Anne", true);
  });
  await waitForValueToChange(() => {
    return result.current.savedKeywords;
  });
  expect(result.current.savedKeywords.length).toBe(2);
  expect(result.current.savedKeywords).toEqual(["Anne", "Zonda"]);
});
