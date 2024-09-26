import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  // const userSubscription = await prismadb.userSubscription.findUnique({
  //   where: {
  //     userId: userId,
  //   },
  //   select: {
  //     stripeSubscriptionId: true,
  //     stripeCurrentPeriodEnd: true,
  //     stripeCustomerId: true,
  //     stripePriceId: true,
  //   },
  // })
  const userSubscription = {
    id: 1,
    userId: userId,
    stripeSubscriptionId: "sub_123",
    stripeCurrentPeriodEnd: new Date(),
    stripeCustomerId: "cus_123",
    stripePriceId: "price_123",
  }

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  return !!isValid;
};