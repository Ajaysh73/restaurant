import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/utils/connect';
// import { Product } from '@prisma/client';

// GET ALL PRODUCTS
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get('cat');
  try {
    const databaseUrl = process.env.DATABASE_URL;
    console.log(`Database URL: ${databaseUrl}`);
    const products = await prisma.product.findMany({
      where: {
        ...(cat ? { catSlug: cat } : { isFeatured: true }),
      },
    });

    console.log(products);
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ Message: 'something went bad' }), {
      status: 500,
    });
  }
};
