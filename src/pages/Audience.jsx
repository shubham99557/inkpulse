import {
  useEffect,
  useState,
} from "react"

import {
  Users,
  MapPin,
  Monitor,
  Activity,
  RefreshCw,
} from "lucide-react"

import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"

import {
  getAudienceAnalytics,
} from "../services/api"


function Audience() {

  // =========================================================
  // SIDEBAR
  // =========================================================

  const [
    sidebarCollapsed,
    setSidebarCollapsed,
  ] = useState(false)


  // =========================================================
  // AUDIENCE STATE
  // =========================================================

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
  // LOAD AUDIENCE ANALYTICS
  // =========================================================

  const loadAudience = async (
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
        await getAudienceAnalytics(days)

      console.log(
        "Audience analytics:",
        response
      )

      const result =
        response?.data ?? response

      setData(result)

    } catch (err) {

      console.error(
        "Audience analytics error:",
        err
      )

      setError(
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load audience analytics."
      )

    } finally {

      setLoading(false)
      setRefreshing(false)

    }

  }


  // =========================================================
  // LOAD WHEN PERIOD CHANGES
  // =========================================================

  useEffect(() => {

    loadAudience()

  }, [days])


  // =========================================================
  // DATA
  // =========================================================

  const regions =
    Array.isArray(data?.regions)
      ? data.regions
      : []

  const cities =
    Array.isArray(data?.cities)
      ? data.cities
      : []

  const devices =
    Array.isArray(data?.devices)
      ? data.devices
      : []


  // =========================================================
  // MAX VALUE
  // =========================================================

  const getMaxValue = (items) => {

    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return 1
    }

    const values =
      items.map(
        (item) =>
          Number(item?.readers) || 0
      )

    return Math.max(
      ...values,
      1
    )

  }


  const regionMax =
    getMaxValue(regions)

  const cityMax =
    getMaxValue(cities)

  const deviceMax =
    getMaxValue(devices)


  // =========================================================
  // LOADING SCREEN
  // =========================================================

  if (
    loading &&
    !data
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

          <div className="audience-page">

            <div className="page-header">

              <div>

                <div className="breadcrumb">

                  Analytics

                  <span>/</span>

                  Audience

                </div>

                <h1>
                  Audience
                </h1>

                <p>
                  Understand who is reading
                  your content.
                </p>

              </div>

            </div>


            <div className="audience-loading-grid">

              {[1, 2, 3, 4].map(
                (item) => (

                  <div
                    key={item}
                    className="audience-skeleton"
                  />

                )
              )}

            </div>

          </div>

        </main>


        <AudienceStyles />

      </div>

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

          <div className="audience-page">

            <div className="audience-error">

              <div className="audience-error-icon">
                !
              </div>

              <h2>
                Audience unavailable
              </h2>

              <p>
                {error}
              </p>

              <button
                className="audience-primary-button"
                onClick={() =>
                  loadAudience()
                }
              >
                Try again
              </button>

            </div>

          </div>

        </main>


        <AudienceStyles />

      </div>

    )

  }


  // =========================================================
  // NO DATA
  // =========================================================

  if (!data) {

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

          <div className="audience-page">

            <div className="audience-empty">

              <div className="audience-empty-icon">

                <Users
                  size={26}
                />

              </div>

              <h2>
                No audience data
              </h2>

              <p>
                Audience analytics are
                not available yet.
              </p>

              <button
                className="audience-primary-button"
                onClick={() =>
                  loadAudience()
                }
              >

                <RefreshCw
                  size={16}
                />

                Refresh

              </button>

            </div>

          </div>

        </main>


        <AudienceStyles />

      </div>

    )

  }


  // =========================================================
  // MAIN PAGE
  // =========================================================

  return (

    <div className="app-shell">

      {/* =================================================== */}
      {/* SIDEBAR */}
      {/* =================================================== */}

      <Sidebar
        collapsed={
          sidebarCollapsed
        }
        setCollapsed={
          setSidebarCollapsed
        }
      />


      {/* =================================================== */}
      {/* MAIN */}
      {/* =================================================== */}

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
          days={days}
          setDays={setDays}
          refreshing={refreshing}
        />


        {/* ================================================= */}
        {/* AUDIENCE */}
        {/* ================================================= */}

        <div className="audience-page">

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div className="audience-header">

            <div>

              <div className="breadcrumb">

                <span>
                  Analytics
                </span>

                <span className="breadcrumb-divider">
                  /
                </span>

                <span className="breadcrumb-active">
                  Audience
                </span>

              </div>

              <h1>
                Audience
              </h1>

              <p>
                Understand who is reading,
                where they come from and
                how they access your content.
              </p>

            </div>


            <div className="audience-actions">

              <select
                value={days}
                onChange={(event) =>
                  setDays(
                    Number(
                      event.target.value
                    )
                  )
                }
                className="audience-select"
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
                className="audience-refresh"
                onClick={() =>
                  loadAudience(true)
                }
                disabled={refreshing}
                title="Refresh audience"
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
          {/* REFRESH ERROR */}
          {/* ================================================= */}

          {error && (

            <div className="audience-inline-error">

              <div>

                <strong>
                  Unable to refresh audience data
                </strong>

                <span>
                  {error}
                </span>

              </div>

              <button
                onClick={() =>
                  loadAudience(true)
                }
                disabled={refreshing}
              >
                Try again
              </button>

            </div>

          )}


          {/* ================================================= */}
          {/* SUMMARY */}
          {/* ================================================= */}

          <div className="audience-stats-grid">

            <AudienceStat
              title="Total Readers"
              value={
                Number(
                  data.total_readers
                ) || 0
              }
              subtitle={
                `Last ${
                  data.days ?? days
                } days`
              }
              icon={
                <Users size={20} />
              }
              iconClass="audience-icon-indigo"
            />


            <AudienceStat
              title="Total Events"
              value={
                Number(
                  data.total_events
                ) || 0
              }
              subtitle="Reader activity"
              icon={
                <Activity size={20} />
              }
              iconClass="audience-icon-blue"
            />


            <AudienceStat
              title="Regions"
              value={
                regions.length
              }
              subtitle="Geographic regions"
              icon={
                <MapPin size={20} />
              }
              iconClass="audience-icon-green"
            />


            <AudienceStat
              title="Devices"
              value={
                devices.length
              }
              subtitle="Device categories"
              icon={
                <Monitor size={20} />
              }
              iconClass="audience-icon-purple"
            />

          </div>


          {/* ================================================= */}
          {/* BREAKDOWN */}
          {/* ================================================= */}

          <div className="audience-breakdown-grid">

            <AudienceBreakdown
              title="Regions"
              subtitle="Where your readers are located."
              icon={
                <MapPin size={18} />
              }
              iconClass="audience-heading-green"
              items={regions}
              max={regionMax}
              barClass="audience-bar-green"
              emptyText="No regional data available."
            />


            <AudienceBreakdown
              title="Cities"
              subtitle="Reader distribution by city."
              icon={
                <MapPin size={18} />
              }
              iconClass="audience-heading-indigo"
              items={cities}
              max={cityMax}
              barClass="audience-bar-indigo"
              emptyText="No city data available."
            />


            <AudienceBreakdown
              title="Devices"
              subtitle="Devices used by your readers."
              icon={
                <Monitor size={18} />
              }
              iconClass="audience-heading-purple"
              items={devices}
              max={deviceMax}
              barClass="audience-bar-purple"
              emptyText="No device data available."
            />

          </div>


          {/* ================================================= */}
          {/* FOOTER */}
          {/* ================================================= */}

          <footer className="dashboard-footer">

            <span>
              InkPulse Content Intelligence
            </span>

            <span>
              Audience analytics updated in real time
            </span>

          </footer>

        </div>

      </main>


      {/* ===================================================== */}
      {/* PAGE CSS */}
      {/* ===================================================== */}

      <AudienceStyles />

    </div>

  )

}


