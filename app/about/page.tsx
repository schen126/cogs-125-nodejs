import Link from 'next/link'

export const metadata = { title: 'About — Serena' }

export default function AboutPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#fff',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        color: '#1a1a1a',
      }}
    >
      {/* Top bar */}
      <header
        style={{
          borderBottom: '1px solid #eaeaea',
          padding: '0 2rem',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: 13,
            color: '#666',
            textDecoration: 'none',
          }}
        >
          ← Back
        </Link>
        <span style={{ color: '#d0d0d0' }}>|</span>
        <span style={{ fontSize: 13, fontWeight: 600 }}>About</span>
      </header>

      <div
        style={{
          maxWidth: 680,
          margin: '0 auto',
          padding: '3rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem',
        }}
      >
        {/* Bio */}
        <section style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          {/* Replace this div with <img src="/images/me.jpg" ... /> */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              flexShrink: 0,
              background: 'linear-gradient(135deg, #d4d4d4, #b0b0b0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              color: '#888',
              overflow: 'hidden',
            }}
          >
            {<img src="/images/me.jpg" alt="Serena" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
          </div>
          <div style={{ maxWidth: 100 }}>
            <h1 style={{ margin: 0, marginBottom: 10, fontSize: '1.6rem', fontWeight: 700 }}>
              Hi, I&apos;m Serena
            </h1>
            <p style={{ margin: 0, fontSize: 14.5, color: '#555', lineHeight: 1.8 }}>
              {/* Replace with your bio */}
              I&apos;m a student at UC San Diego studying Computer Science with a minor in Linguistics 
              and Cognitive Science. I love media and building things at the intersection of technology
              and creativity.
            </p>
          </div>
        </section>

        {/* Hobbies */}
        <section>
          <SectionLabel>Hobbies</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {/* Edit this list */}
            {['Coding', 'AI', 'Design', 'Reading', 'Music', 'Photography'].map((h) => (
              <span
                key={h}
                style={{
                  padding: '5px 14px',
                  background: '#f5f5f5',
                  borderRadius: 999,
                  fontSize: 13,
                  color: '#444',
                }}
              >
                {h}
              </span>
            ))}
          </div>
        </section>

        {/* Music / Spotify */}
        <section>
          <SectionLabel>Recently Listened To</SectionLabel>
          <p style={{ margin: 0, marginBottom: 12, fontSize: 13, color: '#888' }}>
            {/* Remove this paragraph once you add your Spotify embed */}
            Replace <code>SPOTIFY_PLAYLIST_ID</code> below with your actual
            playlist or track ID from Spotify.
          </p>
          {/*
            To get your embed URL:
            1. Open Spotify and right-click a playlist or track
            2. Share → Copy Spotify URI  (e.g. spotify:playlist:37i9dQZF1E35aFjeFRlJZ5)
            3. The ID is the last segment. Paste it in place of SPOTIFY_PLAYLIST_ID below.
          */}
          <iframe
            style={{ borderRadius: 12, border: 'none', display: 'block' }}
            src="https://open.spotify.com/embed/playlist/2QV4usA8PK8FgAPlfPigmP?utm_source=generator&theme=0"
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify recently listened"
          />
        </section>
      </div>
    </main>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        margin: 0,
        marginBottom: 12,
        fontSize: 11,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#aaa',
      }}
    >
      {children}
    </p>
  )
}
