// Written out in full so Tailwind picks them up.
const METHOD_STYLES = {
  GET: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300',
  POST: 'bg-sky-100 text-sky-800 dark:bg-sky-400/15 dark:text-sky-300',
  PUT: 'bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300',
  PATCH: 'bg-violet-100 text-violet-800 dark:bg-violet-400/15 dark:text-violet-300',
  DELETE: 'bg-rose-100 text-rose-800 dark:bg-rose-400/15 dark:text-rose-300',
};

const FALLBACK_STYLE = 'bg-surface-tertiary text-content-secondary';

const SHORT_LABELS = {
  DELETE: 'DEL',
};

export function methodStyle(method) {
  return METHOD_STYLES[method?.toUpperCase()] ?? FALLBACK_STYLE;
}

export function methodLabel(method = '', { short = false } = {}) {
  const upper = method.toUpperCase();
  return (short && SHORT_LABELS[upper]) || upper;
}
