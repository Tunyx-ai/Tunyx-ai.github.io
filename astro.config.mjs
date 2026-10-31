// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// TUNYX_SITE_URL / TUNYX_BASE_PATH let the same build target github.io, a project page, or the tunyx.ai domain.
const site = process.env.TUNYX_SITE_URL ?? 'https://tunyx-ai.github.io';
const base = process.env.TUNYX_BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [
    starlight({
      title: 'Tunyx',
      description: 'Documentation for Tunyx, the self-optimizing inference control plane.',
      logo: { src: './src/assets/logo.svg', alt: 'Tunyx' },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/starlight.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Tunyx-ai/tunyx' }],
      lastUpdated: false,
      expressiveCode: {
        themes: ['github-dark-default', 'github-light-default'],
        styleOverrides: {
          borderRadius: '12px',
          codeFontFamily: "'Geist Mono Variable', ui-monospace, monospace",
          uiFontFamily: "'Geist Variable', ui-sans-serif, system-ui, sans-serif",
          frames: { shadowColor: 'transparent' },
        },
      },
      head: [
        { tag: 'meta', attrs: { property: 'og:image', content: new URL(`${base.replace(/\/$/, '')}/og.png`, site).href } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
      ],
      sidebar: [
        {
          label: 'Getting started',
          items: [
            { label: 'Introduction', slug: 'docs' },
            { label: 'Quickstart', slug: 'docs/getting-started/quickstart' },
            { label: 'Installation', slug: 'docs/getting-started/installation' },
            { label: 'Try the demo', slug: 'docs/getting-started/demo' },
            { label: 'Your first deployment', slug: 'docs/getting-started/first-deployment' },
          ],
        },
        {
          label: 'Core concepts',
          items: [
            { label: 'How Tunyx works', slug: 'docs/concepts/how-it-works' },
            { label: 'Workload profiles', slug: 'docs/concepts/profiles' },
            { label: 'Optimization', slug: 'docs/concepts/optimization' },
            { label: 'Quality gates', slug: 'docs/concepts/quality-gates' },
            { label: 'Tunyx vs alternatives', slug: 'docs/concepts/comparison' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Calling your model', slug: 'docs/guides/apis' },
            { label: 'Choosing models', slug: 'docs/guides/models' },
            { label: 'Optimization history', slug: 'docs/guides/history-report' },
            { label: 'Swap, canary & rollback', slug: 'docs/guides/swap-rollback' },
            { label: 'Live retuning', slug: 'docs/guides/retuning' },
            { label: 'Several models, one machine', slug: 'docs/guides/multi-model' },
            { label: 'Cost & economics', slug: 'docs/guides/economics' },
            { label: 'Dashboard & monitoring', slug: 'docs/guides/monitoring' },
            { label: 'Benchmarking', slug: 'docs/guides/benchmarking' },
            { label: 'Teams, keys & security', slug: 'docs/guides/teams-security' },
            { label: 'Declarative config', slug: 'docs/guides/gitops' },
            { label: 'Running in production', slug: 'docs/guides/production' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'CLI', slug: 'docs/reference/cli' },
            { label: 'Configuration', slug: 'docs/reference/configuration' },
            { label: 'HTTP API', slug: 'docs/reference/http-api' },
            { label: 'Failure handling', slug: 'docs/reference/reliability' },
            { label: 'Glossary', slug: 'docs/reference/glossary' },
            { label: 'Troubleshooting', slug: 'docs/reference/troubleshooting' },
          ],
        },
      ],
    }),
  ],
});
