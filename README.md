# FastCart Admin Panel

**FastCart** — это административная панель для управления интернет-магазином FastCart.

## 🚀 Функциональность

- 🔐 Авторизация администратора
- 📦 Управление товарами:
  - Добавление товаров
  - Редактирование товаров
  - Удаление товаров
- 🛒 Просмотр заказов (если реализовано)
- 📊 Статистика и аналитика (если реализовано)

## 🛠️ Технологии

- Vite
- React
- Redux Toolkit
- Tailwind CSS
- REST API
- localStorage

## 📂 Структура проекта

```
fastCart/
│
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── features/       # Redux slices
│   ├── services/       # API-запросы
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🔧 Установка и запуск

1. Клонировать репозиторий:

```bash
git clone https://github.com/your-username/fastCart.git
cd fastCart
```

2. Установить зависимости:

```bash
npm install
```

3. Запустить локальный сервер:

```bash
npm run dev
```

## 🔐 Авторизация

Для входа в админку используется API:

```
POST https://store-api.softclub.tj/Account/login
```

Поля:
- `name`
- `password`

## 🧪 Скрипты

- `npm run dev` — запуск проекта в режиме разработки
- `npm run build` — сборка production-версии
- `npm run preview` — предпросмотр production-версии

## 📌 Планы на будущее

- Загрузка изображений товаров
- Улучшенная аналитика
- Поддержка нескольких ролей пользователей

## 👨‍💻 Автор

Разработано [Твоё имя или никнейм]