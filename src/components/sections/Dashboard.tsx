import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { mockDashboardStats, mockRequests, mockTasks } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const stats = [
  {
    title: 'Всего заявок',
    value: mockDashboardStats.totalRequests,
    icon: 'FileText',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    title: 'Активные заявки',
    value: mockDashboardStats.activeRequests,
    icon: 'AlertCircle',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    title: 'Завершено заявок',
    value: mockDashboardStats.completedRequests,
    icon: 'CheckCircle',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    title: 'Активные задачи',
    value: mockDashboardStats.totalTasks - mockDashboardStats.completedTasks,
    icon: 'ListTodo',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
];

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
  todo: 'bg-gray-100 text-gray-700',
  review: 'bg-orange-100 text-orange-700',
  done: 'bg-green-100 text-green-700',
};

export default function Dashboard() {
  const activeRequests = mockRequests.filter((r) => r.status === 'in_progress' || r.status === 'new').slice(0, 5);
  const activeTasks = mockTasks.filter((t) => t.status === 'in_progress' || t.status === 'todo').slice(0, 5);

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Панель управления</h1>
        <p className="text-muted-foreground mt-1">Обзор текущего состояния системы</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon name={stat.icon as any} size={24} className={stat.color} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="FileText" size={20} />
              Активные заявки
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium flex-1">{request.title}</h4>
                    <Badge className={priorityColors[request.priority]}>{request.priority}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{request.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <Badge variant="outline" className={statusColors[request.status]}>
                      {request.status}
                    </Badge>
                    <span className="text-muted-foreground">
                      {new Date(request.createdAt).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="CheckSquare" size={20} />
              Текущие задачи
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium flex-1">{task.title}</h4>
                    <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Прогресс</span>
                      <span className="font-medium">{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
