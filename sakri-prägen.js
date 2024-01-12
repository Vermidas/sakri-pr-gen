// ==UserScript==
// @name         Sakri-Prägen(coin gruppe)

// @include      **&screen=snob&*group=*
// @include      https://*.die-staemme.de/game.php?village=*&screen=snob&mode=coin&group=64673
// @include      https://*.die-staemme.de/game.php?village=*&screen=snob&mode=coin&group=76876
// @version      0.11
// ==/UserScript==

var urlgithub = 'https://raw.githubusercontent.com/Vermidas/sakri-pr-gen/main/Lizenz.txt';
var userName = game_data.player.name;

fetch(urlgithub)
  .then(response => response.text())
  .then(data => {
    var lines = data.split('\n');
    var found = false;
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (line.trim() === '') {
        continue; // Skip empty lines
      }
      var parts = line.split(',');
      var user = parts[0].trim();
      var dateString = parts[1] ? parts[1].trim() : '';
      var userDate = dateString ? new Date(dateString) : null;
      if (user === userName && userDate && isSameDayOrFuture(userDate, new Date())) {
        found = true;
        break;
      }
    }

    if (found) {



// Finde das Element mit der Klasse "vis_item"
var visItem = document.querySelector('.vis_item');

// Erstelle die Tabelle als HTML-String
var tableHTML = `
  <table>
    <thead>
      <tr>
        <th colspan="2">Präge-Einstellungen</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="width: 30%;">Zeit:</td>
        <td style="width: 70%;"><input type="text" id="praegezeit" style="width: 100%; box-sizing: border-box;"></td>
      </tr>
    </tbody>
  </table>
`;

// Füge die Tabelle über dem Element mit der Klasse "vis_item" ein
visItem.insertAdjacentHTML('beforebegin', tableHTML);

// Funktion zum Ausführen der Aktionen basierend auf der Prägezeit
function handlePraegezeitChange() {
  var praegezeitWert = document.getElementById('praegezeit').value;
  localStorage.setItem('Prägezeit', praegezeitWert);

  if (praegezeitWert === '0') {
    console.log('Die Prägezeit ist 0, das Skript wird gestoppt.');
    stopScript();
  } else {
    startScript();
  }
}

// Funktion zum Starten des Skripts
function startScript() {
  var gespeichertePraegezeit = localStorage.getItem('Prägezeit');
  var delay = gespeichertePraegezeit || document.getElementById('praegezeit').value;
  var multiplier = 600 * (1 + 0.2 * Math.random());
  
  setTimeout(function() { $("[id='select_anchor_top']")[0].click() }, multiplier * delay);
  setTimeout(function() { $("[class^='mint_multi_button']")[0].click() }, multiplier * delay * 1.01);
  setTimeout(function() { location.reload() }, delay * multiplier * 1.02);
}

// Funktion zum Stoppen des Skripts
function stopScript() {
  // Hier kannst du ggf. weitere Aktionen hinzufügen, um das Skript zu stoppen
}

// Überwache Änderungen im Texteingabefeld 'praegezeit'
document.getElementById('praegezeit').addEventListener('input', handlePraegezeitChange);

// Initialisieren des Skripts
initializeScript();

// Funktion zum Initialisieren des Skripts
function initializeScript() {
  var gespeichertePraegezeit = localStorage.getItem('Prägezeit');

  if (gespeichertePraegezeit !== null) {
    document.getElementById('praegezeit').value = gespeichertePraegezeit;
  }

  var praegezeitWert = document.getElementById('praegezeit').value;

  if (praegezeitWert !== '0') {
    startScript();
  } else {
    console.log('Die Prägezeit ist 0, das Skript wird gestoppt.');
    stopScript();
  }
}

} else {
  console.log('negativ');
  UI.ErrorMessage("Deine Laufzeit für den Präger ist abgelaufen.", 2000);
}
})
.catch(error => {
console.error('Ein Fehler ist aufgetreten:', error);
});

function isSameDayOrFuture(date1, date2) {
var currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);
date1.setHours(0, 0, 0, 0);
return date1 >= currentDate;
}
