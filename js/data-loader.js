/* ==========================================================================
   RAKSHITH RAGHAVENDRA — UNIVERSAL ASYNC DATA LOADER UTILITY
   Provides fetch(), in-memory session caching, cache-busting, and fallbacks.
   ========================================================================== */

const DataCache = new Map();

/**
 * Universal JSON Loader with cache-busting and graceful error handling.
 * @param {string} endpoint - Relative path to JSON data file
 * @returns {Promise<any|null>} - Parsed JSON object/array or null on error
 */
async function loadJSON(endpoint) {
    if (DataCache.has(endpoint)) {
        return DataCache.get(endpoint);
    }

    try {
        // Cache-busting URL parameter for reliable static deployments
        const cacheBustUrl = `${endpoint}?v=${Date.now()}`;
        const response = await fetch(cacheBustUrl);

        if (!response.ok) {
            throw new Error(`[DataLoader] Failed HTTP ${response.status} fetching ${endpoint}`);
        }

        const data = await response.json();
        DataCache.set(endpoint, data);
        return data;
    } catch (error) {
        console.error(`[DataLoader Error] Unable to load resource '${endpoint}':`, error);
        return null;
    }
}
