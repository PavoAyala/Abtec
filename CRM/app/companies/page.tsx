'use client';

import useSWR from 'swr';
import { SWRKeys, fetcher } from '@/lib/swr';

export default function CompaniesPage() {
  const { data: companies } = useSWR(SWRKeys.companies, fetcher.companies, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000,
  });

  return (
    <div className="container">
      <div className="page-header">
        <h2>Empresas</h2>
        <p style={{ color: '#666' }}>Total: {companies?.length || 0}</p>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Industria</th>
              <th>Tamaño</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            {companies?.map((company) => (
              <tr key={company.id}>
                <td>{company.name}</td>
                <td>{company.industry}</td>
                <td>{company.size}</td>
                <td>{company.website || '-'}</td>
              </tr>
            ))}
            {(!companies || companies.length === 0) && (
              <tr><td colSpan={4} style={{ textAlign: 'center' }}>No hay empresas</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
