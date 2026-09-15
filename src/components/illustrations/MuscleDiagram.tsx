/**
 * Original, hand-built anatomy diagram — a simplified front/back body
 * outline with the target muscle group highlighted in the brand colour,
 * inspired by the "grey body, highlighted muscle" style common to exercise
 * databases (muscleandstrength.com's own diagrams are their proprietary
 * artwork, not reproduced here). Every shape below is authored from
 * scratch: plain rects/ellipses laid out to read as a body, not traced or
 * copied from any source.
 */

const BASE = 'var(--color-muted)';
const BASE_OPACITY = 0.32;
const HIGHLIGHT = 'var(--color-primary)';

const FRONT_MUSCLES = new Set(['chest', 'shoulders', 'biceps', 'abs', 'quads']);

interface MuscleDiagramProps {
  muscle: string;
  className?: string;
}

export function MuscleDiagram({ muscle, className }: MuscleDiagramProps) {
  return FRONT_MUSCLES.has(muscle) ? (
    <FrontBody active={muscle} className={className} />
  ) : (
    <BackBody active={muscle} className={className} />
  );
}

function fillFor(key: string, active: string) {
  return key === active ? HIGHLIGHT : BASE;
}
function opacityFor(key: string, active: string) {
  return key === active ? 1 : BASE_OPACITY;
}

function FrontBody({ active, className }: { active: string; className?: string }) {
  const fill = (key: string) => fillFor(key, active);
  const op = (key: string) => opacityFor(key, active);
  return (
    <svg viewBox="0 0 200 460" className={className} aria-hidden>
      {/* Head, neck — always base */}
      <ellipse cx="100" cy="30" rx="22" ry="26" fill={BASE} opacity={BASE_OPACITY} />
      <rect x="88" y="52" width="24" height="16" rx="6" fill={BASE} opacity={BASE_OPACITY} />
      {/* Forearms + hands — always base */}
      <rect x="38" y="190" width="16" height="70" rx="8" fill={BASE} opacity={BASE_OPACITY} />
      <rect x="146" y="190" width="16" height="70" rx="8" fill={BASE} opacity={BASE_OPACITY} />
      <ellipse cx="46" cy="270" rx="10" ry="14" fill={BASE} opacity={BASE_OPACITY} />
      <ellipse cx="154" cy="270" rx="10" ry="14" fill={BASE} opacity={BASE_OPACITY} />
      {/* Waist/pelvis — always base */}
      <rect x="72" y="210" width="56" height="38" rx="20" fill={BASE} opacity={BASE_OPACITY} />
      {/* Shins + feet — always base */}
      <rect x="76" y="344" width="20" height="76" rx="10" fill={BASE} opacity={BASE_OPACITY} />
      <rect x="104" y="344" width="20" height="76" rx="10" fill={BASE} opacity={BASE_OPACITY} />
      <ellipse cx="86" cy="428" rx="14" ry="8" fill={BASE} opacity={BASE_OPACITY} />
      <ellipse cx="114" cy="428" rx="14" ry="8" fill={BASE} opacity={BASE_OPACITY} />

      {/* Shoulders (deltoids) */}
      <ellipse cx="62" cy="88" rx="16" ry="20" fill={fill('shoulders')} opacity={op('shoulders')} />
      <ellipse cx="138" cy="88" rx="16" ry="20" fill={fill('shoulders')} opacity={op('shoulders')} />
      {/* Biceps */}
      <rect x="40" y="110" width="18" height="80" rx="9" fill={fill('biceps')} opacity={op('biceps')} />
      <rect x="142" y="110" width="18" height="80" rx="9" fill={fill('biceps')} opacity={op('biceps')} />
      {/* Chest */}
      <rect x="70" y="86" width="60" height="40" rx="18" fill={fill('chest')} opacity={op('chest')} />
      {/* Abs — 2x3 grid */}
      <rect x="80" y="128" width="18" height="24" rx="6" fill={fill('abs')} opacity={op('abs')} />
      <rect x="102" y="128" width="18" height="24" rx="6" fill={fill('abs')} opacity={op('abs')} />
      <rect x="80" y="156" width="18" height="24" rx="6" fill={fill('abs')} opacity={op('abs')} />
      <rect x="102" y="156" width="18" height="24" rx="6" fill={fill('abs')} opacity={op('abs')} />
      <rect x="80" y="184" width="18" height="24" rx="6" fill={fill('abs')} opacity={op('abs')} />
      <rect x="102" y="184" width="18" height="24" rx="6" fill={fill('abs')} opacity={op('abs')} />
      {/* Quads */}
      <rect x="74" y="250" width="24" height="90" rx="14" fill={fill('quads')} opacity={op('quads')} />
      <rect x="102" y="250" width="24" height="90" rx="14" fill={fill('quads')} opacity={op('quads')} />
    </svg>
  );
}

