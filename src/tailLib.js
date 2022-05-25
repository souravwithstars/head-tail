const tail = (content, options) => {
  const limit = options['-c']['limit'] ?
    options['-c']['limit'] : options['-n']['limit'];
  const separator = options['-c']['limit'] ? '' : '\n';
  const lines = content.split(separator);
  return lines.slice(0 - limit).join(separator);
};

exports.tail = tail;
