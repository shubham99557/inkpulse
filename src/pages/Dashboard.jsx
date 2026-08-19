import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"

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

import {
  RefreshCw,
  Eye,
  MousePointerClick,
  Heart,
  Share2,
  MessageSquare,
  Bookmark,
} from "lucide-react"

import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import StatCard from "../components/StatCard"
import ChartCard from "../components/ChartCard"

import {
  getAnalyticsSummary,
  getAnalyticsTimeSeries,
} from "../services/api"


function Dashboard() {

  const [
    sidebarCollapsed,
    setSidebarCollapsed,
  ] = useState(false)

  const [
    summary,
    setSummary,
  ] = useState(null)

  const [
    timeSeries,
    setTimeSeries,
  ] = useState([])

  const [
    days,
    setDays,
  ] = useState(7)

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
  // LOAD ANALYTICS
  // =========================================================

  const loadAnalytics = useCallback(
    async (showRefresh = false) => {

      try {

        setError("")

        if (showRefresh) {
          setRefreshing(true)
        } else {
          setLoading(true)
        }

        const [
          summaryData,
          seriesData,
        ] = await Promise.all([
          getAnalyticsSummary(),
          getAnalyticsTimeSeries(days),
        ])

        setSummary(
          summaryData || null
        )

        setTimeSeries(
          Array.isArray(seriesData?.data)
            ? seriesData.data
            : []
        )

      } catch (err) {

        console.error(
          "Analytics loading error:",
          err
        )

        setError(
          "Unable to load analytics. Make sure the Django backend is running."
        )

      } finally {

        setLoading(false)
        setRefreshing(false)

      }

    },
    [days]
  )


  // =========================================================
  // LOAD WHEN PERIOD CHANGES
  // =========================================================

  useEffect(() => {

    loadAnalytics()

  }, [loadAnalytics])


  // =========================================================
  // FORMAT HELPERS
  // =========================================================

  const formatNumber = (value) => {

    if (
      value === null ||
      value === undefined ||
      Number.isNaN(Number(value))
    ) {
      return "0"
    }

    return new Intl.NumberFormat(
      "en-IN"
    ).format(Number(value))

  }


  const formatSeconds = (seconds) => {

    const value =
      Number(seconds) || 0

    if (value < 60) {
      return `${Math.round(value)}s`
    }

    const minutes =
      Math.floor(value / 60)

    const remaining =
      Math.round(value % 60)

    if (remaining === 0) {
      return `${minutes}m`
    }

    return `${minutes}m ${remaining}s`

  }


  const formatDate = (date) => {

    if (!date) {
      return "-"
    }

    const parsed =
      new Date(date)

    if (
      Number.isNaN(
        parsed.getTime()
      )
    ) {
      return "-"
    }

    return parsed.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
      }
    )

  }


  const formatPercentage = (value) => {

    const number =
      Number(value) || 0

    return `${number.toFixed(1)}%`

  }


  // =========================================================
  // CHART DATA
  // =========================================================

  const chartData = useMemo(() => {

    return timeSeries.map((item) => ({

      ...item,

      shortDate:
        formatDate(item.date),

      views:
        Number(item.views) || 0,

      attention:
        Number(
          item.attention_score
        ) || 0,

      engagement:
        Number(
          item.engagement_rate
        ) || 0,

      scroll:
        Number(
          item.average_scroll_depth
        ) || 0,

      reading:
        Number(
          item.average_reading_seconds
        ) || 0,

    }))

  }, [timeSeries])


  // =========================================================
  // TOP ARTICLE INTERACTIONS
  // =========================================================

  const topArticleInteractions =
    useMemo(() => {

      const article =
        summary?.top_article

      if (!article) {
        return 0
      }

      return (
        Number(article.clicks) || 0
      ) + (
        Number(article.likes) || 0
      ) + (
        Number(article.shares) || 0
      ) + (
        Number(article.comments) || 0
      ) + (
        Number(article.bookmarks) || 0
      )

    }, [summary])


  // =========================================================
  // LOADING
  // =========================================================

  if (
    loading &&
    !summary
  ) {

    return (
      <div className="app-shell">

        <Sidebar
          collapsed={
            sidebarCollapsed
          }
          setCollapsed={
            setSidebarCollapsed
          }
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

          <div className="loading-screen">

            <div className="loading-spinner" />

            <p>
              Loading InkPulse analytics...
            </p>

          </div>

        </main>

      </div>
    )

  }


  // =========================================================
  // ERROR
  // =========================================================

  if (
    error &&
    !summary
  ) {

    return (
      <div className="app-shell">

        <Sidebar
          collapsed={
            sidebarCollapsed
          }
          setCollapsed={
            setSidebarCollapsed
          }
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

          <div className="error-screen">

            <div className="error-icon">
              !
            </div>

            <h2>
              Analytics unavailable
            </h2>

            <p>
              {error}
            </p>

            <button
              className="primary-button"
              onClick={() =>
                loadAnalytics()
              }
            >
              Try again
            </button>

          </div>

        </main>

      </div>
    )

  }


  // =========================================================
  // DASHBOARD
  // =========================================================

  return (

    <div className="app-shell">

      <Sidebar
        collapsed={
          sidebarCollapsed
        }
        setCollapsed={
          setSidebarCollapsed
        }
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
          refreshing={refreshing}
        />

        <div className="dashboard">

          {/* ================================================= */}
          {/* PAGE HEADER */}
          {/* ================================================= */}

          <div className="page-header">

            <div>

              <div className="breadcrumb">

                Analytics

                <span>/</span>

                Overview

              </div>

              <h1>
                Content Intelligence
              </h1>

              <p>
                Understand how readers discover,
                consume and engage with your content.
              </p>

            </div>

            <button
              className="refresh-button"
              onClick={() =>
                loadAnalytics(true)
              }
              disabled={refreshing}
            >

              <RefreshCw
                size={16}
                className={
                  refreshing
                    ? "spin"
                    : ""
                }
              />

              {refreshing
                ? "Refreshing..."
                : "Refresh data"
              }

            </button>

          </div>


          {/* ================================================= */}
          {/* ALERT */}
          {/* ================================================= */}

          {error && (

            <div className="inline-error">
              {error}
            </div>

          )}


          {/* ================================================= */}
          {/* STAT CARDS */}
          {/* ================================================= */}

          <div className="stats-grid">

            <StatCard
              title="Total Views"
              value={
                formatNumber(
                  summary?.total_views
                )
              }
              subtitle={`Across all articles · ${days} days`}
              icon="views"
            />

            <StatCard
              title="Unique Readers"
              value={
                formatNumber(
                  summary?.total_unique_readers
                )
              }
              subtitle="Distinct readers"
              icon="readers"
            />

            <StatCard
              title="Attention Score"
              value={
                `${Number(
                  summary?.average_attention_score || 0
                ).toFixed(1)}`
              }
              subtitle="Average content attention"
              icon="attention"
            />

            <StatCard
              title="Engagement Rate"
              value={
                formatPercentage(
                  summary?.average_engagement_rate
                )
              }
              subtitle="Reader interactions"
              icon="engagement"
            />

            <StatCard
              title="Avg. Reading Time"
              value={
                formatSeconds(
                  summary?.average_reading_seconds
                )
              }
              subtitle="Per completed session"
              icon="time"
            />

          </div>


          {/* ================================================= */}
          {/* MAIN CHARTS */}
          {/* ================================================= */}

          <div className="charts-grid">

            {/* READER ACTIVITY */}

            <ChartCard
              title="Reader activity"
              subtitle={`Views over the last ${days} days`}
              className="chart-large"
            >

              <ResponsiveContainer
                width="100%"
                height={320}
              >

                <AreaChart
                  data={chartData}
                >

                  <defs>

                    <linearGradient
                      id="viewsGradient"
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
                    formatter={(value) =>
                      [
                        formatNumber(value),
                        "Views",
                      ]
                    }
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      boxShadow:
                        "0 10px 30px rgba(0,0,0,0.08)",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="views"
                    name="Views"
                    stroke="#635BFF"
                    strokeWidth={3}
                    fill="url(#viewsGradient)"
                    fillOpacity={1}
                    activeDot={{
                      r: 5,
                      strokeWidth: 2,
                    }}
                  />

                </AreaChart>

              </ResponsiveContainer>

            </ChartCard>


            {/* ATTENTION */}

            <ChartCard
              title="Attention trend"
              subtitle="Daily content attention"
            >

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
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    formatter={(value) =>
                      [
                        `${Number(value).toFixed(1)}`,
                        "Attention",
                      ]
                    }
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                    }}
                  />

                  <Bar
                    dataKey="attention"
                    name="Attention"
                    fill="#635BFF"
                    radius={[
                      6,
                      6,
                      0,
                      0,
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </ChartCard>

          </div>


          {/* ================================================= */}
          {/* SECOND ROW */}
          {/* ================================================= */}

          <div className="charts-grid">

            {/* ENGAGEMENT */}

            <ChartCard
              title="Engagement"
              subtitle="Reader interaction rate"
            >

              <ResponsiveContainer
                width="100%"
                height={280}
              >

                <AreaChart
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
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    formatter={(value) =>
                      [
                        `${Number(value).toFixed(1)}%`,
                        "Engagement",
                      ]
                    }
                  />

                  <Area
                    type="monotone"
                    dataKey="engagement"
                    name="Engagement"
                    stroke="#1570EF"
                    strokeWidth={3}
                    fill="#1570EF"
                    fillOpacity={0.12}
                  />

                </AreaChart>

              </ResponsiveContainer>

            </ChartCard>


            {/* READING + SCROLL */}

            <ChartCard
              title="Reading depth"
              subtitle="Scroll depth vs reading time"
            >

              <ResponsiveContainer
                width="100%"
                height={280}
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
                    yAxisId="left"
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    unit="%"
                  />

                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    unit="s"
                  />

                  <Tooltip />

                  <Bar
                    yAxisId="left"
                    dataKey="scroll"
                    name="Scroll depth"
                    fill="#12B76A"
                    radius={[
                      5,
                      5,
                      0,
                      0,
                    ]}
                  />

                  <Bar
                    yAxisId="right"
                    dataKey="reading"
                    name="Reading time"
                    fill="#F79009"
                    radius={[
                      5,
                      5,
                      0,
                      0,
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </ChartCard>

          </div>


          {/* ================================================= */}
          {/* TOP ARTICLE */}
          {/* ================================================= */}

          {summary?.top_article && (

            <section className="article-highlight">

              <div className="article-highlight-header">

                <div>

                  <span className="section-eyebrow">
                    TOP PERFORMING ARTICLE
                  </span>

                  <h2>
                    {summary.top_article.article_title}
                  </h2>

                  <p>
                    {summary.top_article.article_topic}
                  </p>

                </div>

                <div className="article-score">

                  <span>
                    Attention
                  </span>

                  <strong>
                    {Number(
                      summary.top_article.attention_score || 0
                    ).toFixed(1)}
                  </strong>

                  <small>
                    / 100
                  </small>

                </div>

              </div>


              <div className="article-metrics">

                <ArticleMetric
                  icon={Eye}
                  label="Views"
                  value={
                    formatNumber(
                      summary.top_article.total_views
                    )
                  }
                />

                <ArticleMetric
                  icon={MousePointerClick}
                  label="Interactions"
                  value={
                    formatNumber(
                      topArticleInteractions
                    )
                  }
                />

                <ArticleMetric
                  icon={Heart}
                  label="Likes"
                  value={
                    formatNumber(
                      summary.top_article.likes
                    )
                  }
                />

                <ArticleMetric
                  icon={Share2}
                  label="Shares"
                  value={
                    formatNumber(
                      summary.top_article.shares
                    )
                  }
                />

                <ArticleMetric
                  icon={MessageSquare}
                  label="Comments"
                  value={
                    formatNumber(
                      summary.top_article.comments
                    )
                  }
                />

                <ArticleMetric
                  icon={Bookmark}
                  label="Bookmarks"
                  value={
                    formatNumber(
                      summary.top_article.bookmarks
                    )
                  }
                />

              </div>

            </section>

          )}


          {/* ================================================= */}
          {/* FOOTER */}
          {/* ================================================= */}

          <footer className="dashboard-footer">

            <span>
              InkPulse Content Intelligence
            </span>

            <span>
              Analytics updated in real time
            </span>

          </footer>

        </div>

      </main>

    </div>

  )
}


// =============================================================
// ARTICLE METRIC
// =============================================================

function ArticleMetric({
  icon: Icon,
  label,
  value,
}) {

  return (
    <div className="article-metric">

      <div className="article-metric-icon">

        <Icon
          size={17}
        />

      </div>

      <div>

        <span>
          {label}
        </span>

        <strong>
          {value}
        </strong>

      </div>

    </div>
  )
}


export default Dashboard