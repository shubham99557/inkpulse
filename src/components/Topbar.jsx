import {
  Search,
  Bell,
  CalendarDays,
  ChevronDown,
} from "lucide-react"

function Topbar({
  days,
  setDays,
  refreshing,
}) {

  return (
    <header className="topbar">

      <div className="topbar-left">

        <div className="mobile-page-title">
          Analytics Overview
        </div>

        <div className="search-box">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search analytics..."
          />

          <span className="search-shortcut">
            /
          </span>

        </div>

      </div>

      <div className="topbar-right">

        {/* DATE RANGE */}

        <div className="range-selector">

          <CalendarDays size={16} />

          <select
            value={days}
            onChange={(e) =>
              setDays(Number(e.target.value))
            }
          >
            <option value={7}>
              Last 7 days
            </option>

            <option value={30}>
              Last 30 days
            </option>

            <option value={90}>
              Last 90 days
            </option>
          </select>

          <ChevronDown size={14} />

        </div>

        {/* REFRESH STATUS */}

        <div
          className={`refresh-status ${
            refreshing
              ? "refreshing"
              : ""
          }`}
        >
          <span className="status-dot" />
          Live
        </div>

        {/* NOTIFICATION */}

        <button className="icon-button">
          <Bell size={18} />

          <span className="notification-dot" />
        </button>

        {/* PROFILE */}

        <div className="profile">

          <div className="profile-avatar">
            IP
          </div>

          <div className="profile-info">
            <strong>InkPulse</strong>
            <span>Analytics</span>
          </div>

          <ChevronDown size={15} />

        </div>

      </div>

    </header>
  )
}

export default Topbar