export const formatTime = () =>
  new Date()
    .toLocaleString('en-CA', { hour12: true })
    .replace(/-/g, '/')
    .replace(',', '')
    .replace('a.m.', 'AM')
    .replace('p.m.', 'PM');
