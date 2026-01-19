import { useState } from 'react';
import Layout from '@/components/Layout';
import Dashboard from '@/components/sections/Dashboard';
import Requests from '@/components/sections/Requests';
import Objects from '@/components/sections/Objects';
import Tasks from '@/components/sections/Tasks';
import Users from '@/components/sections/Users';
import Reports from '@/components/sections/Reports';
import Settings from '@/components/sections/Settings';
import PermissionGate from '@/components/PermissionGate';

export default function Index() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'requests':
        return <Requests />;
      case 'objects':
        return <Objects />;
      case 'tasks':
        return <Tasks />;
      case 'users':
        return (
          <PermissionGate allowedRoles={['admin', 'manager']}>
            <Users />
          </PermissionGate>
        );
      case 'reports':
        return <Reports />;
      case 'settings':
        return (
          <PermissionGate allowedRoles={['admin']}>
            <Settings />
          </PermissionGate>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderSection()}
    </Layout>
  );
}