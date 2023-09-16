'use client';
import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ConfettiExplosion from 'react-confetti-explosion';
import { useCartStore } from '@/utils/store';
const SuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { reset } = useCartStore();
  const payment_intent = searchParams.get('payment_intent');

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await fetch(`/api/confirm/${payment_intent}`, {
          method: 'PUT',
        });
        setTimeout(() => {
          router.push('/orders');
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
    reset();
  }, [payment_intent, router, reset]);
  return (
    <div>
      <div className=' min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-green-700'>
        <p className=' max-w-[600px]'>
          Payment successful. You are being redirected to the orders page.
          Please do not close the page.
        </p>
        <ConfettiExplosion className=' absolute m-auto' />
      </div>
    </div>
  );
};

export default SuccessPage;
