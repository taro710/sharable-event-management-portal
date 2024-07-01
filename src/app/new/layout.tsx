import { Metadata } from 'next';

import { PAGE_META } from '@/constants/pathname';

const PageLayout = ({ children }: { children: React.ReactNode }) => children;

export const metadata: Metadata = PAGE_META['/new'];

export default PageLayout;
