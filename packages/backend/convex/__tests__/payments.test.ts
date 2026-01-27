/**
 * Payment Actions Tests
 *
 * Tests for payment-related actions including:
 * - createCheckout: Create Dodo Payments checkout session
 * - getCustomerPortal: Get customer portal link
 */

import { describe, test, expect, vi, beforeEach } from "vitest";
import { createMockCtx } from "./setup";

// Mock Dodo Payments
vi.mock("../dodo", () => ({
  checkout: vi.fn(),
  customerPortal: vi.fn(),
}));

describe("Payment Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createCheckout", () => {
    test("should create checkout session successfully", async () => {
      const ctx = createMockCtx();
      const mockCheckoutSession = {
        checkout_url: "https://checkout.dodopayments.com/session_123",
        session_id: "session_123",
      };

      const { checkout } = await import("../dodo");
      (checkout as any).mockResolvedValue(mockCheckoutSession);

      const { createCheckout } = await import("../payments");
      const result = await createCheckout.handler(ctx, {
        product_cart: [{ product_id: "prod_123", quantity: 1 }],
        returnUrl: "https://app.qurious.ai/success",
      });

      expect(result).toEqual(mockCheckoutSession);
      expect(checkout).toHaveBeenCalledWith(ctx, {
        payload: {
          product_cart: [{ product_id: "prod_123", quantity: 1 }],
          return_url: "https://app.qurious.ai/success",
          billing_currency: "USD",
          feature_flags: {
            allow_discount_code: true,
          },
        },
      });
    });

    test("should throw error when checkout_url is missing", async () => {
      const ctx = createMockCtx();
      const { checkout } = await import("../dodo");
      (checkout as any).mockResolvedValue({ session_id: "session_123" });

      const { createCheckout } = await import("../payments");

      await expect(
        createCheckout.handler(ctx, {
          product_cart: [{ product_id: "prod_123", quantity: 1 }],
        }),
      ).rejects.toThrow("Checkout session did not return a checkout_url");
    });

    test("should handle Dodo Payments API errors", async () => {
      const ctx = createMockCtx();
      const { checkout } = await import("../dodo");
      (checkout as any).mockRejectedValue(new Error("API Error"));

      const { createCheckout } = await import("../payments");

      await expect(
        createCheckout.handler(ctx, {
          product_cart: [{ product_id: "prod_123", quantity: 1 }],
        }),
      ).rejects.toThrow("Unable to create checkout session. Please try again.");
    });

    test("should handle multiple products in cart", async () => {
      const ctx = createMockCtx();
      const mockCheckoutSession = {
        checkout_url: "https://checkout.dodopayments.com/session_123",
      };

      const { checkout } = await import("../dodo");
      (checkout as any).mockResolvedValue(mockCheckoutSession);

      const { createCheckout } = await import("../payments");
      await createCheckout.handler(ctx, {
        product_cart: [
          { product_id: "prod_100_credits", quantity: 1 },
          { product_id: "prod_500_credits", quantity: 2 },
        ],
        returnUrl: "https://app.qurious.ai/success",
      });

      expect(checkout).toHaveBeenCalledWith(ctx, {
        payload: expect.objectContaining({
          product_cart: [
            { product_id: "prod_100_credits", quantity: 1 },
            { product_id: "prod_500_credits", quantity: 2 },
          ],
        }),
      });
    });

    test("should work without return URL", async () => {
      const ctx = createMockCtx();
      const mockCheckoutSession = {
        checkout_url: "https://checkout.dodopayments.com/session_123",
      };

      const { checkout } = await import("../dodo");
      (checkout as any).mockResolvedValue(mockCheckoutSession);

      const { createCheckout } = await import("../payments");
      await createCheckout.handler(ctx, {
        product_cart: [{ product_id: "prod_123", quantity: 1 }],
      });

      expect(checkout).toHaveBeenCalledWith(ctx, {
        payload: expect.objectContaining({
          product_cart: [{ product_id: "prod_123", quantity: 1 }],
          return_url: undefined,
          billing_currency: "USD",
        }),
      });
    });
  });

  describe("getCustomerPortal", () => {
    test("should get customer portal link successfully", async () => {
      const ctx = createMockCtx();
      const mockPortal = {
        portal_url: "https://portal.dodopayments.com/customer_123",
      };

      const { customerPortal } = await import("../dodo");
      (customerPortal as any).mockResolvedValue(mockPortal);

      const { getCustomerPortal } = await import("../payments");
      const result = await getCustomerPortal.handler(ctx, {});

      expect(result).toEqual(mockPortal);
      expect(customerPortal).toHaveBeenCalledWith(ctx, {});
    });

    test("should throw error when portal_url is missing", async () => {
      const ctx = createMockCtx();
      const { customerPortal } = await import("../dodo");
      (customerPortal as any).mockResolvedValue({});

      const { getCustomerPortal } = await import("../payments");

      await expect(getCustomerPortal.handler(ctx, {})).rejects.toThrow(
        "Customer portal did not return a portal_url",
      );
    });

    test("should handle API errors", async () => {
      const ctx = createMockCtx();
      const { customerPortal } = await import("../dodo");
      (customerPortal as any).mockRejectedValue(new Error("API Error"));

      const { getCustomerPortal } = await import("../payments");

      await expect(getCustomerPortal.handler(ctx, {})).rejects.toThrow(
        "Unable to generate customer portal link. Please try again.",
      );
    });

    test("should support send_email option", async () => {
      const ctx = createMockCtx();
      const mockPortal = {
        portal_url: "https://portal.dodopayments.com/customer_123",
      };

      const { customerPortal } = await import("../dodo");
      (customerPortal as any).mockResolvedValue(mockPortal);

      const { getCustomerPortal } = await import("../payments");
      await getCustomerPortal.handler(ctx, { send_email: true });

      expect(customerPortal).toHaveBeenCalledWith(ctx, { send_email: true });
    });
  });
});
