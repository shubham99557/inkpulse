# InkPulse — Content Intelligence & Analytics Platform

**InkPulse** is a modern content intelligence and analytics platform designed to help publishers, writers, and content teams understand how readers discover, consume, and engage with digital content.

The platform combines a **React-based analytics dashboard**, **Django REST API**, event tracking, audience analytics, engagement measurement, and content-performance insights into a unified system.

🔗 **Live Dashboard:** https://shubham99557.github.io/inkpulse/
🔗 **Backend API:** https://inkpulse.pythonanywhere.com/

---

## 🚀 Overview

Traditional page-view analytics often answer *"How many people visited?"* but provide limited insight into *how readers actually consumed the content*.

InkPulse focuses on deeper content intelligence by collecting and analyzing reader activity such as:

* Page views
* Unique readers
* Reading activity
* Scroll depth
* Engagement interactions
* Attention signals
* Article-level performance
* Audience behavior
* Traffic and acquisition information
* Content trends and insights

The goal is to transform raw reader activity into **actionable content intelligence**.

---

## ✨ Key Features

### 📊 Analytics Dashboard

A centralized dashboard provides an overview of content performance, including:

* Total views
* Unique readers
* Attention score
* Engagement rate
* Average reading time
* Reader activity
* Content performance

### 📈 Reader Activity

Track how readers interact with published content over time.

The system can analyze:

* Views
* Reading sessions
* Scroll behavior
* Engagement interactions
* Reading depth
* Attention patterns

### 📰 Article Analytics

Analyze individual articles and compare content performance.

Available metrics include:

* Article views
* Interactions
* Likes
* Shares
* Comments
* Bookmarks
* Attention score
* Engagement performance

### 👥 Audience Analytics

Understand the characteristics and behavior of your audience through collected analytics data.

### 💡 Content Intelligence

InkPulse is designed to move beyond basic traffic statistics by combining multiple behavioral signals to generate meaningful content insights.

---

## 🔴 Google Analytics 4 Integration

InkPulse is integrated with **Google Analytics 4 (GA4)** for website-level traffic measurement.

The deployed application uses a Google Analytics measurement ID to send website activity to the configured GA4 web data stream.

**Verified integration:**

* Google Analytics tag successfully loads on the deployed website.
* GA4 `page_view` events are being transmitted.
* Requests to `google-analytics.com/g/collect` have been successfully observed.
* The GA4 Realtime report has shown active users from the deployed website.
* Google Analytics Realtime can be used to verify incoming website activity.

GA4 Realtime is designed to show current website activity and can be used to verify that the Analytics measurement code is functioning correctly.

> **Note:** Google Analytics and InkPulse's own analytics system serve different purposes. GA4 provides external website measurement, while InkPulse's backend processes application-specific event data and content intelligence.

---

## 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │      User / Reader   │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   React Frontend     │
                         │   GitHub Pages       │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┴────────────────┐
                    │                                │
                    ▼                                ▼
          ┌──────────────────┐            ┌──────────────────┐
          │ InkPulse REST API│            │ Google Analytics │
          │ Django / DRF     │            │       GA4        │
          └────────┬─────────┘            └──────────────────┘
                   │
                   ▼
          ┌──────────────────┐
          │ Event Processing │
          │ & Analytics      │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │ Content & Reader │
          │ Intelligence     │
          └──────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend

* React
* Vite
* React Router
* Axios
* Recharts
* Lucide React
* CSS
* GitHub Pages

### Backend

* Python
* Django
* Django REST Framework
* SQLite
* Django CORS Headers
* uWSGI

### Analytics

* Custom InkPulse event tracking
* Reader activity tracking
* Article analytics
* Audience analytics
* Engagement analytics
* Google Analytics 4
* Google Tag / `gtag.js`

### Deployment

* **Frontend:** GitHub Pages
* **Backend:** PythonAnywhere
* **Source Control:** Git & GitHub
* **CI/CD:** GitHub Actions

---

## 📁 Project Structure

```text
inkpulse/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .github/
│       └── workflows/
│           └── deploy.yml
│
└── inkpulse-backend/
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
    └── db.sqlite3
```

---

## 🔌 API Structure

The backend exposes REST endpoints for event collection and analytics.

### Event Tracking

```text
POST /api/events/
```

Used to submit reader activity and application events.

### Analytics Summary

```text
GET /api/events/analytics/summary/
```

Provides high-level analytics for the dashboard.

### Time-Series Analytics

```text
GET /api/events/analytics/timeseries/
```

Provides analytics data over a selected time period.

### Article Analytics

```text
GET /api/events/analytics/articles/
```

Returns article-level performance data.

### Individual Article Analytics

```text
GET /api/events/analytics/articles/<article_id>/
```

Provides detailed analytics for a specific article.

### Audience Analytics

