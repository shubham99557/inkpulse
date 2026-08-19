import axios from "axios"


// ============================================================
// API CLIENT
// ============================================================

const api = axios.create({
  baseURL: "https://inkpulse.pythonanywhere.com/api",

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 15000,
})


// ============================================================
// ANALYTICS — OVERVIEW
// ============================================================

export const getAnalyticsSummary = async () => {

  const response = await api.get(
    "/events/analytics/summary/"
  )

  return response.data
}


// ============================================================
// ANALYTICS — TIME SERIES
// ============================================================

export const getAnalyticsTimeSeries = async (
  days = 7,
  articleId = null
) => {

  const params = {
    days,
  }

  if (articleId !== null && articleId !== undefined) {
    params.article = articleId
  }

  const response = await api.get(
    "/events/analytics/timeseries/",
    {
      params,
    }
  )

  return response.data
}


// ============================================================
// ANALYTICS — ARTICLES
// ============================================================

export const getArticleAnalytics = async (
  topic = "",
  ordering = "-total_views"
) => {

  const params = {
    ordering,
  }

  if (topic) {
    params.topic = topic
  }

  const response = await api.get(
    "/events/analytics/articles/",
    {
      params,
    }
  )

  return response.data
}


// ============================================================
// ANALYTICS — ARTICLE DETAILS
// ============================================================

export const getSingleArticleAnalytics = async (
  articleId
) => {

  if (!articleId) {
    throw new Error(
      "Article ID is required"
    )
  }

  const response = await api.get(
    `/events/analytics/articles/${articleId}/`
  )

  return response.data
}


// ============================================================
// ANALYTICS — AUDIENCE
// ============================================================

export const getAudienceAnalytics = async (
  days = 30
) => {

  const response = await api.get(
    "/events/analytics/audience/",
    {
      params: {
        days,
      },
    }
  )

  return response.data
}


// ============================================================
// ANALYTICS — ENGAGEMENT
// ============================================================

export const getEngagementAnalytics = async (
  days = 30
) => {

  const response = await api.get(
    "/events/analytics/engagement/",
    {
      params: {
        days,
      },
    }
  )

  return response.data
}


// ============================================================
// ANALYTICS — INSIGHTS
// ============================================================

export const getAnalyticsInsights = async () => {

  const response = await api.get(
    "/events/analytics/insights/"
  )

  return response.data
}


// ============================================================
// EVENTS
// ============================================================

export const trackEvent = async (
  eventData
) => {

  const response = await api.post(
    "/events/",
    eventData
  )

  return response.data
}


// ============================================================
// ARTICLES
// ============================================================

export const getArticles = async () => {

  const response = await api.get(
    "/articles/"
  )

  return response.data
}


export const getArticle = async (
  articleId
) => {

  if (!articleId) {
    throw new Error(
      "Article ID is required"
    )
  }

  const response = await api.get(
    `/articles/${articleId}/`
  )

  return response.data
}


// ============================================================
// HEALTH CHECK
// ============================================================

export const checkBackendHealth = async () => {

  try {

    const response = await api.get(
      "/events/analytics/summary/"
    )

    return {
      online: true,
      data: response.data,
    }

  } catch (error) {

    return {
      online: false,
      error,
    }

  }
}


// ============================================================
// DEFAULT EXPORT
// ============================================================

export default api
