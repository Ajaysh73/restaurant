import { OrderType } from '@/app/types/types';
import { prisma } from '@/utils/connect';
import { NextRequest, NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export const POST = async (
  request: NextRequest,
  { params }: { params: { orderId: string } }
) => {
  const { orderId } = params;
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });
  console.log(order);
  if (order) {
    const price = order.price;
    if (typeof price === 'number') {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: price * 100,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      });
      console.log(paymentIntent);
      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: { intent_id: paymentIntent.id },
      });

      return new NextResponse(
        JSON.stringify({ clientSecret: paymentIntent.client_secret }),
        { status: 200 }
      );
    }
  }

  return new NextResponse(JSON.stringify({ message: 'Order not found!.' }), {
    status: 404,
  });
};
