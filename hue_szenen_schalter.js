
console.log("start bad schalter");
var akt_modus = 0; // aktueller Lichtmodus
var isOn = 0; // ist das licht aktuell an? 


/* Function die den aktuellen Startmodus je nach Uhrzeit ausspukt */
function getStartModus() {

    var datum = new Date();
    var stunde = datum.getHours(); // Aktuelle Stunde bestimmen um Anschaltmodus anzupassen

    var statModus = 0;

    if (stunde <= 6 || stunde >= 22) { // Nachts dunkel starten
        startModus = 0;
    } else if (stunde >= 7 && stunde <= 10) { // Ab morgens 7 Uhr bis 9 Uhr Voll Hell
        startModus = 2;
    } else {
        startModus = 1; //  zu allen anderen Uhrzeiten mittelhell
    }
    return startModus;
}

function switchON() {

    if (isOn == 0) { // Wenn Lampen angeschaltet werden. dann startmodus holen
        akt_modus = getStartModus();
        console.log("StatMOdus: " + akt_modus);
    }

    isOn = 1;

    if (akt_modus === 0) {
        setState("javascript.0.PhilipsHue.Scenes.bad-szene-nacht.9Jrzt3q6pvbOEYy", true);
        akt_modus = 1;

    } else if (akt_modus === 1) {
        setState("javascript.0.PhilipsHue.Scenes.bad-szene-mittel.4o8ZRaHcsOOafBh", true);
        akt_modus = 2;

    } else if (akt_modus === 2) {
        setState("javascript.0.PhilipsHue.Scenes.bad-szene-hell.91hx4a4y-HyZ2Vu", true);
        akt_modus = 0;
    }
}

function switchOff() {
    setState("hue.0.Philips_hue.Bad.level", 0);
    akt_modus = 0;
    isOn = 0;
}

on({ id: "hm-rpc.0.PEQ0534362.1.PRESS_SHORT" }, function () {
    switchON();
});

on({ id: "hm-rpc.0.PEQ0534362.1.PRESS_LONG" }, function () {
    switchON();
});

on({ id: "hm-rpc.0.PEQ0534362.2.PRESS_SHORT" }, function () {
   switchOff(); 
});
on({ id: "hm-rpc.0.PEQ0534362.2.PRESS_LONG" }, function () {
   switchOff(); 
});
