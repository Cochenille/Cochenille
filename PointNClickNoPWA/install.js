
let deferredInstallPrompt = null;
const installButton = document.getElementById('butInstall');
installButton.addEventListener('click', installPWA);


// Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

// on révèle le bouton si chrome détecte une
function saveBeforeInstallPromptEvent(evt) {
    //CODELAB: Add code to save event & show the install button
    deferredInstallPrompt = evt;
    installButton.removeAttribute("hidden");
}

/**
* Event handler for butInstall - Does the PWA installation.
*
* @param {Event} evt
*/
function installPWA(evt) {
    // CODELAB: Add code show install prompt & hide the install button.
    // CODELAB: Log user response to prompt.
 }
 
 // CODELAB: Add event listener for appinstalled event
 /**
 * Event handler for appinstalled event.
 *   Log the installation to analytics or save the event somehow.
 *
 * @param {Event} evt
 */
 function logAppInstalled(evt) {
    // CODELAB: Add code to log the event
 
 }
 
 