import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { currentUser } from '@/data/mockData';

interface LayoutProps {
  children: ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Главная', icon: 'LayoutDashboard' },
  { id: 'requests', label: 'Заявки', icon: 'FileText' },
  { id: 'objects', label: 'Объекты', icon: 'Building2' },
  { id: 'tasks', label: 'Задачи', icon: 'CheckSquare' },
  { id: 'users', label: 'Пользователи', icon: 'Users' },
  { id: 'reports', label: 'Отчеты', icon: 'BarChart3' },
  { id: 'settings', label: 'Настройки', icon: 'Settings' },
];

export default function Layout({ children, activeSection, onSectionChange }: LayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex h-screen bg-muted/30">
      <aside
        className={cn(
          'bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 flex flex-col',
          isSidebarCollapsed ? 'w-16' : 'w-64'
        )}
      >
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <Icon name="Rocket" size={20} className="text-sidebar-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">TaskFlow</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Icon name={isSidebarCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={20} />
          </Button>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                activeSection === item.id
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              )}
            >
              <Icon name={item.icon as any} size={20} />
              {!isSidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className={cn('flex items-center gap-3', isSidebarCollapsed && 'justify-center')}>
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                {getUserInitials(currentUser.name)}
              </AvatarFallback>
            </Avatar>
            {!isSidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{currentUser.name}</p>
                <p className="text-xs text-sidebar-foreground/60 truncate">{currentUser.role}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="h-full">{children}</div>
      </main>
    </div>
  );
}
