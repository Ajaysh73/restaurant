'use client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
const DeleteButton = ({ id }: { id: string }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });
    if (res.status === 200) {
      router.push('/menu');
      toast.success('Product has been deleted.');
    } else {
      const data = await res.json();
      toast.error(data.message);
    }
  };

  if (status === 'loading') {
    return <p>Loading</p>;
  }
  if (status === 'unauthenticated' || !session?.user.isAdmin) {
    return;
  }
  return (
    <button
      className=' bg-red-400 p-2 rounded-full absolute top-4 right-4'
      onClick={handleDelete}>
      <Image
        src='/delete.png'
        alt=''
        width={30}
        height={30}
      />
    </button>
  );
};

export default DeleteButton;
