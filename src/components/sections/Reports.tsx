import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { mockRequests, mockTasks, mockObjects } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

export default function Reports() {
  const requestsByStatus = {
    new: mockRequests.filter((r) => r.status === 'new').length,
    in_progress: mockRequests.filter((r) => r.status === 'in_progress').length,
    pending: mockRequests.filter((r) => r.status === 'pending').length,
    completed: mockRequests.filter((r) => r.status === 'completed').length,
    cancelled: mockRequests.filter((r) => r.status === 'cancelled').length,
  };

  const tasksByStatus = {
    todo: mockTasks.filter((t) => t.status === 'todo').length,
    in_progress: mockTasks.filter((t) => t.status === 'in_progress').length,
    review: mockTasks.filter((t) => t.status === 'review').length,
    done: mockTasks.filter((t) => t.status === 'done').length,
  };

  const objectsByStatus = {
    active: mockObjects.filter((o) => o.status === 'active').length,
    inactive: mockObjects.filter((o) => o.status === 'inactive').length,
    maintenance: mockObjects.filter((o) => o.status === 'maintenance').length,
  };

  const requestsByPriority = {
    low: mockRequests.filter((r) => r.priority === 'low').length,
    medium: mockRequests.filter((r) => r.priority === 'medium').length,
    high: mockRequests.filter((r) => r.priority === 'high').length,
    critical: mockRequests.filter((r) => r.priority === 'critical').length,
  };

  const avgTaskProgress = Math.round(mockTasks.reduce((sum, t) => sum + t.progress, 0) / mockTasks.length);

  const reportTypes = [
    { id: 'requests', title: 'Отчет по заявкам', icon: 'FileText', description: 'Статистика обработки заявок' },
    { id: 'tasks', title: 'Отчет по задачам', icon: 'CheckSquare', description: 'Анализ выполнения задач' },
    { id: 'objects', title: 'Отчет по объектам', icon: 'Building2', description: 'Состояние объектов' },
    { id: 'users', title: 'Отчет по пользователям', icon: 'Users', description: 'Активность пользователей' },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Отчеты</h1>
          <p className="text-muted-foreground mt-1">Аналитика и статистика системы</p>
        </div>
        <Button className="gap-2">
          <Icon name="Download" size={18} />
          Экспорт отчетов
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Всего заявок</p>
                <p className="text-3xl font-bold">{mockRequests.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Icon name="FileText" size={24} className="text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Всего задач</p>
                <p className="text-3xl font-bold">{mockTasks.length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Icon name="CheckSquare" size={24} className="text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Объектов</p>
                <p className="text-3xl font-bold">{mockObjects.length}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Icon name="Building2" size={24} className="text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Ср. прогресс задач</p>
                <p className="text-3xl font-bold">{avgTaskProgress}%</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Icon name="TrendingUp" size={24} className="text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="FileText" size={20} />
              Заявки по статусам
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(requestsByStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className="text-sm capitalize">{status.replace('_', ' ')}</span>
                <Badge variant="outline">{count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="AlertTriangle" size={20} />
              Заявки по приоритету
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(requestsByPriority).map(([priority, count]) => (
              <div key={priority} className="flex items-center justify-between">
                <span className="text-sm capitalize">{priority}</span>
                <Badge variant="outline">{count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="CheckSquare" size={20} />
              Задачи по статусам
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(tasksByStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className="text-sm capitalize">{status.replace('_', ' ')}</span>
                <Badge variant="outline">{count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Доступные типы отчетов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((report) => (
              <div
                key={report.id}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Icon name={report.icon as any} size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{report.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Icon name="Download" size={14} />
                      Скачать
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
