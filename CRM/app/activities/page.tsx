"use client";

import useSWR from "swr";
import { SWRKeys, fetcher } from "@/lib/swr";
import { Activity, ActivityType } from "@/types";
import { DataTable } from "@/components/StatsAndTables";

export default function ActivitiesPage() {
  const { data: activities } = useSWR<Activity[]>(
    SWRKeys.activities,
    fetcher.activities,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
    },
  );

  const columns = [
    {
      key: "type",
      label: "Tipo",
      sortable: true,
      render: (item: Activity) => {
        const getIcon = () => {
          switch (item.type) {
            case ActivityType.Call:
              return (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ verticalAlign: "middle" }}
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
                </svg>
              );
            case ActivityType.Email:
              return (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ verticalAlign: "middle" }}
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              );
            case ActivityType.Meeting:
              return (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ verticalAlign: "middle" }}
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              );
            case ActivityType.Task:
              return (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ verticalAlign: "middle" }}
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
              );
            default:
              return (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ verticalAlign: "middle" }}
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                </svg>
              );
          }
        };
        return (
          <span style={{ display: "flex", alignItems: "center" }}>
            {getIcon()}
            <span style={{ marginLeft: 8 }}>{item.type}</span>
          </span>
        );
      },
    },
    {
      key: "description",
      label: "Descripción",
      sortable: true,
    },
    {
      key: "dueDate",
      label: "Fecha Límite",
      render: (item: Activity) =>
        item.dueDate ? new Date(item.dueDate).toLocaleDateString("es-ES") : "-",
    },
    {
      key: "completedAt",
      label: "Estado",
      render: (item: Activity) => (
        <span
          className={`badge ${item.completedAt ? "badge-green" : "badge-yellow"}`}
        >
          {item.completedAt ? "Completada" : "Pendiente"}
        </span>
      ),
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-content">
          <h2>Actividades</h2>
          <p>Tareas y seguimiento</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Nueva Actividad
          </button>
        </div>
      </div>

      <DataTable
        data={activities || []}
        columns={columns}
        searchPlaceholder="Buscar actividades..."
        emptyMessage="No hay actividades. Crea una nueva para empezar."
      />
    </div>
  );
}
