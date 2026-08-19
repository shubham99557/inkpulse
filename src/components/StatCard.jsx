import {
  Eye,
  Users,
  Brain,
  MessageCircle,
  Clock3,
  ArrowUpRight,
  Activity,
} from "lucide-react"

function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
}) {
  const icons = {
    views: Eye,
    readers: Users,
    attention: Brain,
    engagement: MessageCircle,
    time: Clock3,
  }

  const Icon = icons[icon] || Activity

  return (
    <div className={`stat-card stat-card-${icon}`}>

      {/* TOP ROW */}
      <div className="stat-card-top">

        <div className={`stat-icon stat-icon-${icon}`}>
          <Icon
            size={19}
            strokeWidth={2}
          />
        </div>

        {trend && (
          <div className="stat-trend">
            <ArrowUpRight size={14} />
            <span>{trend}</span>
          </div>
        )}

      </div>

      {/* CONTENT */}
      <div className="stat-content">

        <span className="stat-title">
          {title}
        </span>

        <div className="stat-value">
          {value}
        </div>

        <span className="stat-subtitle">
          {subtitle}
        </span>

      </div>

      {/* SUBTLE DECORATIVE GLOW */}
      <div className="stat-card-glow" />

    </div>
  )
}

export default StatCard