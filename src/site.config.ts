// One place for everything that changes at launch (install command, contact, links).
export const SITE = {
  name: 'Tunyx',
  tagline: 'Inference that tunes itself',
  description:
    'Tunyx turns your GPUs into fast, quality-checked, OpenAI-compatible endpoints, tuned to your workload and kept healthy automatically.',
  github: 'https://github.com/Tunyx-ai/tunyx',
  publicRepo: false, // GitHub links appear once the code repository is public
  email: 'varunkavin5@gmail.com',
  status: 'Private pilot',
  // Switch to `pip install tunyx` once the package is published on PyPI.
  install: 'pip install git+https://github.com/Tunyx-ai/tunyx',
};

/** Prefix an internal path with the deploy base (e.g. /tunyx/ on a project Pages site). */
export function url(path = ''): string {
  // A host-level BASE_URL env var can leak into import.meta.env; only trust a path.
  const raw = import.meta.env.BASE_URL;
  const base = (raw.startsWith('/') ? raw : '/').replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

export const pilotHref = `mailto:${SITE.email}?subject=${encodeURIComponent('Tunyx free pilot')}&body=${encodeURIComponent(
  'Hi,\n\nWe would like to try Tunyx.\n\nModel(s) we run or plan to run:\nGPU (or cloud):\nWhat we use today (API, Ollama, vLLM, ...):\n\nThanks,\n')}`;
