import { NextResponse } from 'next/server';
import { lemonsqueezy } from '@/lib/lemonsqueezy';

export async function POST(req: Request) {
  const { userId, planId } = await req.json();

  try {
    const checkout = await lemonsqueezy.createCheckout({
      storeId: 'your_store_id',
      variantId: planId,
      customData: {
        userId: userId,
      },
      checkoutOptions: {
        embed: true,
      },
    });

    return NextResponse.json({ checkoutUrl: checkout.data.attributes.url });
  } catch (error) {
    console.error('Error creating checkout:', error);
    return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 });
  }
}