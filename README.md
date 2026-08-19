# InkPulse — Content Intelligence & Reader Analytics Platform

**InkPulse** is a full-stack content intelligence and reader analytics platform designed to help publishers, content teams, and digital media platforms understand how audiences discover, consume, and engage with content.

The platform combines a modern **React analytics dashboard** with a **Django REST API** and a custom analytics engine to transform raw reader events into actionable content insights.

---

## 🚀 Live Demo

**Frontend:**
https://shubham99557.github.io/inkpulse/

**Backend API:**
https://inkpulse.pythonanywhere.com/

---

## ✨ Key Features

### 📊 Analytics Dashboard

* Total article views
* Unique readers
* Engagement rate
* Attention score
* Average reading time
* Reader activity trends
* Daily analytics visualization

### 📰 Content Analytics

* Article-level performance tracking
* Top-performing content
* Views and interactions
* Topic-based analytics
* Article performance comparison
* Individual article analytics

### 👥 Audience Intelligence

* Reader activity analysis
* Geographic information
* Regional audience insights
* Unique reader measurement
* Session-based analysis

### 🧠 Engagement & Attention

InkPulse processes reader behavior to calculate custom content intelligence metrics including:

* Engagement rate
* Attention score
* Reading depth
* Reading time
* Interaction activity
* Content performance

### 📈 Trend Analysis

The platform generates trend snapshots for articles using historical engagement and viewing activity.

### 💡 Content Insights

The Insights section converts analytics data into higher-level content intelligence to help identify:

* High-performing articles
* Low-engagement content
* Audience behavior patterns
* Content opportunities
* Emerging trends

### 🌐 Google Analytics Integration

InkPulse is integrated with **Google Analytics 4** for additional website-level measurement.

The platform tracks standard web analytics such as:

* Page views
* Active users
* Traffic sources
* Geographic information
* User sessions
* Website engagement

GA4 Measurement ID:

`G-JLXBT7HK0C`

---

# 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │      Reader/User     │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   React Frontend     │
                         │   Vite + React       │
                         └──────────┬───────────┘
                                    │
                         REST API Requests
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Django REST API    │
                         │      Backend         │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Event Processing   │
                         │   Analytics Engine   │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      Database        │
                         │       SQLite         │
                         └──────────┬───────────┘
                                    │
                  ┌─────────────────┴─────────────────┐
                  │                                   │
                  ▼                                   ▼
        ┌──────────────────┐                ┌──────────────────┐
        │ Custom Analytics │                │   Google         │
        │    Dashboard     │                │   Analytics 4    │
        └──────────────────┘                └──────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* **React**
* **Vite**
* **React Router**
* **Axios**
* **Recharts**
* **Lucide React**
* CSS / responsive UI
* GitHub Pages

## Backend

* **Python**
* **Django**
* **Django REST Framework**
* Django CORS Headers
* SQLite
* uWSGI

## Analytics

* Custom event processing engine
* Article analytics
* Reader/session tracking
* Engagement calculations
* Attention scoring
* Trend analysis
* Google Analytics 4

## Deployment

| Component      | Platform           |
| -------------- | ------------------ |
| Frontend       | GitHub Pages       |
| Backend        | PythonAnywhere     |
| Database       | SQLite             |
| Web Server     | uWSGI              |
| Source Control | GitHub             |
| Web Analytics  | Google Analytics 4 |

---

# 📁 Project Structure

```text
inkpulse/
│
├── frontend/
│   ├── public/
│   │   ├── 404.html
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Articles.jsx
│   │   │   ├── Audience.jsx
│   │   │   ├── Engagement.jsx
│   │   │   └── Insight.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .github/
│   │   └── workflows/
│   │       └── deploy.yml
│   │
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── backend/
    ├── config/
    │   ├── settings.py
    │   ├── urls.py
    │   ├── wsgi.py
    │   └── ...
    │
    ├── events/
    │   ├── models.py
    │   ├── views.py
    │   ├── serializers.py
    │   ├── urls.py
    │   └── services/
    │       ├── analytics_service.py
    │       └── trend_service.py
    │
    ├── analytics/
    ├── trends/
    ├── prediction/
    ├── geography/
    ├── attention/
    │
    ├── manage.py
    ├── requirements.txt
    └── db.sqlite3
```

---

# 🔄 How InkPulse Works

## 1. Reader Activity

A reader interacts with an article or website.

Examples:

```text
Article View
Scroll
Reading
Interaction
Like
Share
Bookmark
```

## 2. Event Collection

The React frontend sends reader events to the Django REST API.

Example:

```http
POST /api/events/
```

## 3. Event Processing

Django processes the raw event and associates it with:

* Reader
* Session
* Article
* Timestamp
* Region
* City
* Event metadata

## 4. Analytics Processing

The analytics engine aggregates events into article-level metrics.

Examples:

```text
Total Views
Unique Readers
Engagement Rate
Attention Score
Reading Time
Reading Depth
```

## 5. Trend Generation

InkPulse generates trend snapshots to measure how article performance changes over time.

## 6. Dashboard Visualization

The React dashboard retrieves processed analytics through REST APIs and visualizes them using charts and KPI cards.

---

# 🔌 API Endpoints

## Event Tracking

```http
POST /api/events/
```

Used to ingest reader activity events.

---

