"use client";

import { useState } from "react";

export default function SettingsPage() {
	const [settings, setSettings] = useState({
		companyName: "Abtec",
		email: "contacto@abtec.com",
		timezone: "America/Mexico_City",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		alert("Configuración guardada (demo)");
	};

	return (
		<div className="container">
			<div className="page-header">
				<h2>Configuración</h2>
			</div>

			<div className="card">
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="company-name">Nombre de la Empresa</label>
						<input
							id="company-name"
							type="text"
							value={settings.companyName}
							onChange={(e) =>
								setSettings({ ...settings, companyName: e.target.value })
							}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="contact-email">Email de Contacto</label>
						<input
							id="contact-email"
							type="email"
							value={settings.email}
							onChange={(e) =>
								setSettings({ ...settings, email: e.target.value })
							}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="timezone-select">Zona Horaria</label>
						<select
							id="timezone-select"
							value={settings.timezone}
							onChange={(e) =>
								setSettings({ ...settings, timezone: e.target.value })
							}
						>
							<option value="America/Mexico_City">Ciudad de México</option>
							<option value="America/Bogota">Bogotá</option>
							<option value="America/Buenos_Aires">Buenos Aires</option>
							<option value="America/New_York">Nueva York</option>
						</select>
					</div>
					<button type="submit" className="btn btn-primary">
						Guardar
					</button>
				</form>
			</div>

			<div className="card" style={{ marginTop: "20px" }}>
				<h3>Integraciones</h3>
				<p style={{ color: "#666", marginTop: "10px" }}>
					Conecta tu CRM con otras herramientas:
				</p>
				<div style={{ marginTop: "15px" }}>
					<button
						type="button"
						className="btn btn-secondary"
						style={{ marginRight: "10px" }}
					>
						Firebase
					</button>
					<button
						type="button"
						className="btn btn-secondary"
						style={{ marginRight: "10px" }}
					>
						Slack
					</button>
					<button type="button" className="btn btn-secondary">
						WhatsApp
					</button>
				</div>
			</div>

			<div className="card" style={{ marginTop: "20px" }}>
				<h3>Información del Sistema</h3>
				<p style={{ marginTop: "10px" }}>
					<strong>Versión:</strong> 1.0.0
					<br />
					<strong>Firebase Project:</strong> abtec-8f31e
					<br />
					<strong>Entorno:</strong> Desarrollo
				</p>
			</div>
		</div>
	);
}
