/**
 * This file is responsible for creating an HTTP router that receives webhook updates from:
 * 1. Payment Merchant-of-Record (MoR) Provider (Dodo Payments)
 * 2. Authentication Provider (Clerk)
 *
 * The router handlers must validates incoming webhook signatures to ensure requests are legitimate
 * before processing them.
 */

import { httpRouter } from "convex/server";

import { clerkHandler } from "./httpActions/clerk";
// import { dodoHandler } from "./httpActions/dodoPayments";

const http = httpRouter();




// Payments Merchant-of-Records Provider
// http.route({
//   path: "/dodopayments-webhook",
//   method: "POST",
//   handler: dodoHandler,
// });

// Authentication Provider
http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: clerkHandler,
});

export default http;