// =============================================================
// AUDIENCE STAT
// =============================================================

function AudienceStat({
  title,
  value,
  subtitle,
  icon,
  iconClass,
}) {

  return (

    <div className="audience-stat-card">

      <div className="audience-stat-top">

        <div>

          <p className="audience-stat-title">
            {title}
          </p>

          <p className="audience-stat-value">
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


      <p className="audience-stat-subtitle">
        {subtitle}
      </p>

    </div>

  )

}


// =============================================================
// BREAKDOWN CARD
// =============================================================

function AudienceBreakdown({
  title,
  subtitle,
  icon,
  iconClass,
  items,
  max,
  barClass,
  emptyText,
}) {

  return (

    <div className="audience-card">

      <div className="audience-card-header">

        <div className="audience-title-row">

          <span
            className={`audience-heading-icon ${
              iconClass
            }`}
          >
            {icon}
          </span>

          <h2>
            {title}
          </h2>

        </div>

        <p>
          {subtitle}
        </p>

      </div>


      <div className="audience-list">

        {items.length > 0 ? (

          items.map(
            (item, index) => {

              const name =
                item?.name ||
                item?.region ||
                item?.city ||
                item?.device ||
                "Unknown"

              const readers =
                Number(
                  item?.readers
                ) || 0

              const events =
                Number(
                  item?.events
                ) || 0

              const percentage =
                Math.min(
                  100,
                  Math.round(
                    (
                      readers /
                      Math.max(
                        Number(max) || 1,
                        1
                      )
                    ) * 100
                  )
                )

              return (

                <div
                  key={`${name}-${index}`}
                  className="audience-item"
                >

                  <div className="audience-item-header">

                    <div>

                      <p>
                        {name}
                      </p>

                      <span>
                        {events} events
                      </span>

                    </div>

                    <strong>
                      {readers}
                    </strong>

                  </div>


                  <div className="audience-progress">

                    <div
                      className={`audience-progress-fill ${
                        barClass
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
          )

        ) : (

          <div className="audience-no-data">
            {emptyText}
          </div>

        )}

      </div>

    </div>

  )

}


// =============================================================
// AUDIENCE CSS
// =============================================================

function AudienceStyles() {

  return (

    <style>{`

      /* =====================================================
         PAGE
      ===================================================== */

      .audience-page {
        width: 100%;
        max-width: 1600px;
        margin: 0 auto;
        padding: 30px 34px 40px;
        box-sizing: border-box;
      }


      /* =====================================================
         HEADER
      ===================================================== */

      .audience-header {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 24px;
        margin-bottom: 28px;
      }

      .breadcrumb {
        display: flex;
        align-items: center;
        gap: 9px;
        margin-bottom: 10px;
        font-size: 12px;
        font-weight: 600;
        color: #98a2b3;
        letter-spacing: 0.01em;
      }

      .breadcrumb-divider {
        color: #d0d5dd;
      }

      .breadcrumb-active {
        color: #667085;
      }

      .audience-header h1 {
        margin: 0;
        color: #101828;
        font-size: 30px;
        line-height: 1.2;
        font-weight: 700;
        letter-spacing: -0.025em;
      }

      .audience-header p {
        max-width: 650px;
        margin: 9px 0 0;
        color: #667085;
        font-size: 14px;
        line-height: 1.6;
      }


      /* =====================================================
         ACTIONS
      ===================================================== */

      .audience-actions {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
      }

      .audience-select {
        height: 40px;
        min-width: 145px;
        padding: 0 34px 0 13px;
        border: 1px solid #d0d5dd;
        border-radius: 9px;
        background: #ffffff;
        color: #344054;
        font-size: 13px;
        font-weight: 600;
        outline: none;
        cursor: pointer;
        box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
      }

      .audience-select:hover {
        border-color: #98a2b3;
      }

      .audience-select:focus {
        border-color: #635bff;
        box-shadow:
          0 0 0 3px rgba(99, 91, 255, 0.10);
      }

      .audience-refresh {
        width: 40px;
        height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #d0d5dd;
        border-radius: 9px;
        background: #ffffff;
        color: #475467;
        cursor: pointer;
        box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
        transition:
          background 0.2s ease,
          border-color 0.2s ease,
          transform 0.2s ease;
      }

      .audience-refresh:hover:not(:disabled) {
        background: #f9fafb;
        border-color: #98a2b3;
      }

      .audience-refresh:active:not(:disabled) {
        transform: scale(0.96);
      }

      .audience-refresh:disabled {
        cursor: not-allowed;
        opacity: 0.55;
      }


      /* =====================================================
         SUMMARY GRID
      ===================================================== */

      .audience-stats-grid {
        display: grid;
        grid-template-columns:
          repeat(4, minmax(0, 1fr));
        gap: 16px;
        margin-bottom: 20px;
      }


      /* =====================================================
         STAT CARD
      ===================================================== */

      .audience-stat-card {
        min-width: 0;
        padding: 20px;
        border: 1px solid #eaecf0;
        border-radius: 14px;
        background: #ffffff;
        box-shadow:
          0 1px 2px rgba(16, 24, 40, 0.03);
        transition:
          transform 0.2s ease,
          box-shadow 0.2s ease,
          border-color 0.2s ease;
      }

      .audience-stat-card:hover {
        transform: translateY(-2px);
        border-color: #e4e7ec;
        box-shadow:
          0 8px 24px rgba(16, 24, 40, 0.06);
      }

      .audience-stat-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
      }

      .audience-stat-title {
        margin: 0;
        color: #667085;
        font-size: 13px;
        font-weight: 600;
      }

      .audience-stat-value {
        margin: 7px 0 0;
        color: #101828;
        font-size: 27px;
        line-height: 1.15;
        font-weight: 700;
        letter-spacing: -0.025em;
      }

      .audience-stat-subtitle {
        margin: 17px 0 0;
        color: #98a2b3;
        font-size: 12px;
        font-weight: 500;
      }

      .audience-stat-icon {
        width: 42px;
        height: 42px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        border-radius: 10px;
      }

      .audience-icon-indigo {
        color: #635bff;
        background: #f0efff;
      }

      .audience-icon-blue {
        color: #1570ef;
        background: #eff8ff;
      }

      .audience-icon-green {
        color: #12b76a;
        background: #ecfdf3;
      }

      .audience-icon-purple {
        color: #7a5af8;
        background: #f4f3ff;
      }


      /* =====================================================
         BREAKDOWN
      ===================================================== */

      .audience-breakdown-grid {
        display: grid;
        grid-template-columns:
          repeat(3, minmax(0, 1fr));
        gap: 16px;
      }


      /* =====================================================
         BREAKDOWN CARD
      ===================================================== */

      .audience-card {
        min-width: 0;
        padding: 22px;
        border: 1px solid #eaecf0;
        border-radius: 14px;
        background: #ffffff;
        box-shadow:
          0 1px 2px rgba(16, 24, 40, 0.03);
      }

      .audience-card-header {
        padding-bottom: 18px;
        border-bottom: 1px solid #f2f4f7;
      }

      .audience-title-row {
        display: flex;
        align-items: center;
        gap: 9px;
      }

      .audience-title-row h2 {
        margin: 0;
        color: #101828;
        font-size: 16px;
        font-weight: 700;
      }

      .audience-card-header > p {
        margin: 7px 0 0 30px;
        color: #98a2b3;
        font-size: 12px;
        line-height: 1.5;
      }

      .audience-heading-icon {
        width: 30px;
        height: 30px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
      }

      .audience-heading-green {
        color: #12b76a;
        background: #ecfdf3;
      }

      .audience-heading-indigo {
        color: #635bff;
        background: #f0efff;
      }

      .audience-heading-purple {
        color: #7a5af8;
        background: #f4f3ff;
      }


      /* =====================================================
         AUDIENCE LIST
      ===================================================== */

      .audience-list {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 19px;
      }

      .audience-item {
        width: 100%;
      }

      .audience-item-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
      }

      .audience-item-header > div {
        min-width: 0;
      }

      .audience-item-header p {
        margin: 0;
        overflow: hidden;
        color: #344054;
        font-size: 13px;
        font-weight: 600;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .audience-item-header span {
        display: block;
        margin-top: 4px;
        color: #98a2b3;
        font-size: 11px;
      }

      .audience-item-header strong {
        flex-shrink: 0;
        color: #101828;
        font-size: 13px;
        font-weight: 700;
      }


      /* =====================================================
         PROGRESS
      ===================================================== */

      .audience-progress {
        width: 100%;
        height: 7px;
        margin-top: 9px;
        overflow: hidden;
        border-radius: 999px;
        background: #f2f4f7;
      }

      .audience-progress-fill {
        height: 100%;
        min-width: 0;
        border-radius: inherit;
        transition: width 0.6s ease;
      }

      .audience-bar-green {
        background: #12b76a;
      }

      .audience-bar-indigo {
        background: #635bff;
      }

      .audience-bar-purple {
        background: #7a5af8;
      }


      /* =====================================================
         EMPTY
      ===================================================== */

      .audience-no-data {
        padding: 30px 10px;
        text-align: center;
        color: #98a2b3;
        font-size: 13px;
      }


      /* =====================================================
         ERROR
      ===================================================== */

      .audience-inline-error {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        margin-bottom: 18px;
        padding: 13px 15px;
        border: 1px solid #fecdca;
        border-radius: 10px;
        background: #fffbfa;
      }

      .audience-inline-error div {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }

      .audience-inline-error strong {
        color: #b42318;
        font-size: 12px;
      }

      .audience-inline-error span {
        color: #d92d20;
        font-size: 12px;
      }

      .audience-inline-error button {
        flex-shrink: 0;
        padding: 7px 11px;
        border: 0;
        border-radius: 7px;
        background: #d92d20;
        color: #ffffff;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
      }


      /* =====================================================
         EMPTY / ERROR PAGE
      ===================================================== */

      .audience-empty,
      .audience-error {
        min-height: 420px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 40px;
        border: 1px solid #eaecf0;
        border-radius: 16px;
        background: #ffffff;
        text-align: center;
      }

      .audience-empty-icon,
      .audience-error-icon {
        width: 52px;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 14px;
      }

      .audience-empty-icon {
        color: #635bff;
        background: #f0efff;
      }

      .audience-error-icon {
        color: #d92d20;
        background: #fef3f2;
        font-size: 22px;
        font-weight: 700;
      }

      .audience-empty h2,
      .audience-error h2 {
        margin: 18px 0 0;
        color: #101828;
        font-size: 18px;
        font-weight: 700;
      }

      .audience-empty p,
      .audience-error p {
        max-width: 430px;
        margin: 7px 0 0;
        color: #667085;
        font-size: 13px;
        line-height: 1.6;
      }

      .audience-primary-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-top: 20px;
        padding: 9px 15px;
        border: 0;
        border-radius: 8px;
        background: #101828;
        color: #ffffff;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition:
          background 0.2s ease,
          transform 0.2s ease;
      }

      .audience-primary-button:hover {
        background: #1d2939;
      }

      .audience-primary-button:active {
        transform: scale(0.98);
      }


      /* =====================================================
         LOADING
      ===================================================== */

      .audience-loading-grid {
        display: grid;
        grid-template-columns:
          repeat(4, minmax(0, 1fr));
        gap: 16px;
      }

      .audience-skeleton {
        height: 135px;
        border-radius: 14px;
        border: 1px solid #eaecf0;
        background:
          linear-gradient(
            90deg,
            #f2f4f7 25%,
            #f8fafc 50%,
            #f2f4f7 75%
          );
        background-size: 200% 100%;
        animation:
          audience-shimmer 1.5s infinite;
      }

      @keyframes audience-shimmer {

        0% {
          background-position: 200% 0;
        }

        100% {
          background-position: -200% 0;
        }

      }


      /* =====================================================
         SPINNER
      ===================================================== */

      .spin {
        animation:
          audience-spin 0.8s linear infinite;
      }

      @keyframes audience-spin {

        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(360deg);
        }

      }


      /* =====================================================
         RESPONSIVE
      ===================================================== */

      @media (max-width: 1200px) {

        .audience-stats-grid {
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
        }

        .audience-breakdown-grid {
          grid-template-columns:
            1fr;
        }

      }


      @media (max-width: 768px) {

        .audience-page {
          padding: 22px 18px 30px;
        }

        .audience-header {
          align-items: stretch;
          flex-direction: column;
        }

        .audience-header h1 {
          font-size: 26px;
        }

        .audience-actions {
          width: 100%;
        }

        .audience-select {
          flex: 1;
        }

        .audience-stats-grid {
          grid-template-columns: 1fr;
        }

        .audience-loading-grid {
          grid-template-columns: 1fr;
        }

        .audience-inline-error {
          align-items: flex-start;
          flex-direction: column;
        }

      }


      @media (max-width: 480px) {

        .audience-page {
          padding: 18px 14px 26px;
        }

        .audience-card,
        .audience-stat-card {
          padding: 17px;
          border-radius: 12px;
        }

        .audience-header p {
          font-size: 13px;
        }

      }

    `}</style>

  )

}


export default Audience