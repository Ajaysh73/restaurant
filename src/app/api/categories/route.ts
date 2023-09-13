import { NextResponse } from 'next/server';
import { prisma } from '@/utils/connect';

export const GET = async () => {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    const categories = await prisma.category.findMany();
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ Message: 'something went bad' }), {
      status: 500,
    });
  }
};
