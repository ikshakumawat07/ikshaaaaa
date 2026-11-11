# Iksha Kumawat — Astro 6 Portfolio

Built with Astro 6.4.8 and Three.js.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Astro, normally `http://localhost:4321`.

## Show the latest YouTube Music play

YouTube Music listening history is private and has no public website API. This project includes a Last.fm bridge. The easiest setup is to click the music tile in the website, enter your Last.fm username and API key, and press **Test connection**. The values stay in your browser. For a public deployment, use the environment-variable method below:

1. Create a free Last.fm account.
2. On Android, install **Pano Scrobbler**, sign in to Last.fm, and enable YouTube Music scrobbling. For desktop listening, use the **Web Scrobbler** browser extension.
3. Create a Last.fm API key at `https://www.last.fm/api/account/create`.
4. Copy `.env.example` to a new file named `.env`.
5. Fill in:

```env
PUBLIC_LASTFM_USER=your_lastfm_username
PUBLIC_LASTFM_API_KEY=your_lastfm_api_key
```

6. Restart `npm run dev`.

The header will then update to the currently playing or most recently played YouTube Music track.

## Build and deploy

```bash
npm run build
```

Deploy the generated `dist/` folder to Netlify, Vercel, or Cloudflare Pages. Add the two `PUBLIC_LASTFM_*` environment variables in the host settings before building if you want live music history online.
