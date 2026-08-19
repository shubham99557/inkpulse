import {
  useEffect,
  useMemo,
  useState,
} from "react"

import {
  MousePointerClick,
  Heart,
  Share2,
  MessageSquare,
  Bookmark,
  Activity,
  Users,
  Eye,
  RefreshCw,
  TrendingUp,
} from "lucide-react"

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"

import {
  getEngagementAnalytics,
} from "../services/api"


function Engagement() {

  const [
    sidebarCollapsed,
    setSidebarCollapsed,
  ] = useState(false)

  const [
    data,
    setData,
  ] = useState(null)

  const [
    days,
    setDays,
  ] = useState(30)

  const [
    loading,
    setLoading,
  ] = useState(true)

  const [
    refreshing,
    setRefreshing,
  ] = useState(false)

  const [
    error,
    setError,
  ] = useState("")


  // =========================================================
  // LOAD ENGAGEMENT ANALYTICS
  // =========================================================

  const loadEngagement = async (
    showRefresh = false
  ) => {

    try {

      setError("")

      if (showRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }

      const response =
        await getEngagementAnalytics(days)

      console.log(
        "Engagement analytics:",
        response
      )

      const result =
        response?.data ?? response

      setData(result)

    } catch (err) {

      console.error(
        "Engagement analytics error:",
        err
      )

      setError(
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load engagement analytics."
      )

    } finally {

      setLoading(false)
      setRefreshing(false)

    }

  }


  useEffect(() => {

    loadEngagement()

  }, [days])


  // =========================================================
  // DATA
  // =========================================================

  const trend =
    Array.isArray(data?.trend)
      ? data.trend
      : []

  const topArticles =
    Array.isArray(data?.top_articles)
      ? data.top_articles
      : []


  // =========================================================
  // INTERACTIONS
  // =========================================================

  const interactions = useMemo(() => {

    return [

      {
        key: "clicks",
        label: "Clicks",
        value: Number(data?.clicks) || 0,
        icon: MousePointerClick,
        className: "engagement-icon-blue",
        barClass: "engagement-bar-blue",
      },

      {
        key: "likes",
        label: "Likes",
        value: Number(data?.likes) || 0,
        icon: Heart,
        className: "engagement-icon-red",
        barClass: "engagement-bar-red",
      },

      {
        key: "shares",
        label: "Shares",
        value: Number(data?.shares) || 0,
        icon: Share2,
        className: "engagement-icon-green",
        barClass: "engagement-bar-green",
      },

      {
        key: "comments",
        label: "Comments",
        value: Number(data?.comments) || 0,
        icon: MessageSquare,
        className: "engagement-icon-purple",
        barClass: "engagement-bar-purple",
      },

      {
        key: "bookmarks",
        label: "Bookmarks",
        value: Number(data?.bookmarks) || 0,
        icon: Bookmark,
        className: "engagement-icon-orange",
        barClass: "engagement-bar-orange",
      },

    ]

  }, [data])


  const maxInteraction = useMemo(() => {

    if (interactions.length === 0) {
      return 1
    }

    return Math.max(
      ...interactions.map(
        (item) => item.value
      ),
      1
    )

  }, [interactions])


  // =========================================================
  // CHART DATA
  // =========================================================

  const chartData = useMemo(() => {

    return trend.map((item) => {

      const date =
        item?.date
          ? new Date(
              `${item.date}T00:00:00`
            )
          : null

      return {

        ...item,

        shortDate:
          date &&
          !Number.isNaN(
            date.getTime()
          )
            ? date.toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "short",
                }
              )
            : item?.date || "-",

        views:
          Number(item?.views) || 0,

        interactions:
          Number(item?.interactions) || 0,

        clicks:
          Number(item?.clicks) || 0,

        likes:
          Number(item?.likes) || 0,

        shares:
          Number(item?.shares) || 0,

        comments:
          Number(item?.comments) || 0,

        bookmarks:
          Number(item?.bookmarks) || 0,

        engagementRate:
          Number(item?.engagement_rate) || 0,

      }

    })

  }, [trend])


  // =========================================================
  // FORMATTERS
  // =========================================================

  const formatNumber = (value) => {

    const number =
      Number(value) || 0

    return new Intl.NumberFormat(
      "en-IN"
    ).format(number)

  }


  const formatPercentage = (value) => {

    const number =
      Number(value) || 0

    return `${number.toFixed(1)}%`

  }


  // =========================================================
  // LOADING
  // =========================================================

  if (
    loading &&
    !data
  ) {

    return (

      <>
        <style>{engagementStyles}</style>

        <div className="app-shell">

          <Sidebar
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />

          <main
            className={`main-content ${
              sidebarCollapsed
                ? "main-expanded"
                : ""
            }`}
          >

            <Topbar
              days={days}
              setDays={setDays}
              refreshing={true}
            />

            <div className="engagement-page">

              <div className="page-header">

                <div>

                  <div className="breadcrumb">
                    Analytics
                    <span>/</span>
                    Engagement
                  </div>

                  <h1>
                    Engagement
                  </h1>

                  <p>
                    Understand how readers
                    interact with your content.
                  </p>

                </div>

              </div>

              <div className="engagement-loading-grid">

                {[1, 2, 3, 4].map(
                  (item) => (
                    <div
                      key={item}
                      className="engagement-skeleton"
                    />
                  )
                )}

              </div>

            </div>

          </main>

        </div>
      </>

    )

  }


  // =========================================================
  // ERROR
  // =========================================================

  if (
    error &&
    !data
  ) {

    return (

      <>
        <style>{engagementStyles}</style>

        <div className="app-shell">

          <Sidebar
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />

          <main
            className={`main-content ${
              sidebarCollapsed
                ? "main-expanded"
                : ""
            }`}
          >

            <Topbar
              days={days}
              setDays={setDays}
              refreshing={false}
            />

            <div className="engagement-page">

              <div className="engagement-error">

                <div className="engagement-error-icon">
                  !
                </div>

                <h2>
                  Engagement unavailable
                </h2>

                <p>
                  {error}
                </p>

                <button
                  className="primary-button"
                  onClick={() =>
                    loadEngagement()
                  }
                >
                  Try again
                </button>

              </div>

            </div>

          </main>

        </div>
      </>

    )

  }


  // =========================================================
  // MAIN PAGE
  // =========================================================

  return (

    <>
      <style>{engagementStyles}</style>

      <div className="app-shell">

        {/* ================================================= */}
        {/* SIDEBAR */}
        {/* ================================================= */}

        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />


        {/* ================================================= */}
        {/* MAIN */}
        {/* ================================================= */}

        <main
          className={`main-content ${
            sidebarCollapsed
              ? "main-expanded"
              : ""
          }`}
        >

          <Topbar
            days={days}
            setDays={setDays}
            refreshing={refreshing}
          />


          <div className="engagement-page">


            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="page-header">

              <div>

                <div className="breadcrumb">
                  Analytics
                  <span>/</span>
                  Engagement
                </div>

                <h1>
                  Engagement
                </h1>

                <p>
                  Understand how readers
                  interact with your content.
                </p>

              </div>


              <div className="engagement-actions">

                <select
                  value={days}
                  onChange={(event) =>
                    setDays(
                      Number(
                        event.target.value
                      )
                    )
                  }
                  className="engagement-select"
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


                <button
                  type="button"
                  className="engagement-refresh"
                  onClick={() =>
                    loadEngagement(true)
                  }
                  disabled={refreshing}
                  title="Refresh engagement"
                >

                  <RefreshCw
                    size={17}
                    className={
                      refreshing
                        ? "spin"
                        : ""
                    }
                  />

                </button>

              </div>

            </div>


            {/* ================================================= */}
            {/* ERROR */}
            {/* ================================================= */}

            {error && (

              <div className="inline-error">
                {error}
              </div>

            )}


            {/* ================================================= */}
            {/* SUMMARY CARDS */}
            {/* ================================================= */}

            <div className="stats-grid">

              <EngagementStat
                title="Total Interactions"
                value={
                  formatNumber(
                    data?.total_interactions
                  )
                }
                subtitle="Reader interactions"
                icon={
                  <Activity size={20} />
                }
                iconClass="engagement-stat-indigo"
              />


              <EngagementStat
                title="Engagement Rate"
                value={
                  formatPercentage(
                    data?.engagement_rate
                  )
                }
                subtitle="Interactions vs views"
                icon={
                  <TrendingUp size={20} />
                }
                iconClass="engagement-stat-green"
              />


              <EngagementStat
                title="Unique Readers"
                value={
                  formatNumber(
                    data?.unique_readers
                  )
                }
                subtitle="Distinct readers"
                icon={
                  <Users size={20} />
                }
                iconClass="engagement-stat-blue"
              />


              <EngagementStat
                title="Total Views"
                value={
                  formatNumber(
                    data?.total_views
                  )
                }
                subtitle={`Last ${data?.days ?? days} days`}
                icon={
                  <Eye size={20} />
                }
                iconClass="engagement-stat-purple"
              />

            </div>


            {/* ================================================= */}
            {/* INTERACTION BREAKDOWN */}
            {/* ================================================= */}

            <div className="chart-card engagement-breakdown-card">

              <div className="chart-card-header">

                <div>

                  <div className="audience-title-row">

                    <span className="audience-heading-icon audience-heading-indigo">
                      <Activity size={18} />
                    </span>

                    <h2>
                      Interaction breakdown
                    </h2>

                  </div>

                  <p>
                    See how readers interact
                    with your content.
                  </p>

                </div>

              </div>


              <div className="engagement-interactions">

                {interactions.map(
                  (item) => {

                    const Icon =
                      item.icon

                    const percentage =
                      Math.min(
                        100,
                        Math.round(
                          (
                            item.value /
                            maxInteraction
                          ) * 100
                        )
                      )

                    return (

                      <div
                        key={item.key}
                        className="engagement-interaction"
                      >

                        <div className="engagement-interaction-top">

                          <div className="engagement-interaction-label">

                            <div
                              className={`engagement-interaction-icon ${
                                item.className
                              }`}
                            >

                              <Icon
                                size={17}
                              />

                            </div>

                            <span>
                              {item.label}
                            </span>

                          </div>

                          <strong>
                            {formatNumber(
                              item.value
                            )}
                          </strong>

                        </div>


                        <div className="audience-progress">

                          <div
                            className={`audience-progress-fill ${
                              item.barClass
                            }`}
                            style={{
                              width:
                                `${percentage}%`,
                            }}
                          />

                        </div>

                      </div>

                    )

                  }
                )}

              </div>

            </div>


            {/* ================================================= */}
            {/* CHARTS */}
            {/* ================================================= */}

            <div className="charts-grid">


              {/* ENGAGEMENT TREND */}

              <div className="chart-card chart-large">

                <div className="chart-card-header">

                  <div>

                    <div className="audience-title-row">

                      <span className="audience-heading-icon audience-heading-indigo">
                        <TrendingUp size={18} />
                      </span>

                      <h2>
                        Engagement trend
                      </h2>

                    </div>

                    <p>
                      Daily interactions over
                      the selected period.
                    </p>

                  </div>

                </div>


                <ResponsiveContainer
                  width="100%"
                  height={320}
                >

                  <AreaChart
                    data={chartData}
                  >

                    <defs>

                      <linearGradient
                        id="engagementGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >

                        <stop
                          offset="0%"
                          stopOpacity={0.25}
                        />

                        <stop
                          offset="100%"
                          stopOpacity={0}
                        />

                      </linearGradient>

                    </defs>


                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />


                    <XAxis
                      dataKey="shortDate"
                      axisLine={false}
                      tickLine={false}
                    />


                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
                    />


                    <Tooltip
                      formatter={(value) => [
                        formatNumber(value),
                        "Interactions",
                      ]}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #e5e7eb",
                        boxShadow:
                          "0 10px 30px rgba(0,0,0,0.08)",
                      }}
                    />


                    <Area
                      type="monotone"
                      dataKey="interactions"
                      name="Interactions"
                      stroke="#635BFF"
                      strokeWidth={3}
                      fill="url(#engagementGradient)"
                      fillOpacity={1}
                      activeDot={{
                        r: 5,
                        strokeWidth: 2,
                      }}
                    />

                  </AreaChart>

                </ResponsiveContainer>

              </div>


              {/* ENGAGEMENT RATE */}

              <div className="chart-card">

                <div className="chart-card-header">

                  <div>

                    <div className="audience-title-row">

                      <span className="audience-heading-icon audience-heading-green">
                        <TrendingUp size={18} />
                      </span>

                      <h2>
                        Engagement rate
                      </h2>

                    </div>

                    <p>
                      Daily interaction rate
                      compared with views.
                    </p>

                  </div>

                </div>


                <ResponsiveContainer
                  width="100%"
                  height={320}
                >

                  <BarChart
                    data={chartData}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />


                    <XAxis
                      dataKey="shortDate"
                      axisLine={false}
                      tickLine={false}
                    />


                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      unit="%"
                    />


                    <Tooltip
                      formatter={(value) => [
                        `${Number(value).toFixed(1)}%`,
                        "Engagement rate",
                      ]}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #e5e7eb",
                      }}
                    />


                    <Bar
                      dataKey="engagementRate"
                      name="Engagement rate"
                      fill="#12B76A"
                      radius={[
                        6,
                        6,
                        0,
                        0,
                      ]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>


            {/* ================================================= */}
            {/* TOP ARTICLES */}
            {/* ================================================= */}

            <div className="chart-card engagement-top-articles">

              <div className="chart-card-header">

                <div>

                  <div className="audience-title-row">

                    <span className="audience-heading-icon audience-heading-purple">
                      <TrendingUp size={18} />
                    </span>

                    <h2>
                      Top engaging articles
                    </h2>

                  </div>

                  <p>
                    Articles generating the
                    strongest reader interaction.
                  </p>

                </div>

              </div>


              {topArticles.length > 0 ? (

                <div className="engagement-articles-list">

                  {topArticles.map(
                    (article, index) => (

                      <div
                        key={
                          article.article_id ||
                          index
                        }
                        className="engagement-article"
                      >

                        <div className="engagement-article-rank">
                          {index + 1}
                        </div>


                        <div className="engagement-article-info">

                          <h3>
                            {article.article_title ||
                              "Untitled article"}
                          </h3>

                          <p>
                            {article.article_topic ||
                              "No topic"}
                          </p>

                        </div>


                        <div className="engagement-article-metric">

                          <span>
                            Interactions
                          </span>

                          <strong>
                            {formatNumber(
                              article.interactions
                            )}
                          </strong>

                        </div>


                        <div className="engagement-article-metric">

                          <span>
                            Views
                          </span>

                          <strong>
                            {formatNumber(
                              article.views
                            )}
                          </strong>

                        </div>


                        <div className="engagement-article-rate">

                          <span>
                            Engagement
                          </span>

                          <strong>
                            {formatPercentage(
                              article.engagement_rate
                            )}
                          </strong>

                        </div>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <div className="audience-no-data">
                  No engaging article data
                  available.
                </div>

              )}

            </div>


            {/* ================================================= */}
            {/* FOOTER */}
            {/* ================================================= */}

            <footer className="dashboard-footer">

              <span>
                InkPulse Content Intelligence
              </span>

              <span>
                Engagement analytics
                updated in real time
              </span>

            </footer>

          </div>

        </main>

      </div>

    </>

  )
}


// =============================================================
// ENGAGEMENT STAT
// =============================================================

function EngagementStat({
  title,
  value,
  subtitle,
  icon,
  iconClass,
}) {

  return (

    <div className="stat-card">

      <div className="stat-card-top">

        <div>

          <p className="stat-card-title">
            {title}
          </p>

          <p className="stat-card-value">
            {value}
          </p>

        </div>


        <div
          className={`audience-stat-icon ${
            iconClass
          }`}
        >

          {icon}

        </div>

      </div>


      <p className="stat-card-subtitle">
        {subtitle}
      </p>

    </div>

  )

}


// =============================================================
// EMBEDDED CSS
// =============================================================

const engagementStyles = `

/* ============================================================
   PAGE
============================================================ */

.engagement-page {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 28px 32px 40px;
  box-sizing: border-box;
}


/* ============================================================
   HEADER
============================================================ */

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 8px;
  color: #667085;
  font-size: 13px;
  font-weight: 500;
}

.breadcrumb span {
  color: #98a2b3;
}

.page-header h1 {
  margin: 0;
  color: #101828;
  font-size: 30px;
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.page-header p {
  margin: 8px 0 0;
  color: #667085;
  font-size: 14px;
  line-height: 1.6;
}

.engagement-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.engagement-select {
  height: 40px;
  min-width: 140px;
  padding: 0 34px 0 12px;
  border: 1px solid #d0d5dd;
  border-radius: 9px;
  background: #ffffff;
  color: #344054;
  font-size: 13px;
  font-weight: 500;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.engagement-select:hover {
  border-color: #98a2b3;
}

.engagement-select:focus {
  border-color: #635bff;
  box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.10);
}

.engagement-refresh {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d0d5dd;
  border-radius: 9px;
  background: #ffffff;
  color: #475467;
  cursor: pointer;
  transition: all 0.2s ease;
}

.engagement-refresh:hover:not(:disabled) {
  border-color: #98a2b3;
  background: #f9fafb;
  color: #344054;
}

.engagement-refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}


/* ============================================================
   STATS
============================================================ */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 20px;
}

.stat-card {
  min-width: 0;
  padding: 20px;
  border: 1px solid #eaecf0;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(16, 24, 40, 0.035);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  border-color: #d0d5dd;
  box-shadow: 0 8px 24px rgba(16, 24, 40, 0.07);
}

.stat-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.stat-card-title {
  margin: 0;
  color: #667085;
  font-size: 13px;
  font-weight: 500;
}

.stat-card-value {
  margin: 7px 0 0;
  color: #101828;
  font-size: 27px;
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.4px;
}

.stat-card-subtitle {
  margin: 15px 0 0;
  color: #98a2b3;
  font-size: 12px;
}

.audience-stat-icon {
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
}

.engagement-stat-indigo {
  color: #635bff;
  background: #eeedff;
}

.engagement-stat-green {
  color: #12b76a;
  background: #e9f9f0;
}

.engagement-stat-blue {
  color: #2e90fa;
  background: #eaf4ff;
}

.engagement-stat-purple {
  color: #9e77ed;
  background: #f4efff;
}


/* ============================================================
   CARDS
============================================================ */

.chart-card {
  min-width: 0;
  padding: 22px;
  border: 1px solid #eaecf0;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(16, 24, 40, 0.035);
}

.chart-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.audience-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.audience-title-row h2 {
  margin: 0;
  color: #101828;
  font-size: 16px;
  line-height: 1.3;
  font-weight: 650;
}

.chart-card-header p {
  margin: 6px 0 0 34px;
  color: #667085;
  font-size: 12px;
  line-height: 1.5;
}

.audience-heading-icon {
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
}

.audience-heading-indigo {
  color: #635bff;
  background: #eeedff;
}

.audience-heading-green {
  color: #12b76a;
  background: #e9f9f0;
}

.audience-heading-purple {
  color: #9e77ed;
  background: #f4efff;
}


/* ============================================================
   INTERACTION BREAKDOWN
============================================================ */

.engagement-breakdown-card {
  margin-bottom: 20px;
}

.engagement-interactions {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 18px;
}

.engagement-interaction {
  min-width: 0;
}

.engagement-interaction-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}

.engagement-interaction-label {
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 9px;
}

.engagement-interaction-label span {
  overflow: hidden;
  color: #475467;
  font-size: 13px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.engagement-interaction-top strong {
  color: #101828;
  font-size: 14px;
  font-weight: 650;
}

.engagement-interaction-icon {
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.engagement-icon-blue {
  color: #2e90fa;
  background: #eaf4ff;
}

.engagement-icon-red {
  color: #f04438;
  background: #fef0ef;
}

.engagement-icon-green {
  color: #12b76a;
  background: #e9f9f0;
}

.engagement-icon-purple {
  color: #9e77ed;
  background: #f4efff;
}

.engagement-icon-orange {
  color: #f79009;
  background: #fff4e5;
}

.audience-progress {
  width: 100%;
  height: 7px;
  overflow: hidden;
  border-radius: 999px;
  background: #f2f4f7;
}

.audience-progress-fill {
  height: 100%;
  border-radius: inherit;
  transition: width 0.5s ease;
}

.engagement-bar-blue {
  background: #2e90fa;
}

.engagement-bar-red {
  background: #f04438;
}

.engagement-bar-green {
  background: #12b76a;
}

.engagement-bar-purple {
  background: #9e77ed;
}

.engagement-bar-orange {
  background: #f79009;
}


/* ============================================================
   CHARTS
============================================================ */

.charts-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.chart-large {
  min-width: 0;
}

.recharts-wrapper {
  font-family: inherit;
}

.recharts-text {
  fill: #667085;
  font-size: 11px;
}

.recharts-cartesian-axis-tick-line {
  stroke: transparent;
}

.recharts-cartesian-grid-horizontal line {
  stroke: #f2f4f7;
}

.recharts-tooltip-wrapper {
  outline: none;
}


/* ============================================================
   TOP ARTICLES
============================================================ */

.engagement-top-articles {
  margin-bottom: 24px;
}

.engagement-articles-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.engagement-article {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) 110px 90px 100px;
  align-items: center;
  gap: 18px;
  min-width: 0;
  padding: 17px 4px;
  border-top: 1px solid #f2f4f7;
}

.engagement-article:first-child {
  border-top: 0;
}

.engagement-article-rank {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  background: #f2f4f7;
  color: #475467;
  font-size: 13px;
  font-weight: 700;
}

.engagement-article-info {
  min-width: 0;
}

.engagement-article-info h3 {
  overflow: hidden;
  margin: 0;
  color: #101828;
  font-size: 14px;
  line-height: 1.4;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.engagement-article-info p {
  overflow: hidden;
  margin: 4px 0 0;
  color: #98a2b3;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.engagement-article-metric,
.engagement-article-rate {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.engagement-article-metric span,
.engagement-article-rate span {
  color: #98a2b3;
  font-size: 11px;
  font-weight: 500;
}

.engagement-article-metric strong,
.engagement-article-rate strong {
  color: #344054;
  font-size: 14px;
  font-weight: 650;
}

.engagement-article-rate strong {
  color: #12b76a;
}

.audience-no-data {
  padding: 45px 20px;
  text-align: center;
  color: #98a2b3;
  font-size: 13px;
}


/* ============================================================
   FOOTER
============================================================ */

.dashboard-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 8px 2px 0;
  color: #98a2b3;
  font-size: 11px;
}


/* ============================================================
   ERROR
============================================================ */

.inline-error {
  margin-bottom: 18px;
  padding: 11px 14px;
  border: 1px solid #fecdca;
  border-radius: 9px;
  background: #fef3f2;
  color: #b42318;
  font-size: 13px;
}

.engagement-error {
  max-width: 520px;
  margin: 80px auto;
  padding: 42px 30px;
  border: 1px solid #eaecf0;
  border-radius: 16px;
  background: #ffffff;
  text-align: center;
  box-shadow: 0 10px 35px rgba(16, 24, 40, 0.06);
}

.engagement-error-icon {
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px;
  border-radius: 50%;
  background: #fef3f2;
  color: #d92d20;
  font-size: 21px;
  font-weight: 700;
}

.engagement-error h2 {
  margin: 0;
  color: #101828;
  font-size: 19px;
}

.engagement-error p {
  margin: 9px 0 22px;
  color: #667085;
  font-size: 13px;
  line-height: 1.6;
}

.primary-button {
  min-height: 40px;
  padding: 0 17px;
  border: 0;
  border-radius: 9px;
  background: #635bff;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.primary-button:hover {
  background: #5148e5;
}


/* ============================================================
   LOADING
============================================================ */

.engagement-loading-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.engagement-skeleton {
  height: 145px;
  border-radius: 14px;
  background:
    linear-gradient(
      90deg,
      #f2f4f7 25%,
      #e9ebef 50%,
      #f2f4f7 75%
    );
  background-size: 200% 100%;
  animation: engagementSkeleton 1.5s infinite;
}

@keyframes engagementSkeleton {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

.spin {
  animation: engagementSpin 0.8s linear infinite;
}

@keyframes engagementSpin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}


/* ============================================================
   RESPONSIVE
============================================================ */

@media (max-width: 1200px) {

  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .engagement-interactions {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }

  .engagement-article {
    grid-template-columns:
      40px
      minmax(0, 1fr)
      100px
      80px
      90px;
  }

}


@media (max-width: 900px) {

  .engagement-page {
    padding: 24px 20px 32px;
  }

  .page-header {
    flex-direction: column;
  }

  .engagement-actions {
    width: 100%;
  }

  .engagement-select {
    flex: 1;
  }

  .engagement-interactions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .engagement-article {
    grid-template-columns:
      36px
      minmax(0, 1fr)
      90px;
    gap: 12px;
  }

  .engagement-article-metric:nth-of-type(2) {
    display: none;
  }

}


@media (max-width: 650px) {

  .engagement-page {
    padding: 20px 14px 28px;
  }

  .page-header h1 {
    font-size: 25px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .engagement-interactions {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .chart-card {
    padding: 17px;
    border-radius: 12px;
  }

  .chart-card-header {
    margin-bottom: 15px;
  }

  .chart-card-header p {
    margin-left: 0;
    margin-top: 7px;
  }

  .audience-title-row {
    align-items: flex-start;
  }

  .engagement-article {
    grid-template-columns: 34px minmax(0, 1fr);
    gap: 12px;
    padding: 15px 2px;
  }

  .engagement-article-metric,
  .engagement-article-rate {
    display: none;
  }

  .dashboard-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

}


@media (max-width: 450px) {

  .engagement-actions {
    gap: 7px;
  }

  .engagement-select {
    min-width: 0;
  }

  .engagement-refresh {
    width: 38px;
    height: 38px;
  }

  .stat-card {
    padding: 17px;
  }

  .stat-card-value {
    font-size: 24px;
  }

}

`

export default Engagement