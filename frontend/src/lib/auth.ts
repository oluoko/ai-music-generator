import { db } from "@/server/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { polar, checkout, portal, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { env } from "@/env";

const polarClient = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN,
  server: "sandbox",
});

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "c37323eb-9d27-4851-aefc-801936feec3e",
              slug: "small-pack",
            },
            {
              productId: "c6d7906e-95eb-44f1-a3bd-3eaa4df381d7",
              slug: "medium-pack",
            },
            {
              productId: "101652b9-9daa-4288-ad2d-76f23125adc5",
              slug: "large-pack",
            },
          ],
          successUrl: "/dashboard",
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          secret: env.POLAR_WEBHOOK_SECRET,
          onOrderPaid: async (order) => {
            const externalCustomerId = order.data.customer.externalId;

            if (!externalCustomerId) {
              console.error("No external customer ID found");
              throw new Error("No external customer ID found");
            }

            const productId = order.data.product.id;

            let creditsToAdd = 0;

            switch (productId) {
              case "c37323eb-9d27-4851-aefc-801936feec3e":
                creditsToAdd = 100;
                break;
              case "c6d7906e-95eb-44f1-a3bd-3eaa4df381d7":
                creditsToAdd = 300;
                break;
              case "101652b9-9daa-4288-ad2d-76f23125adc5":
                creditsToAdd = 500;
                break;
              default:
                console.error("Unknown product ID");
                throw new Error("Unknown product ID");
            }

            await db.user.update({
              where: { id: externalCustomerId },
              data: {
                credits: {
                  increment: creditsToAdd,
                },
              },
            });
          },
        }),
      ],
    }),
  ],
});
