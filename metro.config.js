const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */

const createConfig = () => {
    const config = getDefaultConfig(__dirname);
    config.resolver.assetExts.push("db")
    const { transformer, resolver } = config;
  
    config.transformer = {
      ...transformer,
      babelTransformerPath: require.resolve("react-native-svg-transformer/expo")
    };
    config.resolver = {
      ...resolver,
      assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...resolver.sourceExts, "svg"]
    };
  
    return config;
  };

const config = createConfig();
// If you had SVG setup, you can simply revert to NativeWind setup alone
module.exports = withNativeWind(config, { input: './global.css' });

