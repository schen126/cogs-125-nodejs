'use client'

import { useState } from 'react'
import { playwrite } from '../../fonts'
import { projects, type Project } from '../../data/projects'

type Page = 'home' | 'about' | 'projects'

// ---------------------------------------------------------------------------
// Nav bar
// ---------------------------------------------------------------------------

function NavBar({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const tabs: { id: Page; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
  ]
  return (
    <div
      style={{
        height: 42,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        borderBottom: '1px solid #e8e8e8',
        background: '#fafafa',
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setPage(tab.id)}
          style={{
            padding: '5px 18px',
            border: 'none',
            borderRadius: 999,
            background: page === tab.id ? '#1a1a1a' : 'transparent',
            color: page === tab.id ? '#fff' : '#666',
            fontSize: 12,
            fontWeight: page === tab.id ? 600 : 400,
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'background 0.15s, color 0.15s',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Home section
// ---------------------------------------------------------------------------

function HomeSection() {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        padding: '1.5rem',
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)',
          fontWeight: 'bold',
          fontFamily: playwrite.style.fontFamily,
          color: '#1a1a1a',
        }}
      >
        Hi, I&apos;m Serena
      </h1>
      <a
        href="this_is_a_virus.pdf"
        download="this_is_a_virus.pdf"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'inline-block',
          marginTop: 4,
          padding: '0.55rem 1.4rem',
          background: '#1a1a1a',
          color: '#fff',
          borderRadius: 6,
          textDecoration: 'none',
          fontSize: 13,
          fontWeight: 500,
          transition: 'box-shadow 0.2s, transform 0.2s',
          boxShadow: hovered ? '0 4px 16px rgba(0,0,0,0.2)' : 'none',
          transform: hovered ? 'translateY(-2px)' : 'none',
        }}
      >
        View my resume
      </a>
    </div>
  )
}

// ---------------------------------------------------------------------------
// About section
// ---------------------------------------------------------------------------

function AboutSection() {
  return (
    <div
      style={{
        height: '100%',
        overflowY: 'auto',
        padding: '1.2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      {/* Bio row */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        {/* Profile photo — replace the div with <img src="/images/me.jpg" ... /> */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            flexShrink: 0,
            background: 'linear-gradient(135deg, #d4d4d4, #b0b0b0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            color: '#888',
            overflow: 'hidden',
          }}
        >
          {<img src="/images/me.jpg" alt="Serena" style={{ width: '150%', height: '150%', objectFit: 'cover' }} />}
        </div>
        <div>
          <h2
            style={{
              margin: 0,
              marginBottom: 6,
              fontSize: '1rem',
              fontWeight: 700,
              color: '#1a1a1a',
            }}
          >
            Serena
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 12.5,
              color: '#555',
              lineHeight: 1.7,
            }}
          >
            {/* Replace with your bio */}
            I&apos;m a student at UC San Diego studying Computer Science with a minor in Linguistics 
              and Cognitive Science. I love media and building things at the intersection of technology
              and creativity.
          </p>
        </div>
      </div>

      {/* Hobbies */}
      <section>
        <SectionLabel>Hobbies</SectionLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {/* Edit this list */}
          {['Coding', 'AI', 'Design', 'Reading', 'Music', 'Photography'].map(
            (h) => (
              <Pill key={h}>{h}</Pill>
            )
          )}
        </div>
      </section>

      {/* Music / Spotify */}
      <section>
        <SectionLabel>Recently Listened To</SectionLabel>
        {/*
          Replace SPOTIFY_PLAYLIST_ID with your playlist or track ID.
          Find it by right-clicking any playlist/track in Spotify →
          Share → Copy Spotify URI (looks like spotify:playlist:37i9dQZF1E35aFjeFRlJZ5).
          The ID is the last segment after the colon.
        */}
        <iframe
          style={{ borderRadius: 10, border: 'none', display: 'block' }}
          src="https://open.spotify.com/embed/playlist/2QV4usA8PK8FgAPlfPigmP?utm_source=generator&theme=0"
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify recently listened"
        />
      </section>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Projects section
// ---------------------------------------------------------------------------

function ProjectsSection({
  onProjectClick,
}: {
  onProjectClick: (p: Project) => void
}) {
  return (
    <div
      style={{
        height: '100%',
        overflowY: 'auto',
        padding: '1rem 1.25rem',
      }}
    >
      <SectionLabel style={{ marginBottom: '0.9rem' }}>Projects</SectionLabel>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '0.75rem',
        }}
      >
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} onClick={() => onProjectClick(p)} />
        ))}
      </div>
    </div>
  )
}

