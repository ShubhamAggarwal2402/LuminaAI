import { Link, useLocation, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import type { ModuleData } from '../data/sampleModule'
import { SAMPLE_MODULE } from '../data/sampleModule'
import './ModuleDetailScreen.css'

export type { ModuleData }

export default function ModuleDetailScreen() {
  useParams<{ moduleId: string }>() // moduleId available for future fetch by ID
  const location = useLocation()
  const module = (location.state as { module?: ModuleData } | null)?.module ?? SAMPLE_MODULE

  return (
    <div className="module-detail-screen">
      <header className="module-detail-header">
        <Link to="/dashboard" className="module-detail-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
        <h1 className="module-detail-title">{module.title}</h1>
        <span className="module-detail-id">Module: {module.module_id}</span>
      </header>

      <article className="module-detail-content">
        <ReactMarkdown
          components={{
            h2: ({ children }) => <h2 className="module-md-h2">{children}</h2>,
            h3: ({ children }) => <h3 className="module-md-h3">{children}</h3>,
            p: ({ children }) => <p className="module-md-p">{children}</p>,
            ul: ({ children }) => <ul className="module-md-ul">{children}</ul>,
            ol: ({ children }) => <ol className="module-md-ol">{children}</ol>,
            li: ({ children }) => <li className="module-md-li">{children}</li>,
            pre: ({ children }) => <pre className="module-md-pre">{children}</pre>,
            code: ({ children, ...props }) => <code className="module-md-code" {...props}>{children}</code>,
            strong: ({ children }) => <strong className="module-md-strong">{children}</strong>,
            em: ({ children }) => <em className="module-md-em">{children}</em>,
          }}
        >
          {module.content_md}
        </ReactMarkdown>
      </article>
    </div>
  )
}
