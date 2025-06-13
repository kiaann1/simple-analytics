import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Marketing Analytics Dashboard',
    short_name: 'MA Analytics',
    description: 'Simplified Google Analytics Dashboard',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#1e293b',
    icons: [
      {
        src: '/bb-logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
