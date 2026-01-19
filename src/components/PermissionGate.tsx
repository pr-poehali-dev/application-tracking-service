import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

interface PermissionGateProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallback?: ReactNode;
}

export default function PermissionGate({ children, allowedRoles, fallback }: PermissionGateProps) {
  const { hasRole } = useAuth();

  if (!hasRole(allowedRoles)) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <Icon name="ShieldAlert" size={20} />
          <AlertTitle>Доступ запрещен</AlertTitle>
          <AlertDescription>
            У вас нет прав для просмотра этого раздела. Обратитесь к администратору системы.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
}
