export default function SceneSvg({ type, color = '#16A34A', className = '' }) {
  let inner = null;

  if (type === 'walk') {
    inner = (
      <>
        <circle cx="318" cy="62" r="28" fill="#fff" opacity=".9" />
        <path d="M0 150Q100 86 205 146T400 126V200H0Z" fill="rgba(0,0,0,.16)" />
        <path d="M0 192Q120 134 262 182T400 170V200H0Z" fill="rgba(0,0,0,.3)" />
        <circle cx="150" cy="82" r="13" fill="#fff" />
        <path
          d="M150 100L142 138M142 138L128 168M142 138L158 166M147 112L128 128M147 112L168 124"
          stroke="#fff"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
      </>
    );
  } else if (type === 'strength') {
    inner = (
      <>
        <circle cx="60" cy="40" r="34" fill="rgba(255,255,255,.14)" />
        <circle cx="350" cy="160" r="46" fill="rgba(0,0,0,.14)" />
        <rect x="118" y="76" width="18" height="50" rx="5" fill="#fff" />
        <rect x="138" y="84" width="12" height="34" rx="4" fill="#fff" opacity=".8" />
        <rect x="150" y="96" width="100" height="10" fill="#fff" />
        <rect x="250" y="84" width="12" height="34" rx="4" fill="#fff" opacity=".8" />
        <rect x="264" y="76" width="18" height="50" rx="5" fill="#fff" />
      </>
    );
  } else if (type === 'mind') {
    inner = (
      <>
        <circle cx="200" cy="100" r="92" fill="#fff" opacity=".12" />
        <circle cx="200" cy="100" r="64" fill="#fff" opacity=".16" />
        <circle cx="200" cy="100" r="36" fill="#fff" opacity=".95" />
        <circle cx="80" cy="50" r="8" fill="#fff" opacity=".5" />
        <circle cx="330" cy="150" r="12" fill="#fff" opacity=".4" />
      </>
    );
  } else if (type === 'food') {
    inner = (
      <>
        <rect x="84" y="56" width="8" height="88" rx="4" fill="#fff" opacity=".75" />
        <rect x="308" y="56" width="8" height="88" rx="4" fill="#fff" opacity=".75" />
        <circle cx="200" cy="100" r="74" fill="#fff" />
        <circle cx="200" cy="100" r="58" fill="rgba(0,0,0,.07)" />
        <circle cx="182" cy="90" r="22" fill="#E85D4A" />
        <circle cx="220" cy="86" r="20" fill="#F5C542" />
        <circle cx="204" cy="122" r="18" fill="#4CAF50" />
        <circle cx="176" cy="120" r="12" fill="#2E8B3A" />
      </>
    );
  } else if (type === 'sleep') {
    inner = (
      <>
        <ellipse cx="110" cy="152" rx="56" ry="16" fill="#fff" opacity=".22" />
        <ellipse cx="310" cy="136" rx="46" ry="14" fill="#fff" opacity=".22" />
        <circle cx="200" cy="96" r="46" fill="#fff" />
        <circle cx="224" cy="82" r="40" fill={color} />
        <circle cx="90" cy="46" r="4" fill="#fff" />
        <circle cx="318" cy="52" r="5" fill="#fff" />
        <circle cx="280" cy="150" r="3" fill="#fff" />
      </>
    );
  } else {
    // Water / hydration / default
    inner = (
      <>
        <path d="M200 30C200 30 150 96 150 128a50 50 0 0 0 100 0C250 96 200 30 200 30Z" fill="#fff" />
        <path d="M92 90C92 90 72 118 72 130a20 20 0 0 0 40 0C112 118 92 90 92 90Z" fill="#fff" opacity=".55" />
        <path d="M316 100C316 100 298 124 298 134a18 18 0 0 0 36 0C334 124 316 100 316 100Z" fill="#fff" opacity=".55" />
      </>
    );
  }

  return (
    <svg
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
      className={className}
      style={{ width: '100%', height: '100%', background: color }}
    >
      {inner}
    </svg>
  );
}

