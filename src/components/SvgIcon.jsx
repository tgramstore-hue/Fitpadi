import { P } from '../data/icons.js';

export default function SvgIcon({ name, size = 24, className = 'i', style }) {
  const path = P[name];
  if (!path) return null;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={style}
    >
      <path d={path} fill="currentColor" />
    </svg>
  );
}

