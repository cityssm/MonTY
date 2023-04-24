import * as configFunctions from './functions.config.js';
import ActiveDirectory from 'activedirectory2';
const userDomain = configFunctions.getProperty('application.userDomain');
const activeDirectoryConfig = configFunctions.getProperty('activeDirectory');
async function authenticateViaActiveDirectory(userName, password) {
    return await new Promise((resolve) => {
        try {
            const ad = new ActiveDirectory(activeDirectoryConfig);
            ad.authenticate(userDomain + '\\' + userName, password, (error, auth) => {
                let authenticated = false;
                if ((error ?? '') === '') {
                    authenticated = auth;
                }
                resolve(authenticated);
            });
        }
        catch {
            resolve(false);
        }
    });
}
export async function authenticate(userName, password) {
    if ((userName ?? '') === '' || (password ?? '') === '') {
        return false;
    }
    return await authenticateViaActiveDirectory(userName, password);
}
const safeRedirects = new Set([
    '/admin/users',
    '/callouts'
]);
export function getSafeRedirectURL(possibleRedirectURL = '') {
    const urlPrefix = configFunctions.getProperty('reverseProxy.urlPrefix');
    if (typeof possibleRedirectURL === 'string') {
        const urlToCheck = possibleRedirectURL.startsWith(urlPrefix)
            ? possibleRedirectURL.slice(urlPrefix.length)
            : possibleRedirectURL;
        const urlToCheckLowerCase = urlToCheck.toLowerCase();
        if (safeRedirects.has(urlToCheckLowerCase)) {
            return urlPrefix + urlToCheck;
        }
    }
    return urlPrefix + '/dashboard/';
}
