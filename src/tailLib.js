const tail = (content, option) => {
  const limit = option['-n']['limit'];
  const lines = content.split('\n');
  return lines.slice(0 - limit).join('\n');
};

exports.tail = tail;