```text
GET /api/events/analytics/audience/
```

Provides audience-related analytics.

### Engagement Analytics

```text
GET /api/events/analytics/engagement/
```

Provides reader engagement information.

### Content Insights

```text
GET /api/events/analytics/insights/
```

Returns generated analytics insights.

---

## 🌐 Deployment

### Frontend

The React application is deployed using **GitHub Pages**.

Production URL:

```text
https://shubham99557.github.io/inkpulse/
```

The application uses Vite's production build system and GitHub Actions for automated deployment.

Every push to the `main` branch can trigger the deployment workflow.

### Backend

The Django REST API is hosted on **PythonAnywhere**.

Production backend:

```text
https://inkpulse.pythonanywhere.com/
```

The backend is configured with:

```text
DJANGO_SETTINGS_MODULE=config.settings
```

and served through:

```text
uWSGI
```

---

## 🔄 Data Flow

```text
Reader opens content
        │
        ▼
React Application
        │
        ├──────────────► Google Analytics 4
        │
        ▼
InkPulse Event API
        │
        ▼
Django Event Processing
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

## 📊 Current Dashboard

The deployed dashboard currently provides:

* Analytics overview
* Reader activity charts
* Attention trends
* Engagement trends
* Reading-depth visualization
* Top-performing article
* Article-level analytics
* Audience analytics
* Engagement analytics
* Content insights

---

## 🔐 Configuration

The frontend communicates with the production Django backend through Axios.

Production API configuration:

```javascript
const api = axios.create({
  baseURL: "https://inkpulse.pythonanywhere.com/api",
});
```

The frontend is configured for GitHub Pages using:

```javascript
base: "/inkpulse/"
```

React Router uses the corresponding application basename:

```javascript
<BrowserRouter basename="/inkpulse">
```

This allows client-side routes such as:

```text
/inkpulse/analytics
/inkpulse/analytics/articles
/inkpulse/analytics/engagement
/inkpulse/analytics/insights
/inkpulse/audience
```

to work correctly on the deployed GitHub Pages application.

---

## 🚀 Local Development

### 1. Clone the repository

```bash
git clone https://github.com/shubham99557/inkpulse.git
cd inkpulse
```

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The Vite development server will provide a local development URL.

### 3. Start the backend

```bash
cd inkpulse-backend

python -m venv venv
```

Activate the virtual environment.

Windows:

```powershell
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

---

## 🧪 Production Build

To create a production frontend build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🔍 Analytics Verification

Google Analytics integration can be verified through:

**Google Analytics → Reports → Realtime**

GA4's Realtime report is specifically intended to monitor activity as it happens and can be used to verify that the site's measurement code is working.

The configured measurement ID is:

```text
G-JLXBT7HK0C
```

The measurement ID identifies the GA4 web data stream that receives the website's measurement data.

---

## 🎯 Project Goals

InkPulse is intended to evolve into a complete **content intelligence platform** capable of helping publishers answer questions such as:

* Which articles attract the most readers?
* Which articles retain attention?
* Where do readers lose interest?
* Which content generates the highest engagement?
* How deeply are readers consuming content?
* Which audiences are most engaged?
* What content should be improved or promoted?

The long-term objective is to turn raw reader behavior into **actionable editorial intelligence**.

---

## 🗺️ Future Improvements

Potential future development includes:

* Advanced attention-score modeling
* ML-based content performance prediction
* Automated content recommendations
* Reader segmentation
* Trend detection
* Anomaly detection
* Real-time event streaming
* Advanced audience dashboards
* Custom analytics reports
* Exportable analytics reports
* Authentication and multi-user workspaces
* Publisher/team management
* Production-grade database infrastructure
* Advanced notification and alerting systems

---

## 📌 Project Status

**Status: Production MVP**

The current version includes:

* ✅ React frontend
* ✅ Django REST backend
* ✅ Production deployment
* ✅ GitHub Pages hosting
* ✅ PythonAnywhere backend
* ✅ REST API integration
* ✅ Event tracking
* ✅ Analytics dashboard
* ✅ Article analytics
* ✅ Audience analytics
* ✅ Engagement analytics
* ✅ Content insights
* ✅ Google Analytics 4 integration
* ✅ GA4 Realtime data verification
* ✅ GitHub Actions deployment pipeline
* ✅ GitHub Pages SPA routing

---

## 👨‍💻 Author

**Shubham Raj**

B.Tech Computer Science & Engineering
Sikkim Manipal Institute of Technology

GitHub:
https://github.com/shubham99557

LinkedIn:  
https://www.linkedin.com/in/shubham-raj-313740285/

Portfolio:
https://shubham99557.github.io/portfolio/

---

## 📄 License

This project is currently intended as a personal/project portfolio application.

License and usage terms can be added when the project is prepared for public distribution.
