'use client';

import Link from 'next/link';
import useSWR from 'swr';
import { SWRKeys, fetcher } from '@/lib/swr';

export default function DashboardPage() {
  const { data: contacts } = useSWR(SWRKeys.contacts, fetcher.contacts, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000,
  });
  const { data: deals } = useSWR(SWRKeys.deals, fetcher.deals, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000,
  });
  const { data: dealStats } = useSWR(SWRKeys.dealsStats, fetcher.dealsStats, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000,
  });
  const { data: tickets } = useSWR(SWRKeys.tickets, fetcher.tickets, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000,
  });
  const { data: ticketStats } = useSWR(SWRKeys.ticketsStats, fetcher.ticketsStats, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000,
  });

  const stats = {
    totalContacts: contacts?.length || 0,
    totalDeals: deals?.length || 0,
    pipelineValue: dealStats?.totalValue || 0,
    openTickets: (ticketStats?.open || 0) + (ticketStats?.inProgress || 0),
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>Dashboard</h2>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Contactos</h4>
          <div className="value">{stats.totalContacts}</div>
        </div>
        <div className="stat-card">
          <h4>Total Deals</h4>
          <div className="value">{stats.totalDeals}</div>
        </div>
        <div className="stat-card">
          <h4>Pipeline Value</h4>
          <div className="value">${stats.pipelineValue.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <h4>Tickets Abiertos</h4>
          <div className="value">{stats.openTickets}</div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '20px' }}>Módulos del CRM</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          <Link href="/contacts" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h4>Contactos</h4>
            <p style={{ color: '#666' }}>Gestiona tus contactos y leads</p>
          </Link>
          <Link href="/companies" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h4>Empresas</h4>
            <p style={{ color: '#666' }}>Administra empresas y cuentas</p>
          </Link>
          <Link href="/deals" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h4>Pipeline</h4>
            <p style={{ color: '#666' }}>Gestiona tus oportunidades</p>
          </Link>
          <Link href="/tickets" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h4>Tickets</h4>
            <p style={{ color: '#666' }}>Sistema de soporte postventa</p>
          </Link>
          <Link href="/activities" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h4>Actividades</h4>
            <p style={{ color: '#666' }}>Tareas y seguimiento</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
