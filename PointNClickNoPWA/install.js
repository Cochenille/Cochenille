let deferredInstallPrompt = null;
const installButton = document.getElementById('butInstall');
installButton.addEventListener('click', installPWA);


// Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

// on révèle le bouton si chrome détecte une
function saveBeforeInstallPromptEvent(evt) {
    console.log('PWA detectee par google, affichage du bouton d\'installation');
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

    deferredInstallPrompt.prompt();

    // Log user response to prompt.
    deferredInstallPrompt.userChoice
        .then((choice) => {
            if (choice.outcome === 'accepted') {
                // Hide the install button, it can't be called twice.
                installButton.setAttribute('hidden', true);
                console.log('Usager a accepté l\'installation de la PWA', choice);
            } else {
                console.log('L\'usager a refusé l\' installation.', choice);
            }
        });
    deferredInstallPrompt = null;
}


// Add event listener for appinstalled event
window.addEventListener('appinstalled', logAppInstalled);

function logAppInstalled(evt) {
   // Add code to log the event
   console.log('App was installed.', evt);
   installButton.setAttribute('hidden', true);
}

