import { queryParamOptions } from "./query_parameters";

export const IS_DEBUG =
    G_IS_DEV &&
    typeof window !== "undefined" &&
    window.location.port === "3005" &&
    (window.location.host.indexOf("localhost:") >= 0 || window.location.host.indexOf("192.168.0.") >= 0) &&
    window.location.search.indexOf("nodebug") < 0;

export const IS_DEMO = queryParamOptions.fullVersion
    ? false
    : (!G_IS_DEV && !G_IS_STANDALONE) ||
      (typeof window !== "undefined" && window.location.search.indexOf("demo") >= 0);

export const SUPPORT_TOUCH = false;

const smoothCanvas = true;

export const THIRDPARTY_URLS = {
    discord: "https://discord.gg/HN7EVzV",
    github: "https://github.com/tobspr/shapez.io",
    reddit: "https://www.reddit.com/r/shapezio",

    standaloneStorePage: "https://store.steampowered.com/app/1318690/shapezio/",
};

export const globalConfig = {
    // Size of a single tile in Pixels.
    // NOTICE: Update webpack.production.config too!
    tileSize: 32,
    halfTileSize: 16,

    // Which dpi the assets have
    assetsDpi: 192 / 32,
    assetsSharpness: 1.5,
    shapesSharpness: 1.4,

    // Production analytics
    statisticsGraphDpi: 2.5,
    statisticsGraphSlices: 100,
    analyticsSliceDurationSeconds: G_IS_DEV ? 1 : 10,

    minimumTickRate: 25,
    maximumTickRate: 500,

    // Map
    mapChunkSize: 16,
    mapChunkOverviewMinZoom: 0.9,
    mapChunkWorldSize: null, // COMPUTED

    // Belt speeds
    // NOTICE: Update webpack.production.config too!
    beltSpeedItemsPerSecond: 2,
    minerSpeedItemsPerSecond: 0, // COMPUTED

    defaultItemDiameter: 20,

    itemSpacingOnBelts: 0.63,

    wiresSpeedItemsPerSecond: 6,

    undergroundBeltMaxTilesByTier: [5, 9],

    readerAnalyzeIntervalSeconds: G_IS_DEV ? 3 : 10,

    buildingSpeeds: {
        cutter: 1 / 4,
        cutterQuad: 1 / 4,
        rotater: 1 / 1,
        rotaterCCW: 1 / 1,
        rotater180: 1 / 1,
        painter: 1 / 6,
        painterDouble: 1 / 8,
        painterQuad: 1 / 2,
        mixer: 1 / 5,
        stacker: 1 / 8,
    },

    // Zooming
    initialZoom: 1.9,
    minZoomLevel: 0.1,
    maxZoomLevel: 3,

    // Global game speed
    gameSpeed: 1,

    warmupTimeSecondsFast: 0.5,
    warmupTimeSecondsRegular: 3,

    smoothing: {
        smoothMainCanvas: smoothCanvas && true,
        quality: "low", // Low is CRUCIAL for mobile performance!
    },

    rendering: {},
    debug: require("./config.local").default,

    // Secret vars
    info: {
        // Binary file salt
        file: "Ec'])@^+*9zMevK3uMV4432x9%iK'=",

        // Savegame salt
        sgSalt: "}95Q3%8/.837Lqym_BJx%q7)pAHJbF",

        // Analytics key
        analyticsApiKey: "baf6a50f0cc7dfdec5a0e21c88a1c69a4b34bc4a",
    },
};

export const IS_MOBILE = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Automatic calculations
globalConfig.minerSpeedItemsPerSecond = globalConfig.beltSpeedItemsPerSecond / 5;

globalConfig.mapChunkWorldSize = globalConfig.mapChunkSize * globalConfig.tileSize;

// Dynamic calculations
if (globalConfig.debug.disableMapOverview) {
    globalConfig.mapChunkOverviewMinZoom = 0;
}

// Stuff for making the trailer
if (G_IS_DEV && globalConfig.debug.renderForTrailer) {
    globalConfig.debug.framePausesBetweenTicks = 32;
    // globalConfig.mapChunkOverviewMinZoom = 0.0;
    // globalConfig.debug.instantBelts = true;
    // globalConfig.debug.instantProcessors = true;
    // globalConfig.debug.instantMiners = true;
    globalConfig.debug.disableSavegameWrite = true;
    // globalConfig.beltSpeedItemsPerSecond *= 2;
}

if (globalConfig.debug.fastGameEnter) {
    globalConfig.debug.noArtificialDelays = true;
}
