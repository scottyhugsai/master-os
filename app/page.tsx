'use client';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        paddingTop: '4rem',
        paddingBottom: '3rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 700,
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #00d9ff 0%, #a78bfa 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-1px',
          }}>
            Master Your Roofing Business
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#cbd5e1',
            marginBottom: '2rem',
            maxWidth: '42rem',
            margin: '0 auto 2rem',
          }}>
            Real-time crew management, project tracking, smart quoting, and invoicing. Built for contractors who move fast.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <button className="btn-primary" style={{
              background: '#00d9ff',
              color: '#0f172a',
              fontWeight: 600,
              padding: '0.75rem 2rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#00b8d4';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 217, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#00d9ff';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              Enter Dashboard
            </button>
            <button className="btn-secondary" style={{
              background: 'transparent',
              color: '#00d9ff',
              fontWeight: 600,
              padding: '0.75rem 2rem',
              borderRadius: '0.5rem',
              border: '1px solid #00d9ff',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 217, 255, 0.1)';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 217, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              View Projects
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{
        paddingTop: '3rem',
        paddingBottom: '3rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {[
              { title: 'Real-Time Dashboard', desc: 'See active projects, crew status, and revenue at a glance.' },
              { title: 'Smart Quoting', desc: 'Create professional quotes in minutes, not hours.' },
              { title: 'Crew Management', desc: 'Schedule teams, track hours, assign projects instantly.' },
              { title: 'Project Tracking', desc: 'Monitor progress, costs, and timelines in real-time.' },
              { title: 'Invoicing & Payments', desc: 'Send invoices, track payments, manage cash flow.' },
              { title: 'Photo Gallery', desc: 'Upload before/after photos, organize by project.' },
            ].map((feature, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(26, 31, 58, 0.8)',
                  border: '1px solid rgba(0, 217, 255, 0.1)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.5)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.3)';
                  e.currentTarget.style.background = 'rgba(26, 31, 58, 0.95)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.background = 'rgba(26, 31, 58, 0.8)';
                }}
              >
                <h3 style={{
                  color: '#00d9ff',
                  marginBottom: '0.75rem',
                  fontSize: '1.25rem',
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#cbd5e1',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
