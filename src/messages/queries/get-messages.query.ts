export const getMessagesQuery = (from: number, to: number) => {
  return `
    SELECT * from message
    WHERE ("fromId"='${from}' AND "toId"='${to}')
    OR ("fromId"='${to}' AND "toId"='${from}')
    `;
};
