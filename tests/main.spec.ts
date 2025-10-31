import { test, expect } from "@playwright/test";

test.describe("Issue #3843: The others tab for selecting a service should function correctly", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3002");
  });

  test("should show dropdown when hovering over Others card", async ({
    page,
  }) => {
    // Find the Others card
    const othersCard = page
      .locator("div.relative")
      .filter({ hasText: "Others" })
      .first();

    // Hover over the Others card
    await othersCard.hover();

    // Wait a bit for the dropdown animation
    await page.waitForTimeout(500);

    // Verify dropdown items are visible
    await expect(
      page.getByRole("heading", { name: "Design Service", level: 4 })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Swiss Turning", level: 4 })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Extrusion", level: 4 })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Engraving", level: 4 })
    ).toBeVisible();
  });

  test("should close dropdown when clicking away from Others card", async ({
    page,
  }) => {
    // Find the Others card
    const othersCard = page
      .locator("div.relative")
      .filter({ hasText: "Others" })
      .first();

    // Hover over the Others card to show dropdown
    await othersCard.hover();
    await page.waitForTimeout(500);

    // Verify dropdown is visible
    await expect(
      page.getByRole("heading", { name: "Design Service", level: 4 })
    ).toBeVisible();

    // Click away from the Others card (click on CNC Machining)
    await page
      .getByRole("heading", { name: "CNC Machining", level: 3 })
      .click();

    // Wait for the dropdown to disappear
    await page.waitForTimeout(500);

    // Verify dropdown items are no longer visible (or have pointer-events-none)
    const designServiceHeading = page.getByRole("heading", {
      name: "Design Service",
      level: 4,
    });
    // The dropdown should be hidden with pointer-events-none class
    const dropdownContainer = page
      .locator(".absolute.right-0.top-full")
      .first();
    await expect(dropdownContainer).toHaveClass(/pointer-events-none/);
  });

  test("should select item from Others dropdown and replace the Others card", async ({
    page,
  }) => {
    // Find the Others card
    const othersCard = page
      .locator("div.relative")
      .filter({ hasText: "Others" })
      .first();

    // Hover over the Others card to show dropdown
    await othersCard.hover();
    await page.waitForTimeout(500);

    // Verify dropdown is visible
    await expect(
      page.getByRole("heading", { name: "Design Service", level: 4 })
    ).toBeVisible();

    // Find and click the Design Service item in the dropdown
    const designServiceItem = page
      .locator("li")
      .filter({ hasText: "Design Service" });
    await designServiceItem.click();

    // Wait for the selection to process
    await page.waitForTimeout(500);

    // Verify that "Design Service" is now shown as a main card (level 3 heading)
    // and the "Others" card title has been replaced
    const mainCards = page.locator("div.grid > div.relative");
    const fourthCard = mainCards.nth(3);
    await expect(fourthCard.locator("h3")).toHaveText("Design Service");

    // Verify the fourth card is selected (has blue border)
    const fourthCardInner = fourthCard.locator("div.p-4").first();
    await expect(fourthCardInner).toHaveClass(/border-blue-500/);
  });

  test("should select another item from Others dropdown - Engraving", async ({
    page,
  }) => {
    // Find the Others card
    const othersCard = page
      .locator("div.relative")
      .filter({ hasText: "Others" })
      .first();

    // Hover over the Others card to show dropdown
    await othersCard.hover();
    await page.waitForTimeout(500);

    // Click the Engraving item
    const engravingItem = page.locator("li").filter({ hasText: "Engraving" });
    await engravingItem.click();

    // Wait for the selection to process
    await page.waitForTimeout(500);

    // Verify that "Engraving" is now shown as a main card
    const mainCards = page.locator("div.grid > div.relative");
    const fourthCard = mainCards.nth(3);
    await expect(fourthCard.locator("h3")).toHaveText("Engraving");

    // Verify the fourth card is selected (has blue border)
    const fourthCardInner = fourthCard.locator("div.p-4").first();
    await expect(fourthCardInner).toHaveClass(/border-blue-500/);
  });
});
