import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { mockRequests, mockUsers } from '@/data/mockData';
import { Request } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

const priorityColors = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-blue-100 text-blue-700',
  high: 'bg-orange-100 text-orange-700',
  critical: 'bg-red-100 text-red-700',
};

const statusColors = {
  new: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-yellow-100 text-yellow-700',
  pending: 'bg-purple-100 text-purple-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-gray-100 text-gray-700',
};

const statusLabels = {
  new: 'Новая',
  in_progress: 'В работе',
  pending: 'Ожидание',
  completed: 'Завершена',
  cancelled: 'Отменена',
};

export default function Requests() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const { hasRole } = useAuth();

  const filteredRequests = mockRequests.filter(
    (request) =>
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getUserName = (userId: string) => {
    return mockUsers.find((u) => u.id === userId)?.name || 'Не указан';
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Заявки</h1>
          <p className="text-muted-foreground mt-1">Управление заявками на обслуживание</p>
        </div>
        {hasRole(['admin', 'manager']) && (
          <Button className="gap-2">
            <Icon name="Plus" size={18} />
            Создать заявку
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск заявок..."
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
        <CardContent>
          <div className="space-y-3">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                onClick={() => setSelectedRequest(request)}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-all cursor-pointer hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{request.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{request.description}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Badge className={priorityColors[request.priority]}>{request.priority}</Badge>
                    <Badge variant="outline" className={statusColors[request.status]}>
                      {statusLabels[request.status]}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icon name="User" size={16} />
                    <span>Создал: {getUserName(request.createdBy)}</span>
                  </div>
                  {request.assignedTo && (
                    <div className="flex items-center gap-2">
                      <Icon name="UserCheck" size={16} />
                      <span>Исполнитель: {getUserName(request.assignedTo)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={16} />
                    <span>{new Date(request.createdAt).toLocaleString('ru-RU')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedRequest?.title}</DialogTitle>
            <DialogDescription className="flex gap-2 mt-2">
              <Badge className={priorityColors[selectedRequest?.priority || 'low']}>
                {selectedRequest?.priority}
              </Badge>
              <Badge variant="outline" className={statusColors[selectedRequest?.status || 'new']}>
                {statusLabels[selectedRequest?.status || 'new']}
              </Badge>
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Описание</h4>
                <p className="text-muted-foreground">{selectedRequest?.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Создал</h4>
                  <p className="text-muted-foreground">{getUserName(selectedRequest?.createdBy || '')}</p>
                </div>
                {selectedRequest?.assignedTo && (
                  <div>
                    <h4 className="font-semibold mb-2">Исполнитель</h4>
                    <p className="text-muted-foreground">{getUserName(selectedRequest.assignedTo)}</p>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold mb-2">Создана</h4>
                  <p className="text-muted-foreground">
                    {selectedRequest && new Date(selectedRequest.createdAt).toLocaleString('ru-RU')}
                  </p>
                </div>
                {selectedRequest?.deadline && (
                  <div>
                    <h4 className="font-semibold mb-2">Срок</h4>
                    <p className="text-muted-foreground">
                      {new Date(selectedRequest.deadline).toLocaleString('ru-RU')}
                    </p>
                  </div>
                )}
              </div>

              {selectedRequest?.comments && selectedRequest.comments.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Комментарии</h4>
                  <div className="space-y-3">
                    {selectedRequest.comments.map((comment) => (
                      <div key={comment.id} className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{getUserName(comment.author)}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleString('ru-RU')}
                          </span>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button className="flex-1 gap-2">
                  <Icon name="MessageSquare" size={18} />
                  Добавить комментарий
                </Button>
                <Button variant="outline" className="gap-2">
                  <Icon name="Edit" size={18} />
                  Редактировать
                </Button>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}