# TenTwentyAssignment

This repository contains a React Native / Expo application built as a job test assignment.

## Overview

The app is structured around a bottom tab navigation interface and includes screens for:

- **Watch** — browse upcoming movies and search for titles
- **MovieDetails** — view movie details and trailer actions
- **BookTicket** — choose date/time and plan ticket booking
- **Pay** — complete payment flow
- **Search** — search through movie results and display filtered items

The project uses:

- Expo SDK 54
- React Navigation v7
- TypeScript
- `react-native-svg`, `react-native-modal`, `react-native-youtube-iframe`
- `expo-linear-gradient`

## Files of Note

- `App.js` / `index.js` — Expo app entry points
- `src/navigation/TenTwentyTabs.tsx` — bottom tab navigator
- `src/navigation/TenTwentyStack.tsx` — root stack navigator
- `src/screens/Watch.tsx` — main movie browsing screen
- `src/screens/Search.tsx` — search screen with filter functionality
- `src/screens/MovieDetails.tsx` — movie details screen
- `src/screens/BookTicket.tsx` — ticket booking screen
- `src/screens/Pay.tsx` — payment screen
- `src/services/WatchServices.tsx` — API service functions and shared type definitions

## Getting Started

### Prerequisites

- Node.js installed (recommended LTS version)
- Expo CLI installed globally, or use `npx expo` directly
- A physical device or emulator/simulator for Android/iOS, or a browser for Expo Web

### Install dependencies

If `node_modules` and/or `package-lock.json` are not present, run:

```bash
npm install
```

This will install the required dependencies from `package.json`.

### Run the app

Use one of the following commands from the project root:

```bash
npm start
```

To run on a specific platform:

```bash
npm run android
npm run ios
npm run web
```

If you do not have Expo CLI installed globally, use:

```bash
npx expo start
``` 

### Notes

- The app uses Expo-managed workflow, so it is easiest to run with `expo start`.
- If your environment is missing `package-lock.json`, `npm install` will create it automatically.
- If the project requires a fresh TypeScript build, you can run:

```bash
npx tsc --noEmit
```

## Job Test Notes

This repository is a test assignment demonstrating:

- use of React Navigation with stack and tab navigators
- API service calls
- React Native UI composition with reusable components
