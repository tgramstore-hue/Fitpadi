export default function Logo({ height = 34, className = '', colorMode = '' }) {
  const isWhite = colorMode === 'wh';
  return (
    <svg
      className={`wm ${className} ${colorMode}`}
      viewBox="0 0 290 72"
      style={{ height: `${height}px`, width: 'auto', display: 'block' }}
      role="img"
      aria-label="FitPadi"
    >
      <g fill="none" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round">
        <g className="w1" stroke={isWhite ? '#ffffff' : 'var(--g, #16A34A)'}>
          <path d="M14 12V58M14 12H41M14 33H36" />
          <path d="M62 30V58" />
          <path d="M88 14V46Q88 58 100 58M78 30H100" />
        </g>
        <g className="w2" stroke={isWhite ? '#ffffff' : 'var(--tx, #14261C)'}>
          <path d="M122 12V58M122 12H138A15 15 0 0 1 138 40H122" />
          <path d="M178 30V58M178 42A14 14 0 1 0 162 58" />
          <path d="M214 12V58M214 42A14 14 0 1 0 198 58" />
          <path d="M236 30V58" />
          <circle cx="236" cy="18" r="3" fill={isWhite ? '#ffffff' : 'var(--tx, #14261C)'} stroke="none" />
        </g>
      </g>
    </svg>
  );
}