function BackBody({ active, className }: { active: string; className?: string }) {
  const fill = (key: string) => fillFor(key, active);
  const op = (key: string) => opacityFor(key, active);
  return (
    <svg viewBox="0 0 200 460" className={className} aria-hidden>
      {/* Head, neck, traps, shoulder caps — always base */}
      <ellipse cx="100" cy="30" rx="22" ry="26" fill={BASE} opacity={BASE_OPACITY} />
      <rect x="88" y="52" width="24" height="16" rx="6" fill={BASE} opacity={BASE_OPACITY} />
      <rect x="78" y="76" width="44" height="24" rx="10" fill={BASE} opacity={BASE_OPACITY} />
      <ellipse cx="58" cy="95" rx="14" ry="18" fill={BASE} opacity={BASE_OPACITY} />
      <ellipse cx="142" cy="95" rx="14" ry="18" fill={BASE} opacity={BASE_OPACITY} />
      {/* Lower back strip — always base */}
      <rect x="92" y="170" width="16" height="40" rx="8" fill={BASE} opacity={BASE_OPACITY} />
      {/* Forearms + hands — always base */}
      <rect x="38" y="190" width="16" height="70" rx="8" fill={BASE} opacity={BASE_OPACITY} />
      <rect x="146" y="190" width="16" height="70" rx="8" fill={BASE} opacity={BASE_OPACITY} />
      <ellipse cx="46" cy="270" rx="10" ry="14" fill={BASE} opacity={BASE_OPACITY} />
      <ellipse cx="154" cy="270" rx="10" ry="14" fill={BASE} opacity={BASE_OPACITY} />
      {/* Waistband — always base */}
      <rect x="72" y="205" width="56" height="15" rx="8" fill={BASE} opacity={BASE_OPACITY} />
      {/* Feet — always base */}
      <ellipse cx="86" cy="428" rx="14" ry="8" fill={BASE} opacity={BASE_OPACITY} />
      <ellipse cx="114" cy="428" rx="14" ry="8" fill={BASE} opacity={BASE_OPACITY} />

      {/* Back (lats) */}
      <rect x="70" y="100" width="26" height="70" rx="14" fill={fill('back')} opacity={op('back')} />
      <rect x="104" y="100" width="26" height="70" rx="14" fill={fill('back')} opacity={op('back')} />
      {/* Triceps */}
      <rect x="40" y="110" width="16" height="80" rx="8" fill={fill('triceps')} opacity={op('triceps')} />
      <rect x="144" y="110" width="16" height="80" rx="8" fill={fill('triceps')} opacity={op('triceps')} />
      {/* Glutes */}
      <rect x="72" y="220" width="56" height="35" rx="18" fill={fill('glutes')} opacity={op('glutes')} />
      {/* Hamstrings */}
      <rect x="74" y="258" width="24" height="82" rx="14" fill={fill('hamstrings')} opacity={op('hamstrings')} />
      <rect x="102" y="258" width="24" height="82" rx="14" fill={fill('hamstrings')} opacity={op('hamstrings')} />
      {/* Calves */}
      <rect x="76" y="344" width="20" height="76" rx="10" fill={fill('calves')} opacity={op('calves')} />
      <rect x="104" y="344" width="20" height="76" rx="10" fill={fill('calves')} opacity={op('calves')} />
    </svg>
  );
}
