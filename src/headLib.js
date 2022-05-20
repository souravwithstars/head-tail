const head = (content, numberOfLines) => {
  const lines = content.split('\n');
  return lines.slice(0, numberOfLines).join('\n');
};

exports.head = head;
