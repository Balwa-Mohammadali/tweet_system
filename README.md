# 🐦 Tweet System Django

A full-featured Twitter-like microblogging web application built with **Django 5.2** and **Bootstrap 5**. Users can register, log in, create tweets with optional images, and manage their own posts — all in a sleek dark-themed UI.

---

## 📸 Screenshots

### 🏠 Tweet Feed (Home Page)
> Browse all tweets in card layout with author info and optional image.

![Tweet List Page](chaiheadq/photos/screenshot-1744033076606.png)

---

### ✍️ Create / Edit Tweet
> A clean form to write your tweet and optionally upload a photo.

| Create Tweet | Edit Tweet |
|---|---|
| Form opens blank for new tweets | Pre-filled form for editing existing tweets |

---

### 🔐 Authentication Pages
> Login, Register, and Logout with card-based forms.

| Login | Register |
|---|---|
| Secure login with session management | Registration with email + password confirmation |

---

## 🚀 Features

| Feature | Description |
|---|---|
| 📝 **Tweet CRUD** | Create, read, update, and delete tweets |
| 🖼️ **Image Uploads** | Attach optional photos to tweets |
| 🔒 **Authentication** | Login, logout, register using Django's built-in auth |
| 🎨 **Dark UI** | Bootstrap 5 dark theme throughout |
| 📱 **Responsive** | Mobile-friendly with Bootstrap grid |
| 🛡️ **Ownership Guard** | Edit/Delete buttons only show for tweet owner |

---

## 🗂️ Project Structure

```
tweet_system_django/
├── requirements.txt              # Python dependencies
├── README.md                     # This file
└── tweetbar/                     # Django project root
    ├── manage.py                 # Django CLI entry point
    ├── db.sqlite3                # SQLite database
    ├── media/                    # Uploaded tweet images (auto-created)
    ├── static/
    │   ├── css/
    │   │   └── bootstrap.min.css
    │   └── js/
    │       └── bootstrap.bundle.min.js
    ├── templates/                # Global templates
    │   ├── layout.html           # Base template with navbar
    │   └── registration/
    │       ├── login.html
    │       ├── register.html
    │       └── logged_out.html
    ├── tweet/                    # Main Django application
    │   ├── models.py             # Tweet model
    │   ├── views.py              # View functions
    │   ├── urls.py               # App URL routes
    │   ├── forms.py              # TweetForm, UserRegistrationForm
    │   ├── admin.py              # Admin registration
    │   ├── apps.py               # App config
    │   └── templates/
    │       ├── index.html              # Landing page
    │       ├── tweet_list.html         # Feed / home page
    │       ├── tweet_form.html         # Create / edit form
    │       └── tweet_confirm_delete.html  # Delete confirmation
    └── tweetbar/                 # Django config package (settings, urls, wsgi, asgi)
        ├── settings.py
        ├── urls.py
        ├── wsgi.py
        └── asgi.py
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Python | 3.x | Core language |
| Django | 5.2.4 | Web framework |
| Pillow | 11.3.0 | Image handling |
| Bootstrap | 5.x | UI styling (dark theme) |
| SQLite | built-in | Database |

---

## ⚡ Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/your-username/tweet_system_django.git
cd tweet_system_django
```

### 2. Create and activate a virtual environment
```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# macOS / Linux
python -m venv .venv
source .venv/bin/activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Run database migrations
```bash
cd tweetbar
python manage.py migrate
```

### 5. Create a superuser (optional — for admin panel)
```bash
python manage.py createsuperuser
```

### 6. Run the development server
```bash
python manage.py runserver
```

### 7. Open in browser
```
http://127.0.0.1:8000/tweet/
```

---

## 🔗 URL Routes

| URL | View | Description |
|---|---|---|
| `/tweet/` | `tweet_list` | All tweets feed |
| `/tweet/create/` | `tweet_create` | Create a new tweet |
| `/tweet/<id>/edit/` | `tweet_edit` | Edit your tweet |
| `/tweet/<id>/delete/` | `tweet_delete` | Delete your tweet |
| `/tweet/register/` | `register` | Register new account |
| `/accounts/login/` | Django built-in | Login page |
| `/accounts/logout/` | Django built-in | Logout |
| `/admin/` | Django Admin | Admin panel |

---

## 📦 Data Model

### `Tweet`
| Field | Type | Description |
|---|---|---|
| `user` | `ForeignKey(User)` | Tweet owner |
| `text` | `TextField(max_length=240)` | Tweet content |
| `photo` | `ImageField` | Optional image attachment |
| `created_at` | `DateTimeField` | Auto-set on creation |
| `updated_at` | `DateTimeField` | Auto-set on update |

---

## 🔒 Authentication Flow

```
Visit /tweet/        →  See all tweets (public)
Click "Create Tweet" →  Redirected to /accounts/login/ if not logged in
Login / Register     →  Redirected back to /tweet/
Post Tweet           →  Appears in feed with Edit/Delete if you're the owner
Logout               →  Session cleared, redirected to /tweet/
```

---

## 🧑‍💻 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

Built with ❤️ using Django & Bootstrap 5.
