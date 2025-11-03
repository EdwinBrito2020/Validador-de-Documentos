import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Panel de Administración | Tipos de Documentos',
  description: 'Configura tipos de documentos, validaciones y prompts',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  )
}
