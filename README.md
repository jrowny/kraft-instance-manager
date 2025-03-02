# Kraft Instance Manager

[Kraft Cloud](https://unikraft.cloud/) is a unikernal hosting service that allows you to start unikernals < 100ms. They have a CLI, but I really wanted a "remove" button, so I quickly threw together this little NextJS app. Obviously this isn't meant for production and has not authentication so please don't host it anywhere with your actual kraft token.

## Getting Started

Add a `.env` file with `KRAFT_TOKEN=your_kraft_token`

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
