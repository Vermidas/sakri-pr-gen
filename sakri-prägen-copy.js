// ==UserScript==
// @name         Sakri-Prägen
// @include      **&screen=snob&*group=*
// @include      https://*.die-staemme.de/game.php?village=*&screen=snob&mode=coin&group=64673
// @include      https://*.die-staemme.de/game.php?village=*&screen=snob&mode=coin&group=76876
// @include      **&screen=market&order=*
// @version      0.11
// ==/UserScript==

if (typeof DEBUG !== 'boolean') DEBUG = false;




// Script Config
var scriptConfig = {
    scriptData: {
        prefix: 'PrägeScript',
        name: 'PrägeScript',
        version: 'v2',
        author: 'Sakri',
        authorUrl: '',
        helpLink:
            '',
    },
    translations: {
        en_DK: {
            'Find Frontline Villages': 'Find Frontline Villages',
            'Redirecting...': 'Redirecting...',
            'There was an error!': 'There was an error!',
            Player: 'Player',
            Tribe: 'Tribe',
            'Excluded Players': 'Excluded Players',
            'Start typing and suggestions will show ...':
                'Start typing and suggestions will show ...',
            'You must select at least one player or one tribe!':
                'You must select at least one player or one tribe!',
            'You have no frontline villages!':
                'You have no frontline villages!',
            Coordinates: 'Coordinates',
            'Import to Group': 'Import to Group',
            'Add to Group': 'Add to Group',
            'Choose Group': 'Choose Group',
            'Travel Times': 'Travel Times',
            'No groups found!': 'No groups found!',
            'This functionality requires Premium Account!':
                'This functionality requires Premium Account!',
            Automatic: 'Automatic',
            Manually: 'Manually',
            'Input Coordinates': 'Input Coordinates',
            'Coordinates Input': 'Coordinates Input',
        },
        de_DE: {
            'Gruppe': 'Gruppe',
            'Ankunft beliebig': 'Ankunft beliebig',
            'Angriffe Senden': 'Angriffe Senden',
            'Abschickzeitraum': 'Abschickzeitraum',
            'Sofort Schicken': 'Sofort Schicken',
            'GanzTags': 'GanzTags',
            'Berechnung': 'Berechnung',
            'Zeitraum': 'Zeitraum',
            'Anrgiff pro Dorf': 'Anrgiff pro Dorf',
            'Einstellungen': 'Einstellungen',
            'Hinzufügen': 'Hinzufügen',
            'Löschen': 'Löschen',
            'Abgleichen': 'Abgleichen',
            'Senden': 'Senden',
            'Redirecting...': 'Redirecting...',
            'There was an error!': 'There was an error!',
            Player: 'Spieler',
            Tribe: 'Stamm',
            'Excluded Players': 'Spieler ausschließen',
            'Start typing and suggestions will show ...':
                '...',
            'You must select at least one player or one tribe!':
                'You must select at least one player or one tribe!',
            'You have no frontline villages!':
                'You have no frontline villages!',
            Coordinates: 'Coordinates',
            'Import to Group': 'Import to Group',
            'Add to Group': 'Add to Group',
            'Choose Group': 'Choose Group',
            'Travel Times': 'Travel Times',
            'No groups found!': 'No groups found!',
            'This functionality requires Premium Account!':
                'This functionality requires Premium Account!',
            Automatic: 'Automatisch',
            Manually: 'Manuell',
            'Input Coordinates': 'Input Coordinates',
            'Coordinates Input': 'Koodinaten',
            Vorlage: 'Vorlage',
        },
    },
    allowedMarkets: [],
    allowedScreens: [],
    allowedModes: [],
    isDebug: DEBUG,
    enableCountApi: false,
};


