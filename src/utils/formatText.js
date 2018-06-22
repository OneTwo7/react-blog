export const formatTitle = (title) => (
  title.length > 20 ? title.slice(0, 19) + '…' : title
);
