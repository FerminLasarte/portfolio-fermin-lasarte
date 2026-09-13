// Línea de tiempo de Experiencia y Educación. Recibe los textos ya traducidos.
export default function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <div key={item.id} className="timeline-item animate-on-scroll">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <div className="timeline-header">
              <h3>{item.title}</h3>
              <span className="timeline-period">{item.period}</span>
            </div>
            {item.company && <span className="timeline-company">{item.company}</span>}
            <p>{item.desc}</p>
            {item.tags?.length > 0 && (
              <div className="timeline-tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
