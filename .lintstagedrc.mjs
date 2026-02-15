export default {
  "*.{ts,tsx,js,jsx}": ["npm run lint:staged --"],
  "**/*": ["npm run format:staged --"],
};
