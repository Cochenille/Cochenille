/* https://codepen.io/vajkri/pen/grgQmb */
var lFollowX = 0,
    lFollowY = 0,
    x = 0,
    y = 0,
    friction = 1 / 30;

function moveBackground() {
    x += (lFollowX - x) * friction;
    y += (lFollowY - y) * friction;

    translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';

    $('.bgBouge').css({
        '-webit-transform': translate,
        '-moz-transform': translate,
        'transform': translate
    });

    window.requestAnimationFrame(moveBackground);
}

$(window).on('mousemove click', function(e) {

    var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
    var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
    lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
    lFollowY = (10 * lMouseY) / 100;

});

moveBackground();


/* Jeu association d'icônes */
let compteCase = 0;
let caseClicked = "";
let iconeClickedClass = "";
let iconeClickedId = "";
let associations = 0;

$(".icone").click(function() {
    let nomIcone = $(this).attr('id');
    $(this).addClass("cacher");
    $("#case" + compteCase).html('<i id="' + nomIcone + 'Inventaire" class="iconeInventaire fas fa-' + nomIcone + '" draggable="true" ondragstart="drag(event)"></i>');
    $("#case" + compteCase).addClass("caseOccupied");
    compteCase++;

    if (compteCase > 0) {
        $(".inventaire").css("display", "block");

        if (window.matchMedia("(max-width: 991px)").matches) {
            $(".caseOccupied").click(function() {

                if (caseClicked != "") {
                    $("#" + caseClicked).toggleClass("surbrillance");
                }
                caseClicked = $(this).attr("id");
                $(this).toggleClass("surbrillance");

                iconeClickedClass = $(this).children().attr("class");
                iconeClickedId = $(this).children().attr("id");

            });
        }
    }
});

if (window.matchMedia("(max-width: 991px)").matches) {
    $(".caseGrise").click(function() {
        if ($(this).attr("id") === "emplacementMouse" && iconeClickedId === "mouseInventaire") {
            $(this).append("<i id='" + iconeClickedId + "' class='iconePoser " + iconeClickedClass + "'></i>");
            $("#emplacementMouse").addClass("emplacementCombler");
            $("#" + caseClicked).empty();
            $("#" + caseClicked).toggleClass("surbrillance");
            $("#" + caseClicked).removeClass("caseOccupied");
            associations++;
        }
        else if ($(this).attr("id") === "emplacementUser" && iconeClickedId === "userInventaire") {
            $(this).append("<i id='" + iconeClickedId + "' class='iconePoser " + iconeClickedClass + "'></i>");
            $("#emplacementUser").addClass("emplacementCombler");
            $("#" + caseClicked).empty();
            $("#" + caseClicked).removeClass("caseOccupied");
            associations++;
        }
        else if ($(this).attr("id") === "emplacementPuzzle" && iconeClickedId === "puzzle-pieceInventaire") {
            $(this).append("<i id='" + iconeClickedId + "' class='iconePoser " + iconeClickedClass + "'></i>");
            $("#emplacementPuzzle").addClass("emplacementCombler");
            $("#" + caseClicked).empty();
            $("#" + caseClicked).removeClass("caseOccupied");
            associations++;
        }
        else if ($(this).attr("id") === "emplacementBinoculars" && iconeClickedId === "binocularsInventaire") {
            $(this).append("<i id='" + iconeClickedId + "' class='iconePoser " + iconeClickedClass + "'></i>");
            $("#emplacementBinoculars").addClass("emplacementCombler");
            $("#" + caseClicked).empty();
            $("#" + caseClicked).removeClass("caseOccupied");
            associations++;
        }
        if (associations === 4) {
            $("#boutonJeu").removeClass("cacher");
            $("#boutonJeu").css("display", "flex");
            $(".inventaire").css("display", "none");
        }
    });
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    if (window.matchMedia("(min-width: 992px)").matches) {
        ev.dataTransfer.setData("text", ev.target.id);
    }
}

function drop(ev) {
    ev.preventDefault();
    if (window.matchMedia("(min-width: 992px)").matches) {
        var data = ev.dataTransfer.getData("text");
        if (ev.target.id === "emplacementMouse" && data === "mouseInventaire") {
            ev.target.appendChild(document.getElementById(data));
            associations++;
            $("#mouseInventaire").addClass("iconePoser");
            $("#emplacementMouse").addClass("emplacementCombler");
        }
        if (ev.target.id === "emplacementUser" && data === "userInventaire") {
            ev.target.appendChild(document.getElementById(data));
            associations++;
            $("#userInventaire").addClass("iconePoser");
            $("#emplacementUser").addClass("emplacementCombler");
        }
        if (ev.target.id === "emplacementPuzzle" && data === "puzzle-pieceInventaire") {
            ev.target.appendChild(document.getElementById(data));
            associations++;
            $("#puzzle-pieceInventaire").addClass("iconePoser");
            $("#emplacementPuzzle").addClass("emplacementCombler");
        }
        if (ev.target.id === "emplacementBinoculars" && data === "binocularsInventaire") {
            ev.target.appendChild(document.getElementById(data));
            associations++;
            $("#binocularsInventaire").addClass("iconePoser");
            $("#emplacementBinoculars").addClass("emplacementCombler");
        }
        if (associations === 4) {
            $("#boutonJeu").removeClass("cacher");
            $("#boutonJeu").css("display", "flex");
            $(".inventaire").css("display", "none");
        }
    }
}

// Changer le bouton du menu s'il est ouvert ou fermé

$("#boutonMenu").click(function() {
    $(".fa-bars").toggleClass("cacher");
    $(".fa-times").toggleClass("cacher");
});


