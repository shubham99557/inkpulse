import {
  MoreHorizontal,
} from "lucide-react"

function ChartCard({
  title,
  subtitle,
  children,
  className = "",
}) {

  return (
    <section
      className={`chart-card ${className}`}
    >

      <div className="chart-card-header">

        <div>

          <h3>
            {title}
          </h3>

          {subtitle && (
            <p>
              {subtitle}
            </p>
          )}

        </div>

        <button className="chart-menu">
          <MoreHorizontal size={19} />
        </button>

      </div>

      <div className="chart-content">
        {children}
      </div>

    </section>
  )
}

export default ChartCard