function ProjectCard({
  project,
  onClick,
}: {
  project: Project
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fafafa',
        border: '1px solid #eaeaea',
        borderRadius: 10,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s, transform 0.2s',
        boxShadow: hovered ? '0 4px 16px rgba(0,0,0,0.1)' : 'none',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <ProjectImage src={project.image} aspectRatio="55%" />
      <div style={{ padding: '0.6rem 0.75rem' }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: '#1a1a1a',
            marginBottom: 3,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {project.title}
        </div>
        <div
          style={{
            fontSize: 11,
            color: '#666',
            lineHeight: 1.5,
            marginBottom: 6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {project.tags.slice(0, 3).map((tag) => (
            <Pill key={tag} small>{tag}</Pill>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Mac-style project modal
// ---------------------------------------------------------------------------

function MacModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
        borderRadius: 4,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          width: '82%',
          maxHeight: '84%',
          boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div
          style={{
            height: 34,
            flexShrink: 0,
            background: 'linear-gradient(180deg, #ebebeb 0%, #d8d8d8 100%)',
            borderBottom: '1px solid #c0c0c0',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: 7,
            position: 'relative',
          }}
        >
          <TrafficLight color="#FF5F57" onClick={onClose} title="Close" />
          <TrafficLight color="#FFBD2E" />
          <TrafficLight color="#28C840" />
          <span
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 11,
              fontWeight: 600,
              color: '#444',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              maxWidth: '50%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {project.title}
          </span>
        </div>

        {/* Scrollable content */}
        <div style={{ overflowY: 'auto', padding: '1rem' }}>
          <ProjectImage src={project.image} aspectRatio="45%" style={{ marginBottom: '0.9rem', borderRadius: 8 }} />

          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: '0.6rem' }}>
            {project.tags.map((tag) => (
              <Pill key={tag} small>{tag}</Pill>
            ))}
          </div>

          <h2
            style={{
              margin: 0,
              marginBottom: '0.5rem',
              fontSize: '1rem',
              fontWeight: 700,
              color: '#1a1a1a',
            }}
          >
            {project.title}
          </h2>

          <p
            style={{
              margin: 0,
              marginBottom: '1rem',
              fontSize: 12.5,
              color: '#555',
              lineHeight: 1.75,
            }}
          >
            {project.longDescription}
          </p>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '0.5rem 1.1rem',
              background: '#1a1a1a',
              color: '#fff',
              borderRadius: 6,
              textDecoration: 'none',
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            View Project →
          </a>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Small shared primitives
// ---------------------------------------------------------------------------

function TrafficLight({
  color,
  onClick,
  title,
}: {
  color: string
  onClick?: () => void
  title?: string
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 11,
        height: 11,
        borderRadius: '50%',
        background: color,
        border: 'none',
        padding: 0,
        cursor: onClick ? 'pointer' : 'default',
        flexShrink: 0,
      }}
    />
  )
}

function SectionLabel({
  children,
  style,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <p
      style={{
        margin: 0,
        marginBottom: 8,
        fontSize: 10,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#aaa',
        ...style,
      }}
    >
      {children}
    </p>
  )
}

function Pill({
  children,
  small,
}: {
  children: React.ReactNode
  small?: boolean
}) {
  return (
    <span
      style={{
        padding: small ? '1px 7px' : '3px 10px',
        background: '#f0f0f0',
        borderRadius: 999,
        fontSize: small ? 10 : 12,
        color: '#555',
      }}
    >
      {children}
    </span>
  )
}

function ProjectImage({
  src,
  aspectRatio,
  style,
}: {
  src: string
  aspectRatio: string
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        width: '100%',
        paddingTop: aspectRatio,
        position: 'relative',
        background: 'linear-gradient(135deg, #e8e8e8 0%, #cfcfcf 100%)',
        overflow: 'hidden',
        ...style,
      }}
    >
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Root export
// ---------------------------------------------------------------------------

export function OverlayContent() {
  const [page, setPage] = useState<Page>('home')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        color: '#1a1a1a',
        background: '#fff',
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <NavBar page={page} setPage={setPage} />
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {page === 'home' && <HomeSection />}
        {page === 'about' && <AboutSection />}
        {page === 'projects' && (
          <ProjectsSection onProjectClick={setSelectedProject} />
        )}
      </div>
      {selectedProject && (
        <MacModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}
