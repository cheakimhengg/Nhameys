# Olympia

This template should help get you started developing with Vue 3 in Vite.

## Features

### Current Order Management
- **Check Current Order**: Users can view their current order for a specific table
- **Professional Dialog**: Clean, modern interface for displaying order details
- **Export Receipt**: Download order receipt as a text file
- **Multi-language Support**: Available in English and Khmer
- **Real-time Status**: Shows order status with color-coded tags

#### API Integration
The application integrates with the `/getcurrentorder` API endpoint to fetch current order data for a table.

#### Usage
1. Navigate to the menu page for a specific table
2. Click the document icon next to the cart to check current order
3. View order details, status, and total amount
4. Export receipt if needed

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
