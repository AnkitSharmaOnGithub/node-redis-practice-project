exports.generateKey = (prefix, uuid) => {
  return `${prefix}#${uuid}`;
};
