import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { mockObjects, mockUsers } from '@/data/mockData';

const statusColors = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-700',
  maintenance: 'bg-orange-100 text-orange-700',
};

const statusLabels = {
  active: 'Активен',
  inactive: 'Неактивен',
  maintenance: 'На обслуживании',
};

export default function Objects() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredObjects = mockObjects.filter(
    (obj) =>
      obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obj.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obj.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getUserName = (userId: string) => {
    return mockUsers.find((u) => u.id === userId)?.name || 'Не указан';
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Объекты</h1>
          <p className="text-muted-foreground mt-1">Управление обслуживаемыми объектами</p>
        </div>
        <Button className="gap-2">
          <Icon name="Plus" size={18} />
          Добавить объект
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск объектов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Icon name="Filter" size={18} />
              Фильтры
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredObjects.map((object) => (
          <Card key={object.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-1">{object.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{object.type}</p>
                </div>
                <Badge className={statusColors[object.status]}>{statusLabels[object.status]}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <Icon name="MapPin" size={18} className="text-muted-foreground mt-0.5" />
                <p className="text-sm flex-1">{object.address}</p>
              </div>

              {object.description && (
                <div className="flex items-start gap-2">
                  <Icon name="FileText" size={18} className="text-muted-foreground mt-0.5" />
                  <p className="text-sm text-muted-foreground flex-1">{object.description}</p>
                </div>
              )}

              {object.responsible && (
                <div className="flex items-center gap-2">
                  <Icon name="User" size={18} className="text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{getUserName(object.responsible)}</p>
                </div>
              )}

              <div className="pt-4 border-t grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{object.requestsCount}</p>
                  <p className="text-xs text-muted-foreground">Заявок</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{object.tasksCount}</p>
                  <p className="text-xs text-muted-foreground">Задач</p>
                </div>
              </div>

              <Button variant="outline" className="w-full gap-2">
                <Icon name="Eye" size={18} />
                Подробнее
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
