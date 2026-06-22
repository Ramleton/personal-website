# Modern Engineering Portfolio

A high-performance, dynamic portfolio website engineered with **Next.js App Router**, **TypeScript**, and **Tailwind CSS**. This site features an automated server-side data pipeline powered by **TanStack Query** to dynamically sync GitHub repository metrics and pull up-to-date resume assets directly from external endpoints.

## 🚀 Key Engineering Features

* **Automated Data Layer:** Uses the **GitHub GraphQL API (v4)** to fetch pinned repositories, extract real programming language metrics directly from repository byte size counts, and fall back to processing raw markdown text strings from `README.md` files if an explicit project description is missing.
* **Server-Side Hydration:** Leverages **TanStack Query (v5)** alongside Next.js Server Components to pre-fetch and dehydrate complex data structures during server compilation, eliminating layout shifts and delivering instant client-side page rendering.
* **Dynamic Document Pipeline:** Integrates a responsive client button mapping to an auto-synchronized Google Docs preview stream, ensuring recruiters always view the latest version of my resume in a clean, frictionless browser PDF container without forcing a download.
* **Modern Developer Workspace:** Enforces code quality and semantic consistency across all directory modules using strict **TypeScript** configurations and decoupled service layouts.

---

## 🛠️ Tech Stack & Architecture

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **State & Data Fetching:** TanStack Query (React Query)
* **Styling:** Tailwind CSS
* **API Handshakes:** GitHub GraphQL API

```text
personal-website/
├── app/                  # Application Router configurations & layouts
│   ├── layout.tsx        # Core page tree shell & provider wrappers
│   ├── page.tsx          # Asynchronous Server component managing pre-fetch pipelines
│   └── providers.tsx     # TanStack Query client context boundaries
├── components/           # Modular Client/Server UI components
│   ├── Hero.tsx          # Dynamic splash section with resume streaming
│   └── Projects.tsx      # Case-sensitive, cached project grid layouts
├── services/             # Decoupled backend fetching pipelines
│   ├── github.ts         # GraphQL queries, schema parsing & string transformers
│   └── resume.ts         # Cloud document path synchronization
└── tsconfig.json         # Strict compiler mapping & absolute path aliasing (@/*)