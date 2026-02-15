export default {
  "*.{ts,tsx,js,jsx}": ["npm run lint:staged --"],
  "*.{json,md,yml,yaml,css}": ["npm run format:staged --"],
};
