import {
  BarChart3,
  LayoutDashboard,
  Newspaper,
  Activity,
  Brain,
  Users,
  Settings,
  ChevronLeft,
} from "lucide-react"

import { NavLink } from "react-router-dom"


function Sidebar({
  collapsed,
  setCollapsed,
}) {

  const menuItems = [
    {
      label: "Overview",
      icon: LayoutDashboard,
      path: "/analytics",
    },
    {
      label: "Articles",
      icon: Newspaper,
      path: "/analytics/articles",
    },
    {
      label: "Audience",
      icon: Users,
      path: "/audience",
    },
    {
      label: "Engagement",
      icon: Activity,
      path: "/analytics/engagement",
    },
    {
      label: "Insights",
      icon: Brain,
      path: "/analytics/insights",
    },
  ]


  return (
    <aside
      className={`sidebar ${
        collapsed
          ? "sidebar-collapsed"
          : ""
      }`}
    >

      {/* ================================================= */}
      {/* LOGO */}
      {/* ================================================= */}

      <div className="sidebar-logo">

        <div className="logo-mark">
          <BarChart3 size={21} />
        </div>

        {!collapsed && (
          <div className="logo-text">
            <span>Ink</span>Pulse
          </div>
        )}

      </div>


      {/* ================================================= */}
      {/* NAVIGATION */}
      {/* ================================================= */}

      <div className="sidebar-section">

        {!collapsed && (
          <div className="sidebar-label">
            ANALYTICS
          </div>
        )}

        <nav>

          {menuItems.map((item) => {

            const Icon = item.icon

            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === "/analytics"}
                className={({ isActive }) =>
                  `sidebar-item ${
                    isActive
                      ? "sidebar-item-active"
                      : ""
                  }`
                }
              >

                <Icon size={19} />

                {!collapsed && (
                  <span>
                    {item.label}
                  </span>
                )}

              </NavLink>
            )

          })}

        </nav>

      </div>


      {/* ================================================= */}
      {/* BOTTOM */}
      {/* ================================================= */}

      <div className="sidebar-bottom">

        {!collapsed && (
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `sidebar-item ${
                isActive
                  ? "sidebar-item-active"
                  : ""
              }`
            }
          >
            <Settings size={19} />

            <span>
              Settings
            </span>
          </NavLink>
        )}


        <button
          className="collapse-button"
          onClick={() =>
            setCollapsed(!collapsed)
          }
        >

          <ChevronLeft
            size={18}
            className={
              collapsed
                ? "rotate-icon"
                : ""
            }
          />

          {!collapsed && (
            <span>
              Collapse
            </span>
          )}

        </button>

      </div>

    </aside>
  )
}


export default Sidebar