$.getScript(
    `https://raw.githack.com/Sakrixxxx/sdk/main/twsdk.js`,
    async function () {
        await twSDK.init(scriptConfig);
        const scriptInfo = twSDK.scriptInfo();
        twSDK.getWorldConfig();




    const { villages, players, tribes } = await fetchWorldData();

var tabName = document.title;
if (tabName.includes("Sakri-Prägen")) {

  var click_time = 0.5; //secs
  var request_recs_tanslated = "Rohstoffe anfordern";//Translate Request resources to your language
  var totalRequest = 47000;
  //USER DEFINED
  
  let coinCost = {"wood":11.760, "stone": 12.600, "iron":10.500};
  let totalCost  = Object.values(coinCost).reduce((a,b)=> a+b);
  
  function monitorAndCloseTabOnCondition() {
    const checkInterval = 1000; 
  
    const intervalId = setInterval(() => {
      const successBox = document.querySelector('.autoHideBox.success');
      const overviewTableMissing = !document.querySelector('.village_list');

  
      if (successBox || overviewTableMissing) {
        console.log('Bedingung erfüllt, Tab wird in 1 Sekunde geschlossen.');
        clearInterval(intervalId); // Stoppe das Intervall, da die Bedingung erfüllt ist
        
        setTimeout(() => { // Warte 1 Sekunde, bevor der Tab geschlossen wird
          try {
            window.close(); // Versuche, den Tab zu schließen
          } catch (e) {
            console.error('Fehler beim Schließen des Tabs:', e);
          }
        }, 1000); // Verzögerung von 1000 Millisekunden (1 Sekunde)
      } else {
        console.log('Bedingung nicht erfüllt, suche weiter...');
      }
    }, checkInterval);
  }
  
  
  // Rufen Sie diese Funktion auf, um die Überwachung zu starten
  monitorAndCloseTabOnCondition();
  
  
  var recs = $.map($("[class='res show_toggle']"),function(o){return parseInt(o.innerText.replace(".",""))});
  
  function set_recs_to_get(original_recs)
  {
      console.log(recs);
      var submit_wood =  $("[name*=wood]");
      var submit_stone =  $("[name*=stone]");
      var submit_iron =  $("[name*=iron]");
  
      submit_wood.val(Math.floor(coinCost.wood / totalCost * totalRequest));
      submit_stone.val(Math.floor(coinCost.stone / totalCost * totalRequest));
      submit_iron.val(Math.floor(coinCost.iron / totalCost * totalRequest));
  }
  function click_submit()
  {
      var submit_bts = $("[type='submit']");
      var request_btn = $.grep(submit_bts, function(obj){console.log(obj);return obj.value == request_recs_tanslated})[0];
      request_btn.click();
  }
  
  setTimeout(function(){$("[name='select-all']")[0].click();},click_time*1000*(1+ 0.2 * Math.random()));
  setTimeout(function(){set_recs_to_get(recs)},click_time*2000*(1+ 0.2 * Math.random()));
  setTimeout(function(){click_submit();},click_time*3000*(1+ 0.2 * Math.random()));

}


(function() {
  const storage = {
    get(key, defaultValue) {
      return localStorage.getItem(key) || defaultValue;
    },
    set(key, value) {
      localStorage.setItem(key, value);
    }
  };

  const praegeSettings = {
    zeitPrägen: storage.get('Prägezeit', '0'),
    zeitAnfordern: storage.get('Anfordern', '0'),
    running: storage.get('prägeScriptRunning', 'false') === 'true'
  };

  function updateUI() {
    document.getElementById('anfordernzeit').value = praegeSettings.zeitAnfordern;
    document.getElementById('praegezeit').value = praegeSettings.zeitPrägen;
    document.getElementById('startButton').disabled = praegeSettings.running;
    document.getElementById('stopButton').disabled = !praegeSettings.running;
  }



  function startScript() {
    const delay = parseInt(praegeSettings.zeitPrägen, 10);
    const multiplier = 600 * (1 + 0.2 * Math.random());

    if (praegeSettings.running && delay > 0) {
      setTimeout(() => $("[id='select_anchor_top']")[0].click(), multiplier * delay);
      setTimeout(() => $("[class^='mint_multi_button']")[0].click(), multiplier * delay * 1.01);
      setTimeout(() => location.reload(), delay * multiplier * 1.02);
    }
  }
if (window.location.href.includes('snob')){
  function createUI() {
    const visItem = document.querySelector('.vis_item');
    if (!visItem) return;

    const customStyle = `

    .ui-state-hover {
      display: none; /* Standardmäßig nicht angezeigt */
      width: auto;
      background-color: black;
      color: white;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
      position: absolute;
      z-index: 1;
      bottom: 100%;
      left: 50%;
      margin-left: -60px;
    }
  
    .info-icon:hover .ui-state-hover {
      display: block; /* Beim Hovern anzeigen */
    }
    
    .info-icon {
      color: red;
    }
    

    `;
    const tableHTML = `
    <style>${customStyle}</style>
    <table id="praegeTable" class="vis overview_table">
      <thead>
      <tr>
      <th colspan="2" style="text-align: center; position: relative;">
        ⚙️ <span style="padding: 0 10px;">Präge-Einstellungen</span> ⚙️
        <span style="float: right; cursor: pointer;" class="info-icon">ℹ️
        <span class="ui-state-hover">
        Gruppeneinstellungen zum Anfordern:<br>Händler >= 47<br>Holz/Lehm/Eisen > 17.000
      </span>
      
        </span>
      </th>
    </tr>
      </thead>
      <tbody>
        <tr>
          <td style="width: 30%;">Zeit-Prägen:</td>
          <td style="width: 70%;">
            <input type="text" id="praegezeit" style="width: 100%; box-sizing: border-box;">
          </td>
        </tr>
        <tr>
          <td style="width: 30%;">Zeit-Anfordern: <span id="countdownDisplay">0</span></td>
          <td style="width: 70%;">
            <input type="text" id="anfordernzeit" style="width: 100%; box-sizing: border-box;">
          </td>
        </tr>
        <tr>
          <td colspan="2" style="text-align: center;">
            <button class="btn" id="startButton">Start</button>
            <button class="btn" id="stopButton">Stop</button>
          </td>
        </tr>
      </tbody>
    </table>
  `;
  
  

visItem.insertAdjacentHTML('beforebegin', tableHTML);
function toggleScript(start) {
  praegeSettings.running = start;
  storage.set('prägeScriptRunning', start.toString());
  updateUI();
  if (start) {
    startScript();
    initializeCountdown();
  } else {
    clearTimeout(timeoutID);
  }
}
document.getElementById('praegezeit').addEventListener('input', (e) => {
  const value = parseInt(e.target.value, 10); // Wert als Zahl umwandeln

  if (value < 5) {
    // Zeigt eine Fehlermeldung an, wenn der Wert kleiner als 60 ist
    UI.ErrorMessage("Die Anforderungszeit darf nicht kleiner 5 sein.", 2000);

  } else {

  storage.set('Prägezeit', value);
  praegeSettings.zeitPrägen = value;
  }
  if (value === '0') {
    console.log('Die Prägezeit ist 0, das Skript wird gestoppt.');
    toggleScript(false);
  }
});

document.getElementById('anfordernzeit').addEventListener('input', (e) => {
  const value = parseInt(e.target.value, 10); // Wert als Zahl umwandeln

  if (value < 60) {
    // Zeigt eine Fehlermeldung an, wenn der Wert kleiner als 60 ist
    UI.ErrorMessage("Die Anforderungszeit darf nicht kleiner 60 sein.", 2000);

  } else {
    // Wert ist gültig, speichern Sie den Wert
    storage.set('Anfordern', value);
    praegeSettings.zeitAnfordern = value;
  }
});


document.getElementById('startButton').addEventListener('click', () => toggleScript(true));
document.getElementById('stopButton').addEventListener('click', () => toggleScript(false));


async function extractAndPrintCoordsFromTable(tableId) {
  await preloadVillageData(); // Dorfdaten vorladen

  const coordsRegex = /\d{1,3}\|\d{1,3}/g;
  const table = document.getElementById(tableId);
  if (!table) {
    console.error('Tabelle nicht gefunden mit der ID:', tableId);
    return;
  }

  const cells = table.getElementsByTagName('td');
  const coordsPromises = [];
  for (let cell of cells) {
    const text = cell.textContent || cell.innerText;
    const matches = text.match(coordsRegex);
    if (matches) {
      matches.forEach(match => {
        const villageId = findVillageIdByCoordsFromCache(match); // Verwendung des Cache
        if (villageId) {
          console.log(`Gefundene Koordinaten: ${match}, Dorf-ID: ${villageId}`);
          addCoordToPraegeTable(match);
        } else {
          console.log(`Keine Dorf-ID gefunden für Koordinaten: ${match}`);
        }
      });
    }
  }

  // Warten auf die Fertigstellung aller Promises, wenn nötig
  await Promise.all(coordsPromises);
}

function addCoordToPraegeTable(coord, index) {
  const praegeTable = document.getElementById('praegeTable');
  if (!praegeTable) {
    console.error('praegeTable nicht gefunden');
    return;
  }

  const tbody = praegeTable.getElementsByTagName('tbody')[0];
  const newRow = tbody.insertRow(2);
  const coordCell = newRow.insertCell(0);
  coordCell.textContent = coord;

  const dropdownCell = newRow.insertCell(1);
  const selectElement = document.createElement('select');

  groupInfoList.forEach(group => {
    const option = document.createElement('option');
    option.value = group.groupId;
    option.textContent = group.title;
    selectElement.appendChild(option);

    // Setze die gespeicherte Auswahl, falls vorhanden
    const savedGroupId = localStorage.getItem(`selectedGroupFor_${coord}`);
    if (group.groupId === savedGroupId) {
      option.selected = true;
    }
  });

  dropdownCell.appendChild(selectElement);

  selectElement.addEventListener('change', async function() {
    const selectedGroupId = this.value;
    localStorage.setItem(`selectedGroupFor_${coord}`, selectedGroupId);
    generateLinkAndLog(coord, selectedGroupId);
  });

  // Erzeugen Sie den Link sofort mit der gespeicherten Gruppen-ID, falls vorhanden
  const savedGroupId = localStorage.getItem(`selectedGroupFor_${coord}`);
  if (savedGroupId) {
    generateLinkAndLog(coord, savedGroupId);
  }
}
let generatedLinks = [];
async function generateLinkAndLog(coord, groupId) {
  const villageId = await findVillageIdByCoordsFromCache(coord);
  const worldID = game_data.world;
  if (villageId) {
    const link = `https://${worldID}.die-staemme.de/game.php?village=${villageId}&screen=market&order=distance&dir=ASC&target_id=0&mode=call&group=${groupId}`;
    console.log(`Link für Koordinate ${coord} (Dorf-ID: ${villageId}, Gruppen-ID: ${groupId}): ${link}`);
    generatedLinks.push({ link, groupId }); // Speichert Link zusammen mit der zugehörigen Gruppen-ID
  } else {
    console.log(`Keine Dorf-ID gefunden für Koordinaten: ${coord}`);
  }
}

let villageDataCache = []; // Zwischenspeicher für Dorfdaten

// Asynchrone Funktion zum Vorladen von Dorfdaten
async function preloadVillageData() {
  if (!villageDataCache.length) {
    try {
      villageDataCache = await twSDK.worldDataAPI('village');
    } catch (error) {
      console.error('Fehler beim Abrufen der Dorfdaten:', error);
    }
  }
}

// Synchroner Zugriff auf Dorfdaten aus dem Cache
function findVillageIdByCoordsFromCache(coords) {
  const [x, y] = coords.split('|').map(coord => coord.trim());
  const village = villageDataCache.find(v => v[2] === x && v[3] === y);
  return village ? village[0] : null;
}

let groupInfoList = [];
function extractAndLogGroupInfo() {
  const visItem = document.querySelector('.vis_item');
  if (!visItem) {
    console.error('Element mit der Klasse vis_item nicht gefunden');
    return;
  }

  const groupItems = visItem.querySelectorAll('.group-menu-item');
  groupInfoList = [];
  groupItems.forEach(item => {
    const groupId = item.getAttribute('data-group-id');
    let title = item.getAttribute('data-title');
    if (!title) {
      title = item.textContent.trim();
    }
    groupInfoList.push({ groupId, title });
    console.log(`Gruppen-ID: ${groupId}, Titel: ${title}`);
  });
}



function createCountdownDisplay() {
  const countdownContainer = document.createElement('div');
  countdownContainer.id = 'countdownContainer';
  countdownContainer.style.marginTop = '10px';
  document.querySelector('#anfordernzeit').parentNode.appendChild(countdownContainer);
}

function updateCountdownDisplay(time) {
  const countdownContainer = document.getElementById('countdownDisplay');
  countdownContainer.textContent = `${time}`;
}

function startCountdown() {

  if (!praegeSettings.running) {
    console.log('Das Skript ist nicht aktiv, der Countdown wird nicht gestartet.');
    return;
  }

  let time = parseInt(localStorage.getItem('CurrentCountdown')) || parseInt(localStorage.getItem('Anfordern')) || 0;
  updateCountdownDisplay(time);

  const countdownInterval = setInterval(() => {
    time--;
    localStorage.setItem('CurrentCountdown', time.toString());
    updateCountdownDisplay(time);

    if (time <= 0) {
      console.log("Countdown hat 0 erreicht. Neustart des Countdowns.");
      executeCodeForAllLinks();
      clearInterval(countdownInterval);
      localStorage.removeItem('CurrentCountdown');
      startCountdown();
    }
  }, 1000);
}



async function executeCodeForAllLinks() {
  const openTabPromises = generatedLinks.map((linkInfo, index) => 
    new Promise((resolve) => setTimeout(() => {
      // Öffnen Sie einen neuen Tab mit einem vorläufigen Titel als zweites Argument
      const newTab = window.open(linkInfo.link, '_blank');
      console.log('Neuer Tab geöffnet für:', linkInfo.link, 'mit Gruppen-ID:', linkInfo.groupId);
      
      if (newTab) {
        // Warten, bis der neue Tab geladen ist, bevor Sie versuchen, den Titel zu ändern
        newTab.addEventListener('load', function() {
          try {
            // Ändern Sie den Titel des neuen Tabs, wenn er geladen wird
            newTab.document.title = `Sakri-Prägen ${linkInfo.groupId}`;
           // console.log('Tab-Titel geändert zu:', `Gruppe ${linkInfo.groupId}`);
          } catch (error) {
            console.error('Fehler beim Ändern des Tab-Titels:', error);
          }
        });
      }

      resolve();
    }, 200 * index))
  );

  await Promise.all(openTabPromises);
}




function initializeCountdown() {
  createCountdownDisplay();
  startCountdown();
}

document.addEventListener('DOMContentLoaded', (event) => {
  initializeCountdown();
});

// Update UI on page load to restore countdown state
document.addEventListener('DOMContentLoaded', (event) => {
  if (localStorage.getItem('Anfordern')) {
    createCountdownDisplay();
    startCountdown();
  }
});


updateUI();
createCountdownDisplay();
startCountdown();

extractAndLogGroupInfo();
extractAndPrintCoordsFromTable('coin_overview_table');
}
}

createUI();


if (praegeSettings.running) {
startScript();
}
})();

async function fetchWorldData() {
  try {
      const villages = await twSDK.worldDataAPI('village');
      const players = await twSDK.worldDataAPI('player');
      const tribes = await twSDK.worldDataAPI('ally');
      return { villages, players, tribes };
  } catch (error) {
      UI.ErrorMessage(error);
      console.error(`${scriptInfo} Error:`, error);
  }
}});
