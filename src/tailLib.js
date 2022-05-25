const forLines = (content, option) => {
  const limit = option['-n']['limit'];
  const lines = content.split('\n');
  return lines.slice(0 - limit).join('\n');
};

const forBytes = (content, option) => {
  const limit = option['-c']['limit'];
  const lines = content.split('');
  return lines.slice(0 - limit).join('');
};

const tail = (content, options) => {
  return options['-c']['limit'] ?
    forBytes(content, options) : forLines(content, options);
};

exports.tail = tail;
