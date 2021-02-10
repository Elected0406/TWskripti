var Protsent_sbora  = [3000,1000,500, 430] 
var kopeyshchik = 0;
var mechnik = 1;
var toporshchik = 2;
var luchnik = 3;
var legkaya_kavaleriya= 4;
var Luchnik_na_kone = 5;
var tyazhelaya_kavaleriya = 6;

var UNIT_INEX = 0;
var Final = 1;
var naciati = 2;
var Yemkost_yaceiki = 3;
var INPUT = 4;

var yedinitsy_sbora = [
    [kopeyshchik, "a.units-entry-all[data-unit='spear']",true,25,"input.unitsInput[name='spear']"],
    [mechnik, "a.units-entry-all[data-unit='sword']",true,15,"input.unitsInput[name='sword']"],
    [toporshchik, "a.units-entry-all[data-unit='axe']",true,10,"input.unitsInput[name='axe']"],
    [luchnik, "a.units-entry-all[data-unit='archer']",true,10,"input.unitsInput[name='archer']"],
    [legkaya_kavaleriya, "a.units-entry-all[data-unit='light']",true,80,"input.unitsInput[name='light']"],
    [Luchnik_na_kone , "a.units-entry-all[data-unit='marcher']",true,50,"input.unitsInput[name='marcher']"],
    [tyazhelaya_kavaleriya, "a.units-entry-all[data-unit='heavy']",true,50,"input.unitsInput[name='heavy']"],
];

function intellekt_mekhanizm(to){
    try{
        return parseInt(to[0].innerText.replace("(","").replace(")",""))
    } catch (e) {
        return 0;
    }
}

var Tablitsa = $(document).find(".candidate-squad-widget.vis").get()[0];

function kalkulyator(cap_index){

    var yedinitsy = []
    var otkryto = []
    for (var u in yedinitsy_sbora){
        yedinitsy.push(0)
        otkryto.push(0)
    }


    for (var i = 0; i < yedinitsy_sbora.length; i++){
        if (yedinitsy_sbora[i][naciati]){
            yedinitsy[i] = intellekt_mekhanizm($(Tablitsa).find(yedinitsy_sbora[i][Final]).get())
        }
    }
    var sobirat_resursy = Protsent_sbora[cap_index]

    for (i = 0; i < yedinitsy.length; i++){
        if (yedinitsy[i] != 0) {
            if (yedinitsy[i] * yedinitsy_sbora[i][Yemkost_yaceiki] > sobirat_resursy){
                otkryto[i] = Math.floor(sobirat_resursy / yedinitsy_sbora[i][Yemkost_yaceiki])
                break;
            } else {
                otkryto[i] = yedinitsy[i];
                sobirat_resursy -= Math.floor(yedinitsy[i] * yedinitsy_sbora[i][Yemkost_yaceiki]);
            }
        }
    }

    return otkryto;

}

function fill(otkryto) {
    for (var i = 0; i < otkryto.length; i++){
        var to = $(Tablitsa).find(yedinitsy_sbora[i][INPUT])
        to.trigger('focus');
        to.trigger('keydown');
        to.val(otkryto[i])
        to.trigger('keyup');
        to.trigger('change');
    }
}
var knopka = $(document).find(".btn.btn-default.free_send_button").get();

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}


function propustit_derevnyu(){
    if ($(document).find("#village_switch_right").get()["0"]){
        jQuery.event.trigger({ type: 'keydown', which: 68 });
    }else{
        location.reload();
    }
}


sleep(10).then(() => {
    fill(kalkulyator(3));
    $(knopka[3]).click();
}).then(sleep(3000).then(() => {
    fill(kalkulyator(2));
    $(knopka[2]).click();
}).then(sleep(6000).then(() => {
    fill(kalkulyator(1));
    $(knopka[1]).click();
}).then(sleep(9000).then(() => {
    fill(kalkulyator(0));
    $(knopka[0]).click();
}).then())))


setTimeout(propustit_derevnyu, 12000);
