import type { ReactNode } from 'react';
import DashboardLayout from './DashboardLayout';

interface AdminLayoutProps {
  children: ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

export default AdminLayout;
