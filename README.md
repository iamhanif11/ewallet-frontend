# E-Wallet App - Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/license/mit)
<br>
Frontend project for E-Wallet dashboard by M. Hanif Irfan (Koda Batch 7 Fullstack Web Developer).

## Technologies Used

- [![React](https://img.shields.io/badge/React-19.2.4-blue?logo=react&logoColor=white)](https://react.dev/)
- [![Vite](https://img.shields.io/badge/Vite-8.0.14-purple?logo=vite&logoColor=white)](https://vitejs.dev/)
- [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2.2-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
- [![Redux](https://img.shields.io/badge/Redux_Toolkit-6.0.0-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
- [![Nginx](https://img.shields.io/badge/Nginx-Stable_Alpine-009639?logo=nginx&logoColor=white)](https://nginx.org/)
- [![Docker](https://img.shields.io/badge/Docker-29.5.2-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

## Features

- Mobile-First Responsive UI
- User Authentication (Login, Logout, Create PIN)
- Interactive Dashboard (Balance, Transaction History)
- Fund Transfer & Top Up Interfaces
- Profile Management


## Usage Instruction

### Environment Setup

1. Create your environment file on the root directory named `.env`

```env
# Usa relative pat if using nginx reverse proxy
VITE_API_URL=/ewallet
```

### Running the Application (Local Development)

1. Clone this repository

```bash
$ git clone https://github.com/iamhanif11/E-wallet-project-with-React.git
```

2. Install dependency

```bash
$ npm install
```

3. Run the development server

```bash
$ npm run dev
```


## Changelog

| Version | Description                                                                                                                        |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| latest  | Setup Docker multi-stage build, Nginx and setup GitHub Actions for GHCR deployment config by [iamhanif11](https://github.com/iamhani) |

## How to Contribute

- Fork this repository
- Create your changes
- Commit your changes (Please strictly follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard: `feat:`, `fix:`, `chore:`, `docs:`)
- Push to the branch
- Open a Pull Request

### Screenshot
<img src="public/Screenshot 2026-06-03 054514.png"  alt="Deskripsi Gambar">

<img src="public/Screenshot 2026-06-03 054539.png"  alt="Deskripsi Gambar">

<img src="public/Screenshot 2026-06-03 054112.png"  alt="Deskripsi Gambar">



[Preview](https://e-wallet-project-with-react.vercel.app/)

## License

This project is licensed under the MIT License

## Related Project

[Backend E-Wallet Repository](hhttps://github.com/iamhanif11/koda-b7-ewallet-backend.git)