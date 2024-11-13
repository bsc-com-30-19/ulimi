const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// If you had SVG setup, you can simply revert to NativeWind setup alone
module.exports = withNativeWind(config, { input: './global.css' });
