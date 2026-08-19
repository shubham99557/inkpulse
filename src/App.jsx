import {
  lazy,
  Suspense,
} from "react"

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

import Audience from "./pages/Audience"
import Insight from "./pages/Insight"


// =========================================================
// LAZY LOADED PAGES
// =========================================================

const Dashboard = lazy(
  () => import("./pages/Dashboard")
)

const Articles = lazy(
  () => import("./pages/Articles")
)

const Engagement = lazy(
  () => import("./pages/Engagement")
)


// =========================================================
// LOADING SCREEN
// =========================================================

function PageLoading() {

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
        fontFamily: "Inter, system-ui, sans-serif",
        color: "#667085",
      }}
    >

      <div
        style={{
          width: "32px",
          height: "32px",
          border: "3px solid #eaecf0",
          borderTopColor: "#635bff",
          borderRadius: "50%",
          animation:
            "inkpulse-spin 0.8s linear infinite",
        }}
      />

      <p
        style={{
          marginTop: "14px",
          fontSize: "12px",
        }}
      >
        Loading InkPulse...
      </p>

      <style>
        {`
          @keyframes inkpulse-spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

    </div>

  )
}


// =========================================================
// APP
// =========================================================

function App() {

  return (

    <BrowserRouter basename="/inkpulse">

      <Suspense
        fallback={
          <PageLoading />
        }
      >

        <Routes>

          {/* ================================================= */}
          {/* DEFAULT */}
          {/* ================================================= */}

          <Route
            path="/"
            element={
              <Navigate
                to="/analytics"
                replace
              />
            }
          />


          {/* ================================================= */}
          {/* ANALYTICS */}
          {/* ================================================= */}

          <Route
            path="/analytics"
            element={
              <Dashboard />
            }
          />


          {/* ================================================= */}
          {/* ARTICLES */}
          {/* ================================================= */}

          <Route
            path="/analytics/articles"
            element={
              <Articles />
            }
          />


          {/* ================================================= */}
          {/* AUDIENCE */}
          {/* ================================================= */}

          <Route
            path="/audience"
            element={
              <Audience />
            }
          />


          {/* ================================================= */}
          {/* ENGAGEMENT */}
          {/* ================================================= */}

          <Route
            path="/analytics/engagement"
            element={
              <Engagement />
            }
          />


          {/* ================================================= */}
          {/* INSIGHTS */}
          {/* ================================================= */}

          <Route
            path="/analytics/insights"
            element={
              <Insight />
            }
          />


          {/* ================================================= */}
          {/* SETTINGS */}
          {/* ================================================= */}

          <Route
            path="/settings"
            element={
              <PagePlaceholder
                title="Settings"
                description="Manage your InkPulse analytics workspace."
              />
            }
          />


          {/* ================================================= */}
          {/* FALLBACK */}
          {/* ================================================= */}

          <Route
            path="*"
            element={
              <Navigate
                to="/analytics"
                replace
              />
            }
          />

        </Routes>

      </Suspense>

    </BrowserRouter>

  )
}


// =========================================================
// PLACEHOLDER
// =========================================================

function PagePlaceholder({
  title,
  description,
}) {

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >

      <div
        style={{
          background: "#ffffff",
          padding: "40px",
          borderRadius: "20px",
          border: "1px solid #eaecf0",
          boxShadow:
            "0 10px 40px rgba(16,24,40,0.06)",
          textAlign: "center",
          maxWidth: "500px",
        }}
      >

        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#101828",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            marginTop: "12px",
            color: "#667085",
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>

        <span
          style={{
            display: "inline-block",
            marginTop: "18px",
            padding: "7px 12px",
            borderRadius: "999px",
            background: "#f4f3ff",
            color: "#635bff",
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          Coming in Phase 2
        </span>

      </div>

    </div>

  )
}


export default App
