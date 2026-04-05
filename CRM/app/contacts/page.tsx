'use client';

import useSWR from 'swr';
import { SWRKeys, fetcher } from '@/lib/swr';
import { createContact, updateContact, deleteContact } from '@/lib';
import { Contact, LifecycleStage } from '@/types';

export default function ContactsPage() {
  const { data: contacts, mutate } = useSWR<Contact[]>(SWRKeys.contacts, fetcher.contacts, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000,
  });

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar este contacto?')) {
      await deleteContact(id);
      mutate();
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>Contactos</h2>
        <p style={{ color: '#666' }}>Total: {contacts?.length || 0}</p>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {contacts?.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone || '-'}</td>
                <td><span className="badge badge-medium">{contact.lifecycleStage}</span></td>
                <td>{contact.leadScore}</td>
              </tr>
            ))}
            {(!contacts || contacts.length === 0) && (
              <tr><td colSpan={5} style={{ textAlign: 'center' }}>No hay contactos - añade uno</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
