const iconSvgs = require.context('./', false, /\.svg$/);
const iconFilePaths = iconSvgs.keys();
const iconFilePathsMappedToSrc = iconFilePaths.reduce(
  (icons, filePath) => ({ ...icons, [filePath]: iconSvgs(filePath) }),
  {}
);

export default iconFilePathsMappedToSrc;
