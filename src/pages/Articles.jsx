import {
  useEffect,
  useMemo,
  useState,
} from "react"

import {
  Search,
  RefreshCw,
  Eye,
  Users,
  Brain,
  MessageCircle,
  Share2,
  Bookmark,
  MousePointerClick,
  Clock3,
  ArrowUpRight,
  TrendingUp,
  BarChart3,
  FileText,
  ChevronDown,
} from "lucide-react"

import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"

import {
  getArticleAnalytics,
} from "../services/api"


function Articles() {

  const [
    sidebarCollapsed,
    setSidebarCollapsed,
  ] = useState(false)

  const [
    articles,
    setArticles,
  ] = useState([])

  const [
    search,
    setSearch,
  ] = useState("")

  const [
    topic,
    setTopic,
  ] = useState("all")

  const [
    sortBy,
    setSortBy,
  ] = useState("-total_views")

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
  // LOAD ARTICLES
  // =========================================================

  const loadArticles = async (
    showRefresh = false
  ) => {

    try {

      setError("")

      if (showRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }

      const data =
        await getArticleAnalytics(
          topic === "all"
            ? ""
            : topic,
          sortBy
        )

      /*
       * Your current backend returns a single object.
       *
       * We normalize it into an array so the UI can
       * support multiple articles later without rewriting
       * the entire page.
       */

      if (Array.isArray(data)) {

        setArticles(data)

      } else if (
        data &&
        Array.isArray(data.results)
      ) {

        setArticles(data.results)

      } else if (
        data &&
        typeof data === "object"
      ) {

        setArticles([data])

      } else {

        setArticles([])

      }

    } catch (err) {

      console.error(
        "Articles loading error:",
        err
      )

      setError(
        "Unable to load article analytics. Make sure the Django backend is running."
      )

    } finally {

      setLoading(false)
      setRefreshing(false)

    }

  }


  // =========================================================
  // LOAD WHEN FILTER CHANGES
  // =========================================================

  useEffect(() => {

    loadArticles()

  }, [
    topic,
    sortBy,
  ])


  // =========================================================
  // SEARCH
  // =========================================================

  const filteredArticles =
    useMemo(() => {

      const query =
        search
          .trim()
          .toLowerCase()

      if (!query) {
        return articles
      }

      return articles.filter(
        (article) => {

          const title =
            String(
              article.article_title || ""
            ).toLowerCase()

          const articleTopic =
            String(
              article.article_topic || ""
            ).toLowerCase()

          return (
            title.includes(query) ||
            articleTopic.includes(query)
          )

        }
      )

    }, [
      articles,
      search,
    ])


  // =========================================================
  // TOP ARTICLE
  // =========================================================

  const topArticle =
    filteredArticles.length > 0
      ? filteredArticles.reduce(
          (best, article) => {

            if (!best) {
              return article
            }

            return Number(
              article.attention_score || 0
            ) >
            Number(
              best.attention_score || 0
            )
              ? article
              : best

          },
          null
        )
      : null


  // =========================================================
  // SUMMARY
  // =========================================================

  const totalViews =
    filteredArticles.reduce(
      (sum, article) =>
        sum +
        Number(
          article.total_views || 0
        ),
      0
    )


  const totalReaders =
    filteredArticles.reduce(
      (sum, article) =>
        sum +
        Number(
          article.unique_readers || 0
        ),
      0
    )


  const averageAttention =
    filteredArticles.length
      ? filteredArticles.reduce(
          (sum, article) =>
            sum +
            Number(
              article.attention_score || 0
            ),
          0
        ) /
        filteredArticles.length
      : 0


  const averageEngagement =
    filteredArticles.length
      ? filteredArticles.reduce(
          (sum, article) =>
            sum +
            Number(
              article.engagement_rate || 0
            ),
          0
        ) /
        filteredArticles.length
      : 0


  // =========================================================
  // TOPICS
  // =========================================================

  const topics =
    useMemo(() => {

      const uniqueTopics =
        articles
          .map(
            (article) =>
              article.article_topic
          )
          .filter(Boolean)

      return [
        ...new Set(uniqueTopics),
      ]

    }, [
      articles,
    ])


  // =========================================================
  // FORMAT HELPERS
  // =========================================================

  const formatNumber = (
    value
  ) => {

    return new Intl.NumberFormat(
      "en-IN"
    ).format(
      Number(value) || 0
    )

  }


  const formatPercentage = (
    value
  ) => {

    return `${(
      Number(value) || 0
    ).toFixed(1)}%`

  }


  const formatSeconds = (
    seconds
  ) => {

    const value =
      Number(seconds) || 0

    const minutes =
      Math.floor(
        value / 60
      )

    const remaining =
      Math.round(
        value % 60
      )

    if (minutes === 0) {
      return `${remaining}s`
    }

    return `${minutes}m ${remaining}s`

  }


  const formatDate = (
    value
  ) => {

    if (!value) {
      return "—"
    }

    const date =
      new Date(value)

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "—"
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    )

  }


  // =========================================================
  // LOADING
  // =========================================================

  if (
    loading &&
    articles.length === 0
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

          <div className="articles-loading">

            <div className="loading-spinner" />

            <p>
              Loading article intelligence...
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
    articles.length === 0
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

          <div className="articles-error">

            <div className="articles-error-icon">
              !
            </div>

            <h2>
              Article analytics unavailable
            </h2>

            <p>
              {error}
            </p>

            <button
              className="articles-primary-button"
              onClick={() =>
                loadArticles()
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
  // PAGE
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


        <div className="articles-page">

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div className="articles-header">

            <div>

              <div className="breadcrumb">
                Analytics
                <span>/</span>
                Articles
              </div>

              <h1>
                Article Intelligence
              </h1>

              <p>
                Understand which stories capture attention,
                drive engagement and keep readers coming back.
              </p>

            </div>


            <button
              className="articles-refresh-button"
              onClick={() =>
                loadArticles(true)
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

              Refresh data

            </button>

          </div>


          {/* ================================================= */}
          {/* INLINE ERROR */}
          {/* ================================================= */}

          {error && (
            <div className="inline-error">
              {error}
            </div>
          )}


          {/* ================================================= */}
          {/* SUMMARY */}
          {/* ================================================= */}

          <div className="article-summary-grid">

            <ArticleSummaryCard
              icon={FileText}
              title="Tracked Articles"
              value={formatNumber(
                filteredArticles.length
              )}
              subtitle="Content currently analyzed"
            />

            <ArticleSummaryCard
              icon={Eye}
              title="Total Views"
              value={formatNumber(
                totalViews
              )}
              subtitle="Across filtered articles"
            />

            <ArticleSummaryCard
              icon={Users}
              title="Unique Readers"
              value={formatNumber(
                totalReaders
              )}
              subtitle="Distinct readers"
            />

            <ArticleSummaryCard
              icon={Brain}
              title="Avg. Attention"
              value={
                averageAttention.toFixed(1)
              }
              subtitle="/ 100 content attention"
            />

            <ArticleSummaryCard
              icon={TrendingUp}
              title="Avg. Engagement"
              value={
                formatPercentage(
                  averageEngagement
                )
              }
              subtitle="Reader interaction rate"
            />

          </div>


          {/* ================================================= */}
          {/* TOP ARTICLE */}
          {/* ================================================= */}

          {topArticle && (

            <section className="featured-article">

              <div className="featured-article-left">

                <div className="featured-label">
                  TOP ATTENTION ARTICLE
                </div>

                <h2>
                  {topArticle.article_title}
                </h2>

                <div className="featured-topic">
                  {topArticle.article_topic}
                </div>

                <p>
                  This article currently has the
                  strongest attention score among
                  the filtered content.
                </p>

              </div>


              <div className="featured-score">

                <span>
                  Attention
                </span>

                <strong>
                  {Number(
                    topArticle.attention_score || 0
                  ).toFixed(1)}
                </strong>

                <small>
                  / 100
                </small>

              </div>

            </section>

          )}


          {/* ================================================= */}
          {/* FILTERS */}
          {/* ================================================= */}

          <section className="articles-panel">

            <div className="articles-toolbar">

              <div className="articles-toolbar-title">

                <h2>
                  All Articles
                </h2>

                <span>
                  {filteredArticles.length}
                </span>

              </div>


              <div className="articles-filters">

                {/* SEARCH */}

                <div className="article-search">

                  <Search
                    size={16}
                  />

                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                  />

                </div>


                {/* TOPIC */}

                <div className="article-select">

                  <select
                    value={topic}
                    onChange={(e) =>
                      setTopic(
                        e.target.value
                      )
                    }
                  >

                    <option value="all">
                      All topics
                    </option>

                    {topics.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}

                  </select>

                  <ChevronDown
                    size={14}
                  />

                </div>


                {/* SORT */}

                <div className="article-select">

                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value
                      )
                    }
                  >

                    <option value="-total_views">
                      Most views
                    </option>

                    <option value="-attention_score">
                      Highest attention
                    </option>

                    <option value="-engagement_rate">
                      Highest engagement
                    </option>

                    <option value="-unique_readers">
                      Most readers
                    </option>

                    <option value="-average_reading_seconds">
                      Longest reading time
                    </option>

                  </select>

                  <ChevronDown
                    size={14}
                  />

                </div>

              </div>

            </div>


            {/* ================================================= */}
            {/* TABLE */}
            {/* ================================================= */}

            {filteredArticles.length > 0 ? (

              <div className="articles-table-wrapper">

                <table className="articles-table">

                  <thead>

                    <tr>

                      <th>
                        Article
                      </th>

                      <th>
                        Views
                      </th>

                      <th>
                        Readers
                      </th>

                      <th>
                        Attention
                      </th>

                      <th>
                        Engagement
                      </th>

                      <th>
                        Reading time
                      </th>

                      <th>
                        Scroll depth
                      </th>

                      <th>
                        Updated
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {filteredArticles.map(
                      (article) => (

                        <ArticleRow
                          key={
                            article.article_id
                          }
                          article={
                            article
                          }
                          formatNumber={
                            formatNumber
                          }
                          formatPercentage={
                            formatPercentage
                          }
                          formatSeconds={
                            formatSeconds
                          }
                          formatDate={
                            formatDate
                          }
                        />

                      )
                    )}

                  </tbody>

                </table>

              </div>

            ) : (

              <div className="articles-empty">

                <div className="articles-empty-icon">
                  <Search size={21} />
                </div>

                <h3>
                  No articles found
                </h3>

                <p>
                  Try changing your search or
                  topic filters.
                </p>

                <button
                  onClick={() => {
                    setSearch("")
                    setTopic("all")
                  }}
                >
                  Clear filters
                </button>

              </div>

            )}

          </section>


          {/* ================================================= */}
          {/* ARTICLE DETAIL CARDS */}
          {/* ================================================= */}

          {filteredArticles.length > 0 && (

            <section className="article-detail-grid">

              {filteredArticles.map(
                (article) => (

                  <ArticleDetailCard
                    key={
                      `detail-${article.article_id}`
                    }
                    article={
                      article
                    }
                    formatNumber={
                      formatNumber
                    }
                    formatPercentage={
                      formatPercentage
                    }
                    formatSeconds={
                      formatSeconds
                    }
                  />

                )
              )}

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
              Article analytics updated in real time
            </span>

          </footer>

        </div>

      </main>

    </div>
  )
}


// =============================================================
// SUMMARY CARD
// =============================================================

function ArticleSummaryCard({
  icon: Icon,
  title,
  value,
  subtitle,
}) {

  return (
    <div className="article-summary-card">

      <div className="article-summary-icon">
        <Icon size={19} />
      </div>

      <div className="article-summary-content">

        <span>
          {title}
        </span>

        <strong>
          {value}
        </strong>

        <small>
          {subtitle}
        </small>

      </div>

    </div>
  )
}


// =============================================================
// ARTICLE ROW
// =============================================================

function ArticleRow({
  article,
  formatNumber,
  formatPercentage,
  formatSeconds,
  formatDate,
}) {

  const attention =
    Number(
      article.attention_score || 0
    )

  const attentionClass =
    attention >= 70
      ? "high"
      : attention >= 40
        ? "medium"
        : "low"


  return (
    <tr>

      <td>

        <div className="article-name-cell">

          <div className="article-mini-icon">
            <FileText size={17} />
          </div>

          <div>

            <strong>
              {article.article_title}
            </strong>

            <span>
              {article.article_topic ||
                "Uncategorized"}
            </span>

          </div>

        </div>

      </td>


      <td>

        <div className="table-number">

          <Eye size={14} />

          {formatNumber(
            article.total_views
          )}

        </div>

      </td>


      <td>

        <div className="table-number">

          <Users size={14} />

          {formatNumber(
            article.unique_readers
          )}

        </div>

      </td>


      <td>

        <div className="attention-cell">

          <div className="attention-value">

            <strong>
              {attention.toFixed(1)}
            </strong>

            <span>
              /100
            </span>

          </div>

          <div className="attention-bar">

            <span
              className={
                attentionClass
              }
              style={{
                width: `${Math.min(
                  attention,
                  100
                )}%`,
              }}
            />

          </div>

        </div>

      </td>


      <td>

        <span className="engagement-badge">

          {formatPercentage(
            article.engagement_rate
          )}

        </span>

      </td>


      <td>

        <div className="table-number">

          <Clock3 size={14} />

          {formatSeconds(
            article.average_reading_seconds
          )}

        </div>

      </td>


      <td>

        <span className="scroll-value">

          {formatPercentage(
            article.average_scroll_depth
          )}

        </span>

      </td>


      <td>

        <span className="updated-date">

          {formatDate(
            article.updated_at
          )}

        </span>

      </td>

    </tr>
  )
}


// =============================================================
// DETAIL CARD
// =============================================================

function ArticleDetailCard({
  article,
  formatNumber,
  formatPercentage,
  formatSeconds,
}) {

  const interactions =
    Number(
      article.clicks || 0
    ) +
    Number(
      article.likes || 0
    ) +
    Number(
      article.shares || 0
    ) +
    Number(
      article.comments || 0
    ) +
    Number(
      article.bookmarks || 0
    )


  return (
    <article className="article-detail-card">

      <div className="article-detail-header">

        <div>

          <span className="article-detail-topic">
            {article.article_topic ||
              "Uncategorized"}
          </span>

          <h3>
            {article.article_title}
          </h3>

        </div>

        <div className="article-detail-score">

          <Brain size={16} />

          <strong>
            {Number(
              article.attention_score || 0
            ).toFixed(1)}
          </strong>

        </div>

      </div>


      <div className="article-detail-metrics">

        <MiniMetric
          icon={Eye}
          label="Views"
          value={formatNumber(
            article.total_views
          )}
        />

        <MiniMetric
          icon={Users}
          label="Readers"
          value={formatNumber(
            article.unique_readers
          )}
        />

        <MiniMetric
          icon={MousePointerClick}
          label="Interactions"
          value={formatNumber(
            interactions
          )}
        />

        <MiniMetric
          icon={Clock3}
          label="Reading"
          value={formatSeconds(
            article.average_reading_seconds
          )}
        />

        <MiniMetric
          icon={BarChart3}
          label="Scroll"
          value={formatPercentage(
            article.average_scroll_depth
          )}
        />

      </div>


      <div className="article-social-metrics">

        <SocialMetric
          icon={MessageCircle}
          label="Comments"
          value={formatNumber(
            article.comments
          )}
        />

        <SocialMetric
          icon={Share2}
          label="Shares"
          value={formatNumber(
            article.shares
          )}
        />

        <SocialMetric
          icon={Bookmark}
          label="Bookmarks"
          value={formatNumber(
            article.bookmarks
          )}
        />

      </div>

    </article>
  )
}


// =============================================================
// MINI METRIC
// =============================================================

function MiniMetric({
  icon: Icon,
  label,
  value,
}) {

  return (
    <div className="mini-metric">

      <Icon size={15} />

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


// =============================================================
// SOCIAL METRIC
// =============================================================

function SocialMetric({
  icon: Icon,
  label,
  value,
}) {

  return (
    <div className="social-metric">

      <Icon size={15} />

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  )
}


export default Articles