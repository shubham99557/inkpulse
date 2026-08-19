import {
  useEffect,
  useState,
} from "react"

import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Eye,
  Lightbulb,
  RefreshCw,
  Target,
  TrendingUp,
  Users,
  Clock,
  Heart,
  Share2,
} from "lucide-react"

import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"

import {
  getAnalyticsInsights,
} from "../services/api"


function Insight() {

  // =========================================================
  // SIDEBAR
  // =========================================================

  const [
    sidebarCollapsed,
    setSidebarCollapsed,
  ] = useState(false)


  // =========================================================
  // STATE
  // =========================================================

  const [
    data,
    setData,
  ] = useState(null)

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
  // LOAD INSIGHTS
  // =========================================================

  const loadInsights = async (
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
        await getAnalyticsInsights()

      console.log(
        "Analytics insights:",
        response
      )

      const result =
        response?.data ?? response

      setData(result)

    } catch (err) {

      console.error(
        "Analytics insights error:",
        err
      )

      setError(
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load analytics insights."
      )

    } finally {

      setLoading(false)
      setRefreshing(false)

    }

  }


  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {

    loadInsights()

  }, [])


  // =========================================================
  // DATA
  // =========================================================

  const overview =
    data?.overview || {}

  const highlights =
    data?.highlights || {}

  const insights =
    Array.isArray(data?.insights)
      ? data.insights
      : []

  const recommendations =
    Array.isArray(data?.recommendations)
      ? data.recommendations
      : []

  const risingArticles =
    Array.isArray(data?.rising_articles)
      ? data.rising_articles
      : []

  const decliningArticles =
    Array.isArray(data?.declining_articles)
      ? data.declining_articles
      : []

  const topArticles =
    Array.isArray(data?.top_articles)
      ? data.top_articles
      : []

  const bestTopic =
    data?.best_topic || null


  // =========================================================
  // FORMAT NUMBER
  // =========================================================

  const formatNumber = (
    value
  ) => {

    const number =
      Number(value) || 0

    return new Intl.NumberFormat(
      "en-IN"
    ).format(number)

  }


  // =========================================================
  // FORMAT PERCENTAGE
  // =========================================================

  const formatPercentage = (
    value
  ) => {

    const number =
      Number(value) || 0

    return `${number.toFixed(1)}%`

  }


  // =========================================================
  // FORMAT TIME
  // =========================================================

  const formatSeconds = (
    value
  ) => {

    const seconds =
      Number(value) || 0

    if (seconds < 60) {
      return `${seconds.toFixed(0)} sec`
    }

    const minutes =
      Math.floor(seconds / 60)

    const remaining =
      Math.round(seconds % 60)

    if (remaining === 0) {
      return `${minutes} min`
    }

    return `${minutes}m ${remaining}s`

  }


  // =========================================================
  // GET INSIGHT ICON
  // =========================================================

  const getInsightIcon = (
    type
  ) => {

    if (type === "warning") {
      return (
        <AlertTriangle size={19} />
      )
    }

    if (type === "success") {
      return (
        <TrendingUp size={19} />
      )
    }

    return (
      <Lightbulb size={19} />
    )

  }


  // =========================================================
  // GET RECOMMENDATION ICON
  // =========================================================

  const getRecommendationIcon = (
    category
  ) => {

    const value =
      String(category || "")
        .toLowerCase()

    if (value.includes("growth")) {
      return (
        <TrendingUp size={19} />
      )
    }

    if (value.includes("attention")) {
      return (
        <Eye size={19} />
      )
    }

    if (value.includes("engagement")) {
      return (
        <Heart size={19} />
      )
    }

    if (value.includes("content")) {
      return (
        <BookOpen size={19} />
      )
    }

    return (
      <Lightbulb size={19} />
    )

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

        <style>{INSIGHT_CSS}</style>

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
              refreshing={true}
            />

            <div className="insight-page">

              <div className="insight-page-header">

                <div>

                  <div className="insight-breadcrumb">

                    Analytics

                    <span>/</span>

                    Insights

                  </div>

                  <h1>
                    Insights
                  </h1>

                  <p>
                    Turn your content analytics
                    into actionable decisions.
                  </p>

                </div>

              </div>


              <div className="insight-loading-grid">

                {[1, 2, 3, 4].map(
                  (item) => (

                    <div
                      key={item}
                      className="insight-skeleton"
                    />

                  )
                )}

              </div>


              <div className="insight-loading-large" />

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

        <style>{INSIGHT_CSS}</style>

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
              refreshing={false}
            />

            <div className="insight-page">

              <div className="insight-error">

                <div className="insight-error-icon">
                  !
                </div>

                <h2>
                  Insights unavailable
                </h2>

                <p>
                  {error}
                </p>

                <button
                  type="button"
                  className="insight-primary-button"
                  onClick={() =>
                    loadInsights()
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

      <style>{INSIGHT_CSS}</style>

      <div className="app-shell">


        {/* ================================================= */}
        {/* SIDEBAR */}
        {/* ================================================= */}

        <Sidebar
          collapsed={
            sidebarCollapsed
          }
          setCollapsed={
            setSidebarCollapsed
          }
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


          {/* ================================================= */}
          {/* TOPBAR */}
          {/* ================================================= */}

          <Topbar
            refreshing={refreshing}
          />


          {/* ================================================= */}
          {/* PAGE */}
          {/* ================================================= */}

          <div className="insight-page">


            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="insight-page-header">

              <div>

                <div className="insight-breadcrumb">

                  Analytics

                  <span>/</span>

                  Insights

                </div>

                <h1>
                  Insights
                </h1>

                <p>
                  Turn your content analytics
                  into actionable decisions.
                </p>

              </div>


              <button
                type="button"
                className="insight-refresh"
                onClick={() =>
                  loadInsights(true)
                }
                disabled={refreshing}
                title="Refresh insights"
              >

                <RefreshCw
                  size={17}
                  className={
                    refreshing
                      ? "insight-spin"
                      : ""
                  }
                />

                <span>
                  Refresh
                </span>

              </button>

            </div>


            {/* ================================================= */}
            {/* INLINE ERROR */}
            {/* ================================================= */}

            {error && (

              <div className="insight-inline-error">

                <AlertTriangle
                  size={17}
                />

                <span>
                  {error}
                </span>

              </div>

            )}


            {/* ================================================= */}
            {/* OVERVIEW */}
            {/* ================================================= */}

            <div className="insight-stats-grid">


              <InsightStat
                title="Total Views"
                value={
                  formatNumber(
                    overview.total_views
                  )
                }
                subtitle="Content reach"
                icon={
                  <Eye size={20} />
                }
                className="insight-stat-purple"
              />


              <InsightStat
                title="Total Readers"
                value={
                  formatNumber(
                    overview.total_readers
                  )
                }
                subtitle="Distinct readers"
                icon={
                  <Users size={20} />
                }
                className="insight-stat-blue"
              />


              <InsightStat
                title="Engagement Rate"
                value={
                  formatPercentage(
                    overview.average_engagement_rate
                  )
                }
                subtitle="Average interaction"
                icon={
                  <Activity size={20} />
                }
                className="insight-stat-green"
              />


              <InsightStat
                title="Attention Score"
                value={
                  Number(
                    overview.average_attention_score
                  || 0
                  ).toFixed(1)
                }
                subtitle="Average attention"
                icon={
                  <Target size={20} />
                }
                className="insight-stat-orange"
              />


              <InsightStat
                title="Reading Time"
                value={
                  formatSeconds(
                    overview.average_reading_seconds
                  )
                }
                subtitle="Average per reader"
                icon={
                  <Clock size={20} />
                }
                className="insight-stat-indigo"
              />


              <InsightStat
                title="Scroll Depth"
                value={
                  formatPercentage(
                    overview.average_scroll_depth
                  )
                }
                subtitle="Average content depth"
                icon={
                  <BarChart3 size={20} />
                }
                className="insight-stat-pink"
              />

            </div>


            {/* ================================================= */}
            {/* KEY HIGHLIGHTS */}
            {/* ================================================= */}

            <section className="insight-section">

              <div className="insight-section-heading">

                <div>

                  <div className="insight-title-row">

                    <span className="insight-heading-icon insight-heading-purple">

                      <TrendingUp
                        size={18}
                      />

                    </span>

                    <h2>
                      Key highlights
                    </h2>

                  </div>

                  <p>
                    Your strongest content
                    performance signals.
                  </p>

                </div>

              </div>


              <div className="insight-highlights-grid">


                <HighlightCard
                  title="Most viewed"
                  icon={
                    <Eye size={18} />
                  }
                  article={
                    highlights.most_viewed
                  }
                  metric={
                    highlights.most_viewed
                      ? formatNumber(
                          highlights.most_viewed.views
                        )
                      : "—"
                  }
                  metricLabel="views"
                  className="highlight-purple"
                />


                <HighlightCard
                  title="Most engaging"
                  icon={
                    <Heart size={18} />
                  }
                  article={
                    highlights.most_engaging
                  }
                  metric={
                    highlights.most_engaging
                      ? formatPercentage(
                          highlights.most_engaging.engagement_rate
                        )
                      : "—"
                  }
                  metricLabel="engagement"
                  className="highlight-green"
                />


                <HighlightCard
                  title="Highest attention"
                  icon={
                    <Target size={18} />
                  }
                  article={
                    highlights.highest_attention
                  }
                  metric={
                    highlights.highest_attention
                      ? Number(
                          highlights
                            .highest_attention
                            .attention_score
                        || 0
                        ).toFixed(1)
                      : "—"
                  }
                  metricLabel="attention score"
                  className="highlight-orange"
                />


                <HighlightCard
                  title="Most shared"
                  icon={
                    <Share2 size={18} />
                  }
                  article={
                    highlights.most_shared
                  }
                  metric={
                    highlights.most_shared
                      ? formatNumber(
                          highlights.most_shared.shares
                        )
                      : "—"
                  }
                  metricLabel="shares"
                  className="highlight-blue"
                />

              </div>

            </section>


            {/* ================================================= */}
            {/* BEST TOPIC */}
            {/* ================================================= */}

            {bestTopic && (

              <section className="best-topic-card">

                <div className="best-topic-icon">

                  <TrendingUp
                    size={22}
                  />

                </div>


                <div className="best-topic-content">

                  <span className="best-topic-label">
                    STRONGEST CONTENT TOPIC
                  </span>

                  <h2>
                    {bestTopic.topic}
                  </h2>

                  <p>
                    This topic currently has the
                    strongest average engagement
                    across your content.
                  </p>

                </div>


                <div className="best-topic-metrics">

                  <div>

                    <strong>
                      {formatPercentage(
                        bestTopic.average_engagement_rate
                      )}
                    </strong>

                    <span>
                      Engagement
                    </span>

                  </div>


                  <div>

                    <strong>
                      {formatNumber(
                        bestTopic.views
                      )}
                    </strong>

                    <span>
                      Views
                    </span>

                  </div>


                  <div>

                    <strong>
                      {bestTopic.articles}
                    </strong>

                    <span>
                      Articles
                    </span>

                  </div>

                </div>

              </section>

            )}


            {/* ================================================= */}
            {/* INSIGHTS + RECOMMENDATIONS */}
            {/* ================================================= */}

            <div className="insight-two-column">


              {/* =============================================== */}
              {/* INSIGHTS */}
              {/* =============================================== */}

              <section className="insight-card">

                <div className="insight-card-header">

                  <div>

                    <div className="insight-title-row">

                      <span className="insight-heading-icon insight-heading-yellow">

                        <Lightbulb
                          size={18}
                        />

                      </span>

                      <h2>
                        What the data says
                      </h2>

                    </div>

                    <p>
                      Important signals detected
                      from your analytics.
                    </p>

                  </div>

                </div>


                {insights.length > 0 ? (

                  <div className="insight-list">

                    {insights.map(
                      (item, index) => (

                        <div
                          key={
                            `${item.category || "insight"}-${index}`
                          }
                          className={`insight-item insight-item-${item.type || "info"}`}
                        >

                          <div className="insight-item-icon">

                            {getInsightIcon(
                              item.type
                            )}

                          </div>


                          <div className="insight-item-content">

                            <div className="insight-item-top">

                              <span className="insight-category">

                                {item.category ||
                                  "Analytics"}

                              </span>

                            </div>

                            <h3>
                              {item.title ||
                                "Analytics insight"}
                            </h3>

                            <p>
                              {item.message ||
                                "No additional information available."}
                            </p>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                ) : (

                  <div className="insight-empty">

                    <Lightbulb
                      size={28}
                    />

                    <h3>
                      No insights available yet
                    </h3>

                    <p>
                      More reader activity is
                      needed before meaningful
                      insights can be generated.
                    </p>

                  </div>

                )}

              </section>


              {/* =============================================== */}
              {/* RECOMMENDATIONS */}
              {/* =============================================== */}

              <section className="insight-card">

                <div className="insight-card-header">

                  <div>

                    <div className="insight-title-row">

                      <span className="insight-heading-icon insight-heading-green">

                        <Target
                          size={18}
                        />

                      </span>

                      <h2>
                        Recommendations
                      </h2>

                    </div>

                    <p>
                      Practical actions based on
                      your performance.
                    </p>

                  </div>

                </div>


                {recommendations.length > 0 ? (

                  <div className="recommendation-list">

                    {recommendations.map(
                      (item, index) => (

                        <div
                          key={
                            `${item.category || "recommendation"}-${index}`
                          }
                          className="recommendation-item"
                        >

                          <div className="recommendation-icon">

                            {getRecommendationIcon(
                              item.category
                            )}

                          </div>


                          <div className="recommendation-content">

                            <div className="recommendation-top">

                              <h3>
                                {item.title ||
                                  "Recommendation"}
                              </h3>

                              <span
                                className={`priority-badge priority-${item.priority || "medium"}`}
                              >
                                {item.priority ||
                                  "medium"}
                              </span>

                            </div>

                            <p>
                              {item.message ||
                                "No recommendation available."}
                            </p>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                ) : (

                  <div className="insight-empty">

                    <Target
                      size={28}
                    />

                    <h3>
                      No recommendations yet
                    </h3>

                    <p>
                      Your content needs more
                      activity before recommendations
                      can be generated.
                    </p>

                  </div>

                )}

              </section>

            </div>


            {/* ================================================= */}
            {/* RISING + DECLINING */}
            {/* ================================================= */}

            <div className="insight-two-column">


              {/* =============================================== */}
              {/* RISING */}
              {/* =============================================== */}

              <section className="insight-card">

                <div className="insight-card-header">

                  <div>

                    <div className="insight-title-row">

                      <span className="insight-heading-icon insight-heading-green">

                        <ArrowUpRight
                          size={18}
                        />

                      </span>

                      <h2>
                        Rising content
                      </h2>

                    </div>

                    <p>
                      Articles showing positive
                      growth signals.
                    </p>

                  </div>

                </div>


                {risingArticles.length > 0 ? (

                  <div className="article-performance-list">

                    {risingArticles.map(
                      (article, index) => (

                        <div
                          key={
                            article.article_id ||
                            index
                          }
                          className="article-performance-item"
                        >

                          <div className="article-rank rising-rank">

                            {index + 1}

                          </div>


                          <div className="article-performance-info">

                            <h3>
                              {article.title ||
                                "Untitled article"}
                            </h3>

                            <p>
                              {article.topic ||
                                "No topic"}
                            </p>

                          </div>


                          <div className="article-performance-metric">

                            <strong className="positive-value">

                              <ArrowUpRight
                                size={15}
                              />

                              {formatPercentage(
                                article.growth_rate
                              )}

                            </strong>

                            <span>
                              Growth
                            </span>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                ) : (

                  <div className="insight-empty compact">

                    <TrendingUp
                      size={25}
                    />

                    <p>
                      No rising content detected yet.
                    </p>

                  </div>

                )}

              </section>


              {/* =============================================== */}
              {/* DECLINING */}
              {/* =============================================== */}

              <section className="insight-card">

                <div className="insight-card-header">

                  <div>

                    <div className="insight-title-row">

                      <span className="insight-heading-icon insight-heading-red">

                        <ArrowDownRight
                          size={18}
                        />

                      </span>

                      <h2>
                        Content to review
                      </h2>

                    </div>

                    <p>
                      Articles showing negative
                      growth signals.
                    </p>

                  </div>

                </div>


                {decliningArticles.length > 0 ? (

                  <div className="article-performance-list">

                    {decliningArticles.map(
                      (article, index) => (

                        <div
                          key={
                            article.article_id ||
                            index
                          }
                          className="article-performance-item"
                        >

                          <div className="article-rank declining-rank">

                            {index + 1}

                          </div>


                          <div className="article-performance-info">

                            <h3>
                              {article.title ||
                                "Untitled article"}
                            </h3>

                            <p>
                              {article.topic ||
                                "No topic"}
                            </p>

                          </div>


                          <div className="article-performance-metric">

                            <strong className="negative-value">

                              <ArrowDownRight
                                size={15}
                              />

                              {formatPercentage(
                                Math.abs(
                                  Number(
                                    article.growth_rate
                                  ) || 0
                                )
                              )}

                            </strong>

                            <span>
                              Decline
                            </span>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                ) : (

                  <div className="insight-empty compact">

                    <TrendingUp
                      size={25}
                    />

                    <p>
                      No declining content detected.
                    </p>

                  </div>

                )}

              </section>

            </div>


            {/* ================================================= */}
            {/* TOP ARTICLES */}
            {/* ================================================= */}

            <section className="insight-card">

              <div className="insight-card-header">

                <div>

                  <div className="insight-title-row">

                    <span className="insight-heading-icon insight-heading-purple">

                      <BarChart3
                        size={18}
                      />

                    </span>

                    <h2>
                      Top performing content
                    </h2>

                  </div>

                  <p>
                    Articles combining strong
                    reach and reader interaction.
                  </p>

                </div>

              </div>


              {topArticles.length > 0 ? (

                <div className="top-articles-table">

                  <div className="top-article-table-header">

                    <span>
                      Article
                    </span>

                    <span>
                      Views
                    </span>

                    <span>
                      Engagement
                    </span>

                    <span>
                      Attention
                    </span>

                    <span>
                      Reading
                    </span>

                  </div>


                  {topArticles.map(
                    (article, index) => (

                      <div
                        key={
                          article.article_id ||
                          index
                        }
                        className="top-article-row"
                      >

                        <div className="top-article-name">

                          <div className="table-rank">
                            {index + 1}
                          </div>

                          <div>

                            <strong>
                              {article.title ||
                                "Untitled article"}
                            </strong>

                            <span>
                              {article.topic ||
                                "No topic"}
                            </span>

                          </div>

                        </div>


                        <div className="table-metric">

                          <Eye
                            size={15}
                          />

                          {formatNumber(
                            article.views
                          )}

                        </div>


                        <div className="table-metric">

                          <Activity
                            size={15}
                          />

                          {formatPercentage(
                            article.engagement_rate
                          )}

                        </div>


                        <div className="table-metric">

                          <Target
                            size={15}
                          />

                          {Number(
                            article.attention_score
                          || 0
                          ).toFixed(1)}

                        </div>


                        <div className="table-metric">

                          <Clock
                            size={15}
                          />

                          {formatSeconds(
                            article.average_reading_seconds
                          )}

                        </div>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <div className="insight-empty">

                  <BarChart3
                    size={28}
                  />

                  <h3>
                    No article performance data
                  </h3>

                  <p>
                    Article analytics will appear
                    here once content receives
                    reader activity.
                  </p>

                </div>

              )}

            </section>


            {/* ================================================= */}
            {/* FOOTER */}
            {/* ================================================= */}

            <footer className="insight-footer">

              <span>
                InkPulse Content Intelligence
              </span>

              <span>
                Insights generated from
                analytics data
              </span>

            </footer>

          </div>

        </main>

      </div>

    </>

  )

}


// =============================================================
// INSIGHT STAT
// =============================================================

function InsightStat({
  title,
  value,
  subtitle,
  icon,
  className,
}) {

  return (

    <div className="insight-stat-card">

      <div className="insight-stat-top">

        <div>

          <p className="insight-stat-title">
            {title}
          </p>

          <p className="insight-stat-value">
            {value}
          </p>

        </div>


        <div
          className={`insight-stat-icon ${
            className
          }`}
        >

          {icon}

        </div>

      </div>


      <p className="insight-stat-subtitle">
        {subtitle}
      </p>

    </div>

  )

}


// =============================================================
// HIGHLIGHT CARD
// =============================================================

function HighlightCard({
  title,
  icon,
  article,
  metric,
  metricLabel,
  className,
}) {

  return (

    <div
      className={`highlight-card ${
        className
      }`}
    >

      <div className="highlight-top">

        <div className="highlight-icon">

          {icon}

        </div>

        <span>
          {title}
        </span>

      </div>


      {article ? (

        <>

          <h3>
            {article.title ||
              "Untitled article"}
          </h3>

          <p>
            {article.topic ||
              "No topic"}
          </p>


          <div className="highlight-bottom">

            <strong>
              {metric}
            </strong>

            <span>
              {metricLabel}
            </span>

          </div>

        </>

      ) : (

        <div className="highlight-no-data">

          <span>
            No data
          </span>

        </div>

      )}

    </div>

  )

}


// =============================================================
// CSS
// =============================================================

const INSIGHT_CSS = `

/* =========================================================
   PAGE
========================================================= */

.insight-page {
  padding: 28px 32px 40px;
  max-width: 1600px;
  margin: 0 auto;
  box-sizing: border-box;
}


/* =========================================================
   HEADER
========================================================= */

.insight-page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.insight-breadcrumb {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #8a91a3;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 8px;
}

.insight-breadcrumb span {
  color: #c5c9d3;
}

.insight-page-header h1 {
  margin: 0;
  font-size: 30px;
  line-height: 1.2;
  font-weight: 750;
  letter-spacing: -0.7px;
  color: #171923;
}

.insight-page-header p {
  margin: 8px 0 0;
  color: #747b8d;
  font-size: 14px;
  line-height: 1.6;
}

.insight-refresh {
  height: 40px;
  padding: 0 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid #e4e7ed;
  border-radius: 10px;
  background: #ffffff;
  color: #3f4655;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.insight-refresh:hover:not(:disabled) {
  background: #f8f9fb;
  border-color: #d7dbe3;
}

.insight-refresh:active:not(:disabled) {
  transform: translateY(1px);
}

.insight-refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.insight-spin {
  animation: insightSpin 0.9s linear infinite;
}

@keyframes insightSpin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}


/* =========================================================
   INLINE ERROR
========================================================= */

.insight-inline-error {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 20px;
  padding: 12px 14px;
  border: 1px solid #fecaca;
  background: #fff7f7;
  color: #b42318;
  border-radius: 10px;
  font-size: 13px;
}


/* =========================================================
   STATS
========================================================= */

.insight-stats-grid {
  display: grid;
  grid-template-columns:
    repeat(6, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 28px;
}

.insight-stat-card {
  background: #ffffff;
  border: 1px solid #e8eaf0;
  border-radius: 14px;
  padding: 18px;
  box-shadow:
    0 2px 8px rgba(20, 25, 38, 0.025);
}

.insight-stat-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.insight-stat-title {
  margin: 0;
  color: #7b8291;
  font-size: 12px;
  font-weight: 600;
}

.insight-stat-value {
  margin: 7px 0 0;
  color: #171923;
  font-size: 24px;
  line-height: 1.1;
  font-weight: 750;
  letter-spacing: -0.5px;
}

.insight-stat-subtitle {
  margin: 13px 0 0;
  color: #9aa0ad;
  font-size: 11px;
}

.insight-stat-icon {
  width: 39px;
  height: 39px;
  flex: 0 0 39px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.insight-stat-purple {
  color: #635bff;
  background: #f0efff;
}

.insight-stat-blue {
  color: #3b82f6;
  background: #eff6ff;
}

.insight-stat-green {
  color: #12b76a;
  background: #ecfdf3;
}

.insight-stat-orange {
  color: #f79009;
  background: #fff7e8;
}

.insight-stat-indigo {
  color: #6366f1;
  background: #eef2ff;
}

.insight-stat-pink {
  color: #ec4899;
  background: #fdf2f8;
}


/* =========================================================
   SECTIONS
========================================================= */

.insight-section {
  margin-bottom: 26px;
}

.insight-section-heading {
  margin-bottom: 14px;
}

.insight-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.insight-title-row h2 {
  margin: 0;
  color: #20232d;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.2px;
}

.insight-section-heading p,
.insight-card-header p {
  margin: 6px 0 0 34px;
  color: #858b99;
  font-size: 12px;
  line-height: 1.5;
}

.insight-heading-icon {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
}

.insight-heading-purple {
  color: #635bff;
  background: #f0efff;
}

.insight-heading-green {
  color: #12b76a;
  background: #ecfdf3;
}

.insight-heading-yellow {
  color: #d97706;
  background: #fff7e6;
}

.insight-heading-red {
  color: #dc2626;
  background: #fef2f2;
}


/* =========================================================
   HIGHLIGHTS
========================================================= */

.insight-highlights-grid {
  display: grid;
  grid-template-columns:
    repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.highlight-card {
  min-width: 0;
  background: #ffffff;
  border: 1px solid #e8eaf0;
  border-radius: 14px;
  padding: 19px;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 2px 8px rgba(20, 25, 38, 0.025);
}

.highlight-card::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
}

.highlight-purple::before {
  background: #635bff;
}

.highlight-green::before {
  background: #12b76a;
}

.highlight-orange::before {
  background: #f79009;
}

.highlight-blue::before {
  background: #3b82f6;
}

.highlight-top {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #7d8492;
  font-size: 12px;
  font-weight: 600;
}

.highlight-icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #f6f7f9;
}

.highlight-card h3 {
  margin: 17px 0 5px;
  color: #22252f;
  font-size: 14px;
  line-height: 1.45;
  font-weight: 700;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.highlight-card p {
  margin: 0;
  color: #969cab;
  font-size: 11px;
}

.highlight-bottom {
  margin-top: 18px;
  display: flex;
  align-items: baseline;
  gap: 7px;
}

.highlight-bottom strong {
  color: #171923;
  font-size: 21px;
  font-weight: 750;
}

.highlight-bottom span {
  color: #9298a5;
  font-size: 11px;
}

.highlight-no-data {
  min-height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a0a5b0;
  font-size: 12px;
}


/* =========================================================
   BEST TOPIC
========================================================= */

.best-topic-card {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 20px 22px;
  margin-bottom: 26px;
  border: 1px solid #dddafe;
  border-radius: 15px;
  background:
    linear-gradient(
      135deg,
      #fafaff 0%,
      #ffffff 65%
    );
  box-shadow:
    0 4px 15px rgba(99, 91, 255, 0.045);
}

.best-topic-icon {
  width: 48px;
  height: 48px;
  flex: 0 0 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #635bff;
  background: #f0efff;
  border-radius: 12px;
}

.best-topic-content {
  min-width: 0;
  flex: 1;
}

.best-topic-label {
  display: block;
  color: #8a91a2;
  font-size: 10px;
  font-weight: 750;
  letter-spacing: 0.8px;
}

.best-topic-content h2 {
  margin: 4px 0 3px;
  color: #20232d;
  font-size: 18px;
  font-weight: 750;
}

.best-topic-content p {
  margin: 0;
  color: #858b99;
  font-size: 12px;
}

.best-topic-metrics {
  display: flex;
  align-items: center;
  gap: 28px;
}

.best-topic-metrics > div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.best-topic-metrics strong {
  color: #20232d;
  font-size: 17px;
  font-weight: 750;
}

.best-topic-metrics span {
  color: #9298a5;
  font-size: 10px;
}


/* =========================================================
   TWO COLUMN
========================================================= */

.insight-two-column {
  display: grid;
  grid-template-columns:
    repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 26px;
}


/* =========================================================
   CARDS
========================================================= */

.insight-card {
  background: #ffffff;
  border: 1px solid #e8eaf0;
  border-radius: 14px;
  overflow: hidden;
  box-shadow:
    0 2px 8px rgba(20, 25, 38, 0.025);
}

.insight-card-header {
  padding: 20px 20px 16px;
  border-bottom: 1px solid #f0f1f4;
}

.insight-list,
.recommendation-list {
  padding: 5px 18px 10px;
}


/* =========================================================
   INSIGHT ITEMS
========================================================= */

.insight-item {
  display: flex;
  gap: 13px;
  padding: 15px 3px;
  border-bottom: 1px solid #f0f1f4;
}

.insight-item:last-child {
  border-bottom: none;
}

.insight-item-icon {
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
}

.insight-item-success .insight-item-icon {
  color: #12b76a;
  background: #ecfdf3;
}

.insight-item-warning .insight-item-icon {
  color: #d97706;
  background: #fff7e6;
}

.insight-item-info .insight-item-icon {
  color: #635bff;
  background: #f0efff;
}

.insight-item-content {
  min-width: 0;
}

.insight-item-top {
  margin-bottom: 3px;
}

.insight-category {
  color: #8d93a0;
  font-size: 10px;
  font-weight: 650;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.insight-item-content h3 {
  margin: 0;
  color: #272a34;
  font-size: 13px;
  font-weight: 700;
}

.insight-item-content p {
  margin: 5px 0 0;
  color: #858b98;
  font-size: 11px;
  line-height: 1.6;
}


/* =========================================================
   RECOMMENDATIONS
========================================================= */

.recommendation-item {
  display: flex;
  gap: 13px;
  padding: 15px 3px;
  border-bottom: 1px solid #f0f1f4;
}

.recommendation-item:last-child {
  border-bottom: none;
}

.recommendation-icon {
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #635bff;
  background: #f0efff;
  border-radius: 9px;
}

.recommendation-content {
  min-width: 0;
  flex: 1;
}

.recommendation-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.recommendation-top h3 {
  margin: 0;
  color: #272a34;
  font-size: 13px;
  font-weight: 700;
}

.recommendation-content p {
  margin: 5px 0 0;
  color: #858b98;
  font-size: 11px;
  line-height: 1.6;
}

.priority-badge {
  flex: 0 0 auto;
  padding: 4px 7px;
  border-radius: 6px;
  font-size: 9px;
  font-weight: 750;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.priority-high {
  color: #b42318;
  background: #fef3f2;
}

.priority-medium {
  color: #9a6700;
  background: #fff8e1;
}

.priority-low {
  color: #027a48;
  background: #ecfdf3;
}


/* =========================================================
   RISING / DECLINING
========================================================= */

.article-performance-list {
  padding: 4px 18px 10px;
}

.article-performance-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 3px;
  border-bottom: 1px solid #f0f1f4;
}

.article-performance-item:last-child {
  border-bottom: none;
}

.article-rank {
  width: 28px;
  height: 28px;
  flex: 0 0 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 750;
}

.rising-rank {
  color: #027a48;
  background: #ecfdf3;
}

.declining-rank {
  color: #b42318;
  background: #fef3f2;
}

.article-performance-info {
  min-width: 0;
  flex: 1;
}

.article-performance-info h3 {
  margin: 0;
  color: #292c36;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.article-performance-info p {
  margin: 4px 0 0;
  color: #969ca8;
  font-size: 10px;
}

.article-performance-metric {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3px;
}

.article-performance-metric strong {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  font-weight: 750;
}

.article-performance-metric span {
  color: #999eaa;
  font-size: 9px;
}

.positive-value {
  color: #039855;
}

.negative-value {
  color: #d92d20;
}


/* =========================================================
   TOP ARTICLES TABLE
========================================================= */

.top-articles-table {
  width: 100%;
}

.top-article-table-header,
.top-article-row {
  display: grid;
  grid-template-columns:
    minmax(280px, 1fr)
    120px
    130px
    120px
    120px;
  align-items: center;
  column-gap: 16px;
  padding: 13px 20px;
}

.top-article-table-header {
  background: #fafbfc;
  border-top: 1px solid #f0f1f4;
  border-bottom: 1px solid #f0f1f4;
  color: #8b91a0;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.top-article-row {
  border-bottom: 1px solid #f0f1f4;
}

.top-article-row:last-child {
  border-bottom: none;
}

.top-article-name {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 11px;
}

.table-rank {
  width: 27px;
  height: 27px;
  flex: 0 0 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #635bff;
  background: #f0efff;
  border-radius: 7px;
  font-size: 10px;
  font-weight: 750;
}

.top-article-name > div:last-child {
  min-width: 0;
}

.top-article-name strong {
  display: block;
  color: #292c36;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.top-article-name span {
  display: block;
  margin-top: 3px;
  color: #999eaa;
  font-size: 10px;
}

.table-metric {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #555c6b;
  font-size: 11px;
  font-weight: 600;
}

.table-metric svg {
  color: #9298a5;
}


/* =========================================================
   EMPTY STATE
========================================================= */

.insight-empty {
  min-height: 190px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #a1a6b1;
}

.insight-empty svg {
  margin-bottom: 8px;
}

.insight-empty h3 {
  margin: 0;
  color: #555b68;
  font-size: 13px;
}

.insight-empty p {
  max-width: 320px;
  margin: 6px 0 0;
  color: #969ca7;
  font-size: 11px;
  line-height: 1.6;
}

.insight-empty.compact {
  min-height: 120px;
}

.insight-empty.compact p {
  margin: 0;
}


/* =========================================================
   FOOTER
========================================================= */

.insight-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 25px 2px 5px;
  color: #9aa0ab;
  font-size: 10px;
}


/* =========================================================
   ERROR
========================================================= */

.insight-error {
  min-height: 55vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.insight-error-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  border-radius: 50%;
  background: #fef2f2;
  color: #d92d20;
  font-size: 21px;
  font-weight: 750;
}

.insight-error h2 {
  margin: 0;
  color: #252832;
  font-size: 19px;
}

.insight-error p {
  max-width: 500px;
  margin: 8px 0 18px;
  color: #858b98;
  font-size: 12px;
  line-height: 1.6;
}

.insight-primary-button {
  border: none;
  border-radius: 9px;
  padding: 10px 16px;
  color: #ffffff;
  background: #635bff;
  font-size: 12px;
  font-weight: 650;
  cursor: pointer;
}

.insight-primary-button:hover {
  background: #554de8;
}


/* =========================================================
   LOADING
========================================================= */

.insight-loading-grid {
  display: grid;
  grid-template-columns:
    repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.insight-skeleton,
.insight-loading-large {
  border-radius: 14px;
  background:
    linear-gradient(
      90deg,
      #f1f2f5 25%,
      #f8f8fa 50%,
      #f1f2f5 75%
    );
  background-size: 200% 100%;
  animation: insightSkeleton 1.4s infinite;
}

.insight-skeleton {
  height: 130px;
}

.insight-loading-large {
  height: 420px;
}

@keyframes insightSkeleton {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 1350px) {

  .insight-stats-grid {
    grid-template-columns:
      repeat(3, minmax(0, 1fr));
  }

  .insight-highlights-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .top-article-table-header,
  .top-article-row {
    grid-template-columns:
      minmax(240px, 1fr)
      100px
      110px
      100px
      100px;
  }

}


@media (max-width: 1000px) {

  .insight-page {
    padding: 22px 20px 35px;
  }

  .insight-two-column {
    grid-template-columns: 1fr;
  }

  .best-topic-card {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .best-topic-content {
    flex-basis: calc(
      100% - 70px
    );
  }

  .best-topic-metrics {
    width: 100%;
    padding-left: 66px;
  }

  .top-article-table-header {
    display: none;
  }

  .top-article-row {
    grid-template-columns:
      minmax(0, 1fr)
      repeat(4, auto);
    padding: 14px 18px;
  }

}


@media (max-width: 700px) {

  .insight-page {
    padding: 18px 14px 28px;
  }

  .insight-page-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 15px;
  }

  .insight-page-header h1 {
    font-size: 25px;
  }

  .insight-refresh {
    width: 100%;
  }

  .insight-stats-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .insight-stat-card {
    padding: 14px;
  }

  .insight-stat-value {
    font-size: 20px;
  }

  .insight-highlights-grid {
    grid-template-columns: 1fr;
  }

  .best-topic-card {
    padding: 17px;
  }

  .best-topic-content {
    flex-basis: calc(
      100% - 65px
    );
  }

  .best-topic-metrics {
    gap: 18px;
    padding-left: 0;
    overflow-x: auto;
  }

  .top-article-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .table-metric {
    justify-content: space-between;
    padding-left: 38px;
  }

  .top-article-name {
    padding-bottom: 3px;
  }

  .insight-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

}


@media (max-width: 430px) {

  .insight-stats-grid {
    grid-template-columns: 1fr;
  }

  .insight-stat-card {
    min-height: 100px;
  }

  .best-topic-metrics {
    width: 100%;
  }

  .recommendation-top {
    align-items: flex-start;
    flex-direction: column;
  }

}

`
 

export default Insight