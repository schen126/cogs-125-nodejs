import { notFound } from 'next/navigation'
import Link from 'next/link'
import { projects } from '../../data/projects'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  return { title: project ? project.title : 'Project' }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

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
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          ← Back
        </Link>
        <span style={{ color: '#d0d0d0' }}>|</span>
        <span style={{ fontSize: 13, color: '#999' }}>Projects</span>
        <span style={{ color: '#d0d0d0' }}>/</span>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{project.title}</span>
      </header>

      <article
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '3rem 2rem',
        }}
      >
        {/* Project image */}
        <div
          style={{
            width: '100%',
            paddingTop: '52%',
            position: 'relative',
            background: 'linear-gradient(135deg, #e8e8e8 0%, #cfcfcf 100%)',
            borderRadius: 12,
            marginBottom: '2rem',
            overflow: 'hidden',
          }}
        >
          {project.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={project.title}
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

        {/* Tags */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            flexWrap: 'wrap',
            marginBottom: '1rem',
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '3px 10px',
                background: '#f0f0f0',
                borderRadius: 999,
                fontSize: 12,
                color: '#555',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1
          style={{
            margin: 0,
            marginBottom: '1rem',
            fontSize: '2rem',
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h1>

        {/* Description */}
        <p
          style={{
            margin: 0,
            marginBottom: '2rem',
            fontSize: 15,
            color: '#555',
            lineHeight: 1.8,
          }}
        >
          {project.longDescription}
        </p>

        {/* CTA */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '0.65rem 1.5rem',
            background: '#1a1a1a',
            color: '#fff',
            borderRadius: 8,
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          View Project →
        </a>
      </article>

      {/* Other projects */}
      <section
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '0 2rem 4rem',
        }}
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#aaa',
            marginBottom: 16,
          }}
        >
          Other Projects
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 12,
          }}
        >
          {projects
            .filter((p) => p.slug !== slug)
            .map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                style={{
                  border: '1px solid #eaeaea',
                  borderRadius: 10,
                  overflow: 'hidden',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                  transition: 'box-shadow 0.2s',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    paddingTop: '55%',
                    background: 'linear-gradient(135deg, #e8e8e8, #cfcfcf)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {p.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt={p.title}
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
                <div style={{ padding: '0.6rem 0.75rem' }}>
                  <div
                    style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}
                  >
                    {p.title}
                  </div>
                  <div style={{ fontSize: 11, color: '#777' }}>
                    {p.description}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </main>
  )
}
