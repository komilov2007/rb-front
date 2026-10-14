import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unfonts from 'unplugin-fonts/vite'
import checker from 'vite-plugin-checker'
import svgrPlugin from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import htmlPlugin from 'vite-plugin-html-config'
import compression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import { sentryVitePlugin } from '@sentry/vite-plugin'

export default defineConfig({
  build: {
    minify: 'terser',
    emptyOutDir: true,
    cssCodeSplit: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          mui: ['@mui/material', '@mui/x-date-pickers', 'yup', 'card-validator'],
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/img/[name]-[hash][extname]'
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
    sourcemap: true,
  },
  plugins: [
    react({
      babel: {
        plugins: [['@babel/plugin-transform-runtime']],
      },
    }),
    htmlPlugin({
      favicon: '',
      metas: [
        {
          name: 'description',
          content: 'Start your online business in just 15 minutes',
        },
        {
          charset: 'UTF-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, viewport-fit=cover',
        },
        {
          content: 'robosell',
          name: 'apple-mobile-web-app-title',
        },
        {
          content: 'robosell',
          name: 'application-name',
        },
        {
          content: '#ffffff',
          name: 'theme-color',
        },
      ],
    }),
    svgrPlugin(),
    tsconfigPaths(),
    checker({
      overlay: true,
      typescript: true,
    }),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
    Unfonts({
      custom: {
        families: [
          {
            name: 'Onest',
            local: 'Onest',
            src: './src/assets/fonts/*.woff2',
          },
          {
            name: 'Manrope',
            local: 'Manrope',
            src: './src/assets/fonts/plum/*.woff2',
          },
        ],
        preload: true,
        display: 'swap',
        prefetch: false,
        injectTo: 'head-prepend',
      },
    }),
    sentryVitePlugin({
      org: 'robosell',
      project: 'admin-dashboard',
      authToken: process.env.VITE_API_SENTRY_AUTH_TOKEN,
      telemetry: false,
    }),
  ],
  server: {
    preTransformRequests: true,
    allowedHosts: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
