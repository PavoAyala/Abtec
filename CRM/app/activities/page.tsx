'use client';

import useSWR from 'swr';
import { SWRKeys, fetcher } from '@/lib/swr';
import { ActivityType } from '@/types';

export default function ActivitiesPage() {
  const { data: activities } = useSWR(SWRKeys.activities, fetcher.activities, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000,
  });

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      [ActivityType.Call]: '📞',
      [ActivityType.Email]: '✉️',
      [ActivityType.Meeting]: '📅',
      [ActivityType.Note]: '📝',
      [ActivityType.Task]: '✅',
    };
    return icons[type] || '📌';
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>Actividades</h2>
        <p style={{ color: '#666' }}>Total: {activities?.length || 0}</p>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Fecha Límite</th>
              <th>Completada</th>
            </tr>
          </thead>
          <tbody>
            {activities?.map((activity) => (
              <tr key={activity.id}>
                <td>{getTypeIcon(activity.type)} {activity.type}</td>
                <td>{activity.description}</td>
                <td>{activity.dueDate ? new Date(activity.dueDate).toLocaleDateString() : '-'}</td>
                <td>{activity.completedAt ? '✅' : '❌'}</td>
              </tr>
            ))}
            {(!activities || activities.length === 0) && (
              <tr><td colSpan={4} style={{ textAlign: 'center' }}>No hay actividades</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
