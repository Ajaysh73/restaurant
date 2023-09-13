'use client';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { OrderType } from '../types/types';
import { toast } from 'react-toastify';

const OrdersPage = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const { isLoading, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () => fetch('/api/orders').then((res) => res.json()),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(status),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value;
    mutation.mutate({ id, status });
    toast.success('The order status has been updated!');
  };

  if (isLoading || status === 'loading') return 'Loading...';
  if (status === 'unauthenticated') {
    return router.push('/');
  }
  return (
    <div className='p-4 lg:px-20 xl:px-40'>
      <table className=' w-full border-separate border-spacing-3'>
        <thead>
          <tr className='text-left'>
            <th className=' hidden md:block'>Order Id</th>
            <th>Date</th>
            <th>Price</th>
            <th className=' hidden md:block'>Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: OrderType) => (
            <tr
              className={`${
                item.status !== 'delivered' && 'bg-red-50'
              } text-sm md:text-base`}
              key={item.id}>
              <td className=' hidden md:block py-8 px-1'>{item.id}</td>
              <td className='py-6 px-1 md:items-center'>
                {item.createdAt.toString().slice(0, 10)}
              </td>
              <td className='py-6 px-1'>{item.price}</td>
              <td className=' hidden md:block py-7 px-1'>
                {item.products[0].title}
              </td>
              {session?.user?.isAdmin ? (
                <td className='py-6 px-1'>
                  <form
                    className='flex items-center justify-center gap-4'
                    onSubmit={(e) => handleUpdate(e, item.id)}>
                    <input
                      className=' p-2 ring-1 ring-red-100 rounded-md'
                      placeholder={item.status}></input>
                    <button className=' bg-red-500 p-2 rounded-full'>
                      <Image
                        src='/edit.png'
                        alt=''
                        width={20}
                        height={20}
                      />
                    </button>
                  </form>
                </td>
              ) : (
                <td className='py-6 px-1'>{item.status}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
