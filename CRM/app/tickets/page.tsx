'use client';

import useSWR from 'swr';
import { SWRKeys, fetcher } from '@/lib/swr';
import { TicketStatus, TicketPriority } from '@/types';

export default function TicketsPage() {
  const { data: tickets } = useSWR(SWRKeys.tickets, fetcher.tickets, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000,
  });

  const getStatusBadge = (status: string) => {
    const classes: Record<string, string> = {
      [TicketStatus.Open]: 'badge-open',
      [TicketStatus.InProgress]: 'badge-inprogress',
      [TicketStatus.Resolved]: 'badge-resolved',
      [TicketStatus.Closed]: 'badge-closed',
    };
    return classes[status] || '';
  };

  const getPriorityBadge = (priority: string) => {
    const classes: Record<string, string> = {
      [TicketPriority.Low]: 'badge-low',
      [TicketPriority.Medium]: 'badge-medium',
      [TicketPriority.High]: 'badge-high',
      [TicketPriority.Critical]: 'badge-critical',
    };
    return classes[priority] || '';
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>Tickets de Soporte</h2>
        <p style={{ color: '#666' }}>Total: {tickets?.length || 0}</p>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Estado</th>
              <th>Prioridad</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>
            {tickets?.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td><span className={`badge ${getStatusBadge(ticket.status)}`}>{ticket.status}</span></td>
                <td><span className={`badge ${getPriorityBadge(ticket.priority)}`}>{ticket.priority}</span></td>
                <td>{ticket.category}</td>
              </tr>
            ))}
            {(!tickets || tickets.length === 0) && (
              <tr><td colSpan={4} style={{ textAlign: 'center' }}>No hay tickets</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