## Analytics Summary

```http
GET /api/events/analytics/summary/
```

Returns high-level analytics such as:

* Total views
* Unique readers
* Engagement
* Attention
* Reading metrics

---

## Article Analytics

```http
GET /api/events/analytics/articles/
```

Returns analytics for articles.

Supports filtering and ordering.

---

## Single Article Analytics

```http
GET /api/events/analytics/articles/{article_id}/
```

Returns detailed analytics for an individual article.

---

## Time-Series Analytics

```http
GET /api/events/analytics/timeseries/
```

Provides daily analytics data for visualization.

Example query:

```http
GET /api/events/analytics/timeseries/?days=7
```

---

## Audience Analytics

```http
GET /api/events/analytics/audience/
```

Provides audience-level analytics.

---

## Engagement Analytics

```http
GET /api/events/analytics/engagement/
```

Provides reader engagement metrics.

---

## Content Insights

```http
GET /api/events/analytics/insights/
```

Provides higher-level content intelligence.

---

# 📊 Core Analytics Metrics

### Total Views

Total number of recorded article view events.

### Unique Readers

Number of distinct readers associated with article activity.

### Engagement Rate

Measures the proportion of reader activity that results in meaningful interactions.

### Attention Score

A custom InkPulse metric representing the level of reader attention given to content.

### Reading Depth

Measures how far a reader progresses through content.

### Reading Time

Measures the amount of time associated with reader consumption.

### Trend Score

Combines content activity and performance indicators to estimate article momentum.

---

# ☁️ Deployment

## Frontend

The React application is automatically deployed to GitHub Pages using GitHub Actions.

Deployment workflow:

```text
Git Push
   ↓
GitHub Actions
   ↓
npm ci
   ↓
npm run build
   ↓
GitHub Pages artifact
   ↓
GitHub Pages deployment
```

The frontend uses a Vite base path:

```text
/inkpulse/
```

React Router is configured with the corresponding basename so that client-side routes work correctly on GitHub Pages.

---

## Backend

The Django REST API is deployed on PythonAnywhere using:

```text
Python
Django
Virtual Environment
uWSGI
```

Production WSGI configuration points to:

```text
config.wsgi.application
```

---

# ⚙️ Local Development

## Clone the repository

```bash
git clone https://github.com/shubham99557/inkpulse.git
cd inkpulse
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The development server will normally run at:

```text
http://localhost:5173
```

---

# Backend Setup

Create and activate a virtual environment:

```bash
cd backend

python -m venv venv
```

### Windows

```powershell
venv\Scripts\activate
```

### Linux/macOS

```bash
source venv/bin/activate
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

Backend:

```text
http://127.0.0.1:8000
```

---

# 🔐 Configuration

Production configuration should use environment variables for sensitive values such as:

```text
SECRET_KEY
DATABASE_URL
API_KEYS
THIRD_PARTY_CREDENTIALS
```

Do not commit production secrets to GitHub.

The Google Analytics Measurement ID is intended for frontend use and is not a secret credential.

---

# 🧪 Testing

Run Django system checks:

```bash
python manage.py check
```

Run backend tests:

```bash
python manage.py test
```

Build the frontend:

```bash
cd frontend
npm run build
```

---

# 📈 Google Analytics 4

InkPulse also uses Google Analytics 4 for standard website measurement.

Measurement ID:

```text
G-JLXBT7HK0C
```

GA4 provides additional information such as:

* Active users
* Page views
* Traffic sources
* Geographic distribution
* Sessions
* Website engagement

Custom InkPulse analytics remain independent from GA4 and are processed by the Django backend.

---

# 🔒 Privacy Considerations

InkPulse should avoid sending personally identifiable information to Google Analytics or other third-party analytics systems.

Analytics events should use anonymous identifiers and aggregated behavioral information wherever possible.

Do not send:

* Passwords
* Authentication tokens
* Email addresses
* Phone numbers
* Payment information
* Private user content
* Other personally identifiable information

through analytics event parameters.

---

# 🚀 Future Improvements

Possible future development includes:

* PostgreSQL migration
* Advanced authentication and authorization
* Automated database backups
* Custom domain
* Advanced reader segmentation
* AI-powered content recommendations
* Predictive content performance
* Advanced anomaly detection
* Real-time analytics
* Automated reports
* Email-based analytics reports
* Advanced publisher dashboards
* More granular custom GA4 events
* Automated testing and monitoring

---

# 🎯 Project Objective

The primary goal of InkPulse is to move beyond simple page-view analytics and provide a deeper understanding of **how readers actually consume content**.

Instead of asking only:

> "How many people viewed this article?"

InkPulse aims to answer:

> "Who read it, how deeply did they engage with it, how much attention did they give it, and what does that tell us about the content?"

---

# 👨‍💻 Developer

**Shubham Raj**

B.Tech Computer Science & Engineering
Sikkim Manipal Institute of Technology

GitHub:
https://github.com/shubham99557

Portfolio:
https://shubham99557.github.io/portfolio/

---

# 📄 License

This project is currently maintained as a personal software engineering project.

A formal open-source license can be added if the project is intended for public redistribution.

---

## ⭐ InkPulse

**Content Intelligence. Reader Behavior. Actionable Insights.**

Built with **React, Django, Python, REST APIs, and modern analytics engineering.**
