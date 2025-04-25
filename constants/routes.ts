const ROUTES = {
    HOME: "/",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
};

export default ROUTES;

/**
* An array of routes that are accessible to the public
* These routes do not require authentication
* @type {string[]}
*/
export const publicRoutes = [
    "/",
    // "/auth/new-verification"
];

/**
* An array of routes that are used for authentication
* These routes will redirect logged in users to /settings
* @type {string[]}
*/
export const authRoutes = [
    "/sign-in",
    "/sign-up",
    // "/auth/error",
    // "/auth/reset",
    // "/auth/new-password"
];

/**
* The prefix for API authentication routes
* Routes that start with this prefix are used for API authentication
* @type {string}
*/
export const apiAuthPrefix = "/api/auth";

/**
* The default login redirect route
* This route will redirect logged in users to /settings
* @type {string}
*/
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";