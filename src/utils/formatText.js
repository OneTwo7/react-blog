export const formatTitle = (title) => (
  title.length > 16 ? title.slice(0, 15) + '…' : title
);
