import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import MemberCenterLayout from '@/components/layout/member-center-layout';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return <></>;
}
Home.getLayout = MemberCenterLayout;
