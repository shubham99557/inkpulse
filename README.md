# InkPulse — Content Intelligence & Analytics Platform

<p align="center">

**A full-stack content intelligence platform for understanding how readers discover, consume, and engage with digital content.**

[Live Application](https://shubham99557.github.io/inkpulse/) • [Frontend Repository](https://github.com/shubham99557/inkpulse) • [Backend Repository](https://github.com/shubham99557/inkpulse-backend)

</p>

---

## 📌 Overview

**InkPulse** is a full-stack content intelligence and analytics platform designed to go beyond traditional page-view analytics.

Instead of focusing only on how many visitors a website receives, InkPulse analyzes reader behavior and content performance to provide deeper insights into:

* Content views
* Unique readers
* Reading activity
* Scroll depth
* Engagement interactions
* Attention patterns
* Article performance
* Audience behavior
* Reading depth
* Content trends
* Content intelligence

The platform combines a **React + Vite frontend**, **Django REST Framework backend**, custom event tracking, analytics processing, and **Google Analytics 4** into a unified analytics system.

### 🌐 Live Application

**Dashboard:**
https://shubham99557.github.io/inkpulse/

### ⚙️ Production Backend

**Django API:**
https://inkpulse.pythonanywhere.com/

### 💻 Source Code

**Frontend:**
https://github.com/shubham99557/inkpulse

**Backend:**
https://github.com/shubham99557/inkpulse-backend

---

# ✨ Key Features

## 📊 Analytics Dashboard

A centralized dashboard for monitoring overall content performance.

The dashboard currently provides:

* Total Views
* Unique Readers
* Attention Score
* Engagement Rate
* Average Reading Time
* Reader Activity
* Content Performance
* Top Performing Article

---

## 📰 Article Analytics

InkPulse provides article-level performance analysis.

Metrics include:

* Article Views
* Interactions
* Likes
* Shares
* Comments
* Bookmarks
* Attention Score
* Engagement Performance

This allows publishers and content teams to compare articles and identify high-performing content.

---

## 👥 Audience Analytics

Audience analytics provides insights into reader behavior and audience activity.

The platform is designed to help answer questions such as:

* Who is engaging with content?
* Which content attracts readers?
* How active are readers?
* Which audience segments show stronger engagement?

---

## 📈 Engagement Analytics

InkPulse tracks reader interactions and presents engagement trends through visual analytics.

Examples include:

* Interaction rate
* Engagement trends
* Reader activity
* Content interaction patterns

---

## 📖 Reading Depth & Attention

InkPulse goes beyond simple page views by analyzing reading behavior.

The dashboard can visualize:

* Scroll depth
* Reading depth
* Reading time
* Attention trends
* Reader activity

This helps identify whether readers are actually consuming content rather than simply opening a page.

---

## 💡 Content Intelligence

The platform is designed to transform raw reader activity into actionable content intelligence.

The long-term goal is to help answer questions such as:

> Which articles attract the most readers?

> Which articles retain attention?

> Where do readers lose interest?

> Which content generates the highest engagement?

> How deeply are readers consuming content?

> What content should be improved or promoted?

---

# 🔴 Google Analytics 4 Integration

InkPulse is integrated with **Google Analytics 4 (GA4)** for website-level traffic measurement.

The deployed application uses the configured GA4 Measurement ID:

```text
G-JLXBT7HK0C
```

### Integration Verification

The integration has been verified on the deployed website:

* Google Analytics tag loads successfully.
* GA4 `page_view` events are transmitted.
* Requests to `google-analytics.com/g/collect` have been observed.
* GA4 Realtime has displayed active users from the deployed website.
* Website traffic can be monitored through **Google Analytics → Reports → Realtime**.

### Important distinction

InkPulse's internal analytics and Google Analytics serve different purposes.

**Google Analytics 4** provides external website-level measurement.

**InkPulse Analytics** processes application-specific events through its own Django backend and generates content intelligence such as article analytics, engagement, attention, reading depth, and audience insights.

---

# 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │     User / Reader    │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    React Frontend    │
                         │     GitHub Pages     │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┴────────────────┐
                    │                                │
                    ▼                                ▼
          ┌───────────────────┐            ┌───────────────────┐
          │   InkPulse API    │            │ Google Analytics  │
          │ Django / DRF      │            │       GA4         │
          └─────────┬─────────┘            └───────────────────┘
                    │
                    ▼
          ┌───────────────────┐
          │  Event Processing │
          │   & Analytics     │
          └─────────┬─────────┘
                    │
                    ▼
          ┌───────────────────┐
          │ Content & Reader  │
          │   Intelligence    │
          └─────────┬─────────┘
                    │
                    ▼
          ┌───────────────────┐
          │ Analytics         │
          │ Dashboard         │
          └───────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* React
* Vite
* React Router
* Axios
* Recharts
* Lucide React
* CSS
* GitHub Pages

## Backend

* Python
* Django
* Django REST Framework
* SQLite
* Django CORS Headers
* uWSGI
* PythonAnywhere

## Analytics

* Custom InkPulse Event Tracking
* Reader Activity Tracking
* Article Analytics
* Audience Analytics
* Engagement Analytics
* Reading Depth Analysis
* Attention Analytics
* Google Analytics 4
* Google Tag / `gtag.js`

## DevOps & Deployment

* Git
* GitHub
* GitHub Actions
* GitHub Pages
* PythonAnywhere
* Automated frontend deployment

---

# 📁 Project Structure

InkPulse is maintained as two separate repositories.

## Frontend Repository

```text
inkpulse/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── public/
│   ├── 404.html
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Articles.jsx
│   │   ├── Audience.jsx
│   │   ├── Engagement.jsx
│   │   └── Insight.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Backend Repository

```text
inkpulse-backend/
│
├── config/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── events/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
├── analytics/
├── trends/
├── prediction/
├── geography/
├── attention/
│
├── manage.py
├── db.sqlite3
└── requirements.txt
```

---

# 🔌 API Structure

The Django backend exposes REST endpoints for event collection and analytics processing.

## Event Tracking

```http
POST /api/events/
```

Used to submit reader activity and application events.

---

## Analytics Summary

```http
GET /api/events/analytics/summary/
```

Returns high-level analytics used by the dashboard.

---

## Time-Series Analytics

```http
GET /api/events/analytics/timeseries/
```

Provides analytics data across a selected time period.

---

## Article Analytics

```http
GET /api/events/analytics/articles/
```

Returns article-level performance information.

---

## Individual Article Analytics

```http
GET /api/events/analytics/articles/<article_id>/
```

Provides detailed analytics for a specific article.

---

## Audience Analytics

```http
GET /api/events/analytics/audience/
```

Provides audience-related analytics.

---

## Engagement Analytics

```http
GET /api/events/analytics/engagement/
```

Provides reader engagement information.

---

## Content Insights

```http
GET /api/events/analytics/insights/
```

Returns generated content analytics insights.

---

# 🔄 Data Flow

```text
Reader visits application
          │
          ▼
React Frontend
          │
          ├──────────────► Google Analytics 4
          │
          ▼
InkPulse Event API
          │
          ▼
Django REST Framework
          │
          ▼
Event Processing
          │
          ▼
Analytics Processing
          │
          ├── Views
          ├── Audience
          ├── Engagement
          ├── Reading Depth
          ├── Attention
          └── Content Insights
          │
          ▼
React Analytics Dashboard
```

---

# 🌐 Deployment

## Frontend — GitHub Pages

The React frontend is deployed through **GitHub Pages**.

**Production URL:**

https://shubham99557.github.io/inkpulse/

The project uses:

* Vite production builds
* GitHub Actions
* GitHub Pages
* SPA routing support
* `/inkpulse/` Vite base path

Every push to the `main` branch can trigger the frontend deployment workflow.

---

## Backend — PythonAnywhere

The Django REST API is hosted on PythonAnywhere.

**Production Backend:**

https://inkpulse.pythonanywhere.com/

The backend is configured with:

```text
DJANGO_SETTINGS_MODULE=config.settings
```

and served through:

```text
uWSGI
```

---

# 🔗 Frontend ↔ Backend Integration

The frontend communicates with the production Django API through Axios.

Production API configuration:

```javascript
const api = axios.create({
  baseURL: "https://inkpulse.pythonanywhere.com/api",
})
```

The frontend therefore communicates with the deployed backend instead of the local development server.

---

# 🧭 GitHub Pages SPA Routing

Because React Router uses client-side routing, the GitHub Pages deployment includes SPA fallback handling.

Vite is configured with:

```javascript
export default defineConfig({
  plugins: [react()],
  base: "/inkpulse/",
})
```

React Router uses:

```jsx
<BrowserRouter basename="/inkpulse">
```

Supported routes include:

```text
/inkpulse/analytics
/inkpulse/analytics/articles
/inkpulse/analytics/engagement
/inkpulse/analytics/insights
/inkpulse/audience
/inkpulse/settings
```

A GitHub Pages `404.html` fallback is also included to prevent direct-route 404 errors.

---

# ⚙️ Local Development

## 1. Clone the Frontend Repository

```bash
git clone https://github.com/shubham99557/inkpulse.git
cd inkpulse
```

---

## 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 3. Start the Frontend

```bash
npm run dev
```

The Vite development server will provide a local development URL.

---

# 🐍 Backend Setup

Clone the separate backend repository:

```bash
git clone https://github.com/shubham99557/inkpulse-backend.git
cd inkpulse-backend
```

Create a virtual environment:

```bash
python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Start Django:

```bash
python manage.py runserver
```

The development API will normally be available at:

```text
http://127.0.0.1:8000/
```

---

# 🧪 Production Build

Build the frontend:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

# 📊 Google Analytics Verification

To verify GA4 tracking:

1. Open the deployed InkPulse application.
2. Visit or refresh a page.
3. Open Google Analytics.
4. Go to **Reports → Realtime**.
5. Check **Active users in the last 30 minutes**.
6. Open the user activity/details if required to confirm the page being viewed.

The configured GA4 Measurement ID is:

```text
G-JLXBT7HK0C
```

The integration has already been technically verified through browser network activity and GA4 Realtime activity.

---

# 🚀 CI/CD

The frontend uses **GitHub Actions** for automated deployment.

The workflow:

```text
Git Push
   │
   ▼
GitHub Actions
   │
   ├── Checkout repository
   ├── Setup Node.js
   ├── Install dependencies
   ├── Build React application
   ├── Prepare GitHub Pages deployment
   └── Deploy to GitHub Pages
```

This allows the deployed frontend to stay synchronized with the `main` branch.

---

# 📌 Current Project Status

**Status: Production MVP**

### Completed

* ✅ React frontend
* ✅ Vite production build
* ✅ Responsive analytics dashboard
* ✅ Django REST backend
* ✅ REST API integration
* ✅ Event tracking
* ✅ Analytics processing
* ✅ Article analytics
* ✅ Audience analytics
* ✅ Engagement analytics
* ✅ Reading-depth visualization
* ✅ Attention analytics
* ✅ Content insights
* ✅ Production frontend deployment
* ✅ Production backend deployment
* ✅ GitHub Pages hosting
* ✅ PythonAnywhere hosting
* ✅ GitHub Actions deployment pipeline
* ✅ GitHub Pages SPA routing
* ✅ Production API integration
* ✅ Google Analytics 4 integration
* ✅ GA4 `page_view` tracking
* ✅ GA4 Realtime activity verification

---

# 🗺️ Future Improvements

Potential future development includes:

* Advanced attention-score modeling
* Machine-learning-based content performance prediction
* Automated content recommendations
* Reader segmentation
* Advanced trend detection
* Anomaly detection
* Real-time event streaming
* Advanced audience dashboards
* Custom analytics reports
* Exportable analytics reports
* Authentication
* Multi-user workspaces
* Publisher/team management
* Production-grade database infrastructure
* Advanced notifications and alerts
* More sophisticated content intelligence models

---

# 🎯 Project Vision

The long-term objective of InkPulse is to evolve from an analytics dashboard into a comprehensive **Content Intelligence Platform**.

The platform aims to help publishers and content teams understand not only:

> **How many people viewed the content?**

but also:

> **How did they consume it?**

> **How long did they stay engaged?**

> **Where did they lose interest?**

> **What content performs best?**

> **Which audience is most engaged?**

> **What content should be improved or promoted?**

By combining behavioral analytics, event processing, and intelligent content analysis, InkPulse aims to turn raw reader activity into actionable editorial intelligence.

---

# 👨‍💻 Author

## Shubham Raj

**B.Tech Computer Science & Engineering**
**Sikkim Manipal Institute of Technology**

### Profiles

* **GitHub:** https://github.com/shubham99557
* **LinkedIn:** https://www.linkedin.com/in/shubham-raj-313740285/
* **Portfolio:** https://shubham99557.github.io/portfolio/

### Project Repositories

* **InkPulse Frontend:** https://github.com/shubham99557/inkpulse
* **InkPulse Backend:** https://github.com/shubham99557/inkpulse-backend

---

# 📄 License

InkPulse is currently a personal/project portfolio application.

The repository is publicly available for viewing and learning purposes. Licensing terms can be added separately if the project is prepared for public distribution or commercial use.

---

<p align="center">

**Built with React, Django, REST APIs, analytics engineering, and a focus on content intelligence.**

⭐ If you find the project interesting, consider giving the repository a star.

</p>
