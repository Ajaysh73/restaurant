import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/utils/connect';
// import { Product } from '@prisma/client';

// GET ALL PRODUCTS
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get('cat');
  try {
    const databaseUrl = process.env.DATABASE_URL;
    const products = await prisma.product.findMany({
      where: {
        ...(cat ? { catSlug: cat } : { isFeatured: true }),
      },
    });

    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ Message: 'something went bad' }), {
      status: 500,
    });
  }
};
// CREATE A PRODUCT
export const POST = async (req: NextRequest) => {
  console.log('in POST');
  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: body,
    });

    return new NextResponse(JSON.stringify(product), { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ Message: 'something went bad' }), {
      status: 500,
    });
  }
};
