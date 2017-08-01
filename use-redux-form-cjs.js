module.exports = function() {
  return {
    visitor: {
      ImportDeclaration(path) {
        const source = path.node.source;
        source.value = source.value.replace(/^redux-form\/es($|\/)/, "redux-form/lib$1");
      }
    }
  };
};
