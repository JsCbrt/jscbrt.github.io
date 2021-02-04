const sqlite3 = require('sqlite3').verbose()

function LearnMore(game){
    switch (game){
        case 0:
            open("./baghdatis_simulator.html", "_self");
            break;
        case 1:
            open("./family-mon.html", "_self");
            break;
        case 2:
            open("./sjoelbak.html", "_self");
            break;
    }
}

function Download(game){
    switch (game){
        case 0:
            open("https://experames.itch.io/baghdatis-simulator");
            break;
        case 1:
            alert("Unfortunately, this game will never be released. It has been abandonned");
            break;
        case 2:
            open("https://play.google.com/store/apps/details?id=com.JsCbrt.Sjoelbak");
            break;
    }
}

function ContactFiverr(){
    open("https://www.fiverr.com/jscbrt", "_self");
}

function ContactEmail(){
    location.href="mailto:jason.cabart@gmail.com";
}

function AddToNewsletter(email){
    
}