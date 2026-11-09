import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
// Needed for Three.js / WebGL when rendering headlessly:
Config.setChromiumOpenGlRenderer("angle");
