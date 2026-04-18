"use client";

import Image from "next/image";
import type { JSX } from "react";
import { useState } from "react";
import PrivacyModal from "./PrivacyModal";

export default function Footer(): JSX.Element {
	const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

	return (
		<footer className="bg-white py-12 border-t border-secondary/5">
			<div className="max-w-7xl mx-auto px-6 lg:px-10">
				<div className="flex flex-col md:flex-row justify-between items-center gap-8">
					<div className="flex items-center gap-3">
						<div className="relative flex items-center justify-center">
							<Image
								src="/logo.png"
								alt="ABTEC Logo"
								width={24}
								height={24}
								className="opacity-50"
							/>
						</div>
						<span className="text-secondary/40 font-bold uppercase tracking-tighter">
							ABTEC © 2025
						</span>
					</div>
					<div className="flex gap-8">
						<button
							type="button"
							onClick={() => setIsPrivacyOpen(true)}
							className="text-secondary/40 hover:text-primary transition-colors text-sm font-medium"
						>
							Aviso de Privacidad
						</button>
					</div>
					<div className="flex gap-4">
						<a
							href="https://instagram.com/abtec"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Instagram"
							className="w-10 h-10 rounded-full bg-background-light flex items-center justify-center text-secondary/40 hover:bg-primary/20 hover:text-primary transition-all cursor-pointer group"
						>
							<span className="sr-only">Instagram</span>
							<svg
								className="w-5 h-5 fill-current"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path d="M12.001 2.002c-2.73 0-3.07.012-4.142.06-1.07.05-1.801.219-2.44.468-.66.256-1.22.6-1.778 1.159-.559.558-.903 1.118-1.159 1.778-.25.64-.418 1.37-.468 2.44-.049 1.07-.061 1.412-.061 4.142s.012 3.072.061 4.142c.05 1.07.218 1.801.468 2.44.256.66.6 1.22 1.159 1.778.558.559 1.118.903 1.778 1.159.64.25 1.37.418 2.44.468 1.07.049 1.412.061 4.142.061s3.072-.012 4.142-.061c1.07-.05 1.801-.218 2.44-.468.66-.256 1.22-.6 1.778-1.159.559-.558.903-1.118 1.159-1.778.25-.64.418-1.37.468-2.44.049-1.07.061-1.412.061-4.142s-.012-3.072-.061-4.142c-.05-1.07-.218-1.801-.468-2.43-.256-.66-.6-1.22-1.159-1.78-.558-.558-1.118-.902-1.778-1.158-.64-.25-1.37-.419-2.44-.468-1.071-.05-1.412-.061-4.142-.061zm0 1.8c2.684 0 3.002.01 4.061.059 1.07.049 1.748.219 2.126.366.5.195.859.429 1.236.806.377.377.611.734.806 1.236.147.378.317 1.057.366 2.126.049 1.06.059 1.377.059 4.061s-.01 3.003-.059 4.061c-.049 1.07-.219 1.749-.366 2.127-.195.5-.429.859-.806 1.236-.377.377-.734.611-1.236.806-.378.147-1.057.317-2.126.366-1.059.049-1.377.059-4.061.059s-3.003-.01-4.061-.059c-1.07-.049-1.749-.219-2.127-.366-.5-.195-.859-.429-1.236-.806-.377-.377-.611-.734-.806-1.236-.147-.378-.317-1.057-.366-2.126-.049-1.059-.059-1.377-.059-4.061s.01-3.002.059-4.061c.049-1.07.219-1.748.366-2.126.195-.5.429-.859.806-1.236.377-.377.734-.611 1.236-.806.378-.147 1.057-.317 2.126-.366 1.059-.049 1.377-.059 4.061-.059zM12.001 7.221a4.78 4.78 0 100 9.56 4.78 4.78 0 000-9.56zm0 1.8a2.98 2.98 0 110 5.96 2.98 2.98 0 010-5.96zm4.972-2.311a1.148 1.148 0 100 2.296 1.148 1.148 0 000-2.296z" />
							</svg>
						</a>
						<a
							href="https://facebook.com/abtec"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Facebook"
							className="w-10 h-10 rounded-full bg-background-light flex items-center justify-center text-secondary/40 hover:bg-primary/20 hover:text-primary transition-all cursor-pointer group"
						>
							<span className="sr-only">Facebook</span>
							<svg
								className="w-5 h-5 fill-current"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
							</svg>
						</a>
						<a
							href="https://x.com/abtec"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="X (Twitter)"
							className="w-10 h-10 rounded-full bg-background-light flex items-center justify-center text-secondary/40 hover:bg-primary/20 hover:text-primary transition-all cursor-pointer group"
						>
							<span className="sr-only">X (Twitter)</span>
							<svg
								className="w-5 h-5 fill-current"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z" />
							</svg>
						</a>
					</div>
				</div>
			</div>
			<PrivacyModal
				isOpen={isPrivacyOpen}
				onClose={() => setIsPrivacyOpen(false)}
			/>
		</footer>
	);
}
