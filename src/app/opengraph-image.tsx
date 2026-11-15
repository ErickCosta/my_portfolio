import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const alt = 'Erick Costa: Software, Data and AI';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Dark card with a cyan glow, matching the site. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #050A14 0%, #0A2038 100%)',
          color: '#EEF5FC',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', fontSize: 64, fontWeight: 900, fontStyle: 'italic', color: '#22D3EE' }}>E</div>
          <div style={{ display: 'flex', fontSize: 34 }}>Erick Costa</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>Software, Data & AI</div>
          <div style={{ display: 'flex', fontSize: 32, marginTop: 24, color: '#9DB2C9' }}>
            PhD in Computer Science · Technical leader · Founder, Borborema Tech
          </div>
        </div>
        <div style={{ display: 'flex', height: 6, width: 240, background: '#22D3EE', borderRadius: 6 }} />
      </div>
    ),
    size,
  );
}
