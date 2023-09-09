import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export type MenuType = {
  id: number;
  slug: string;
  title: string;
  desc?: string;
  img?: string;
  color: string;
}[];

export type ProductType = {
  id: String | any;
  title: String;
  desc?: String;
  img?: String | any;
  price: number;
  options?: { title: string; additionalPrice: number }[];
};
