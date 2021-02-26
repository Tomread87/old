//-*-*-*-*-*-*-*-* Function to hide and show top menu on scroll -*-*-*-*-*-*-*-*//
//Code found, modified and adpated from https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp

//we add some important variables here
var prevScrollpos = window.pageYOffset;
var tapped = false
var mediaWidth = 770

window.addEventListener("scroll", function HideTopMenu() {
    var header = document.getElementById("header")
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos + 25) {
        header.style.top = "0"
        console.log(tapped);
        if (tapped) {
            $("#nav-menu").fadeIn()
        }
    } else if (prevScrollpos < currentScrollPos) {
        header.style.top = "-96px"
        if ($(window).width() <= mediaWidth) {
            $("#nav-menu").fadeOut()
        }

    }
    prevScrollpos = currentScrollPos
})

//code to show and hide navigation menu on mobile devices

$(document).ready(function () {
    //start of touch listener
    document.getElementById("button-menu").addEventListener("touchstart", function () {

        if ($("#nav-menu").hasClass("invisible")) {
            console.log("test");
            $("#nav-menu").removeClass("invisible")
            $("#button-menu").css({ "background-color": "rgba(70, 70, 70)", "transition": "0.25s" })
            tapped = true
        } else if ($("#nav-menu").css("display") == "block") {
            $("#nav-menu").addClass("invisible")
            $("#button-menu").css({ "background-color": "rgba(255, 70, 70)", "transition": "0.25s" })
            tapped = false
        }
    })
    //end of touch listener

    $("#logo").click(function () { window.location = "index.html" })

    //screen adjustment code
    screenWidth = $(window).width() + 17
    if (screenWidth <= mediaWidth) {
        $("#nav-menu").addClass("invisible")
        MouseOverFunc()
    }
})

function MouseOverFunc(){

    $("#drop-down").mouseover(function () {            
        $("#nav-menu").removeClass("invisible")
        $("#button-menu").css({ "background-color": "rgba(70, 70, 70)", "transition": "0.25s" })
    })
    $("#drop-down").mouseout(function () {
        $("#nav-menu").addClass("invisible")
        $("#button-menu").css({ "background-color": "rgba(255, 70, 70)", "transition": "0.25s" })
    })

} 
$(window).resize(function() {    
    screenWidth = $(window).width() + 17
    $("#drop-down").off() //resets the listener so that ti doesn't bug when chagning screen resolution
    if (screenWidth <= mediaWidth) {
        $("#nav-menu").addClass("invisible")
        MouseOverFunc()
    } 
    if (screenWidth > mediaWidth) {
        console.log("true");
        $("#nav-menu").removeClass("invisible")
    }
})

//-*-*-*-*-*-*-*-* CODE TO CREATE BREADCRUMB -*-*-*-*-*-*-*-*//
//this functions leaves stores a value in sessionStorage so that the user can see which page he is currently at

function addCrumb() {

    var page = window.location.pathname.split("/").pop().split(".")
    page = page[0]
    if (page == "") {
        page = "index"
    }
    sessionStorage.setItem("Crumb", page)
    let crumb = sessionStorage.getItem("Crumb")
    $("#" + crumb).css("border-bottom", "solid 2px rgba(255, 70, 70)")
}

//-*-*-*-*-*-*-*-* CODE TO CHOOSE LANGUAGE -*-*-*-*-*-*-*-*//


window.addEventListener("DOMContentLoaded", function () {
    addCrumb()
    var lang = sessionStorage.getItem("Lang") //get the value of the Lang Key from the sessionStorage
    let crumb = sessionStorage.getItem("Crumb") //get the value of the Crumb Key from sessionStorage

    if (lang === null) { //if the lang is null load page in neglish
        sessionStorage.setItem("Crumb", "index")
        sessionStorage.setItem("Lang", "ENG")
        lang = sessionStorage.getItem("Lang")
        crumb = sessionStorage.getItem("Crumb")
    }

    if (lang == "ITA") { //if lang is italian compile italian
        PopulateMenu(NavMenuIta)
        if (crumb == "index") {
            PopulateIndex(LatestITA, lang) //compile for index-html only
        } else if (crumb == "starters") {
            PopulateStarters(StartersITA, lang) //compily for starters.html only 
        } else if (crumb == "bakery") {
            PopulateBakery(BakeryITA, lang)
        } else if (crumb == "maindishes") {
            PopulateMains(MainsITA, lang)
        }
    }
    if (lang == "ENG") {//if lang is in english compile inglish
        PopulateMenu(NavMenuEng)
        if (crumb == "index") { //compile for index-html only
            PopulateIndex(LatestENG, lang)
        } else if (crumb == "starters") { //compile for index-html only
            PopulateStarters(StartersENG, lang)
        } else if (crumb == "bakery") {
            PopulateBakery(BakeryENG, lang)
        } else if (crumb == "maindishes") {
            PopulateMains(MainsENG, lang)
        }
    }
    addCrumb()
    ShowHide()
})

$("#lang-ita").click(function () {
    sessionStorage.setItem("Lang", "ITA")
    location.reload()
})
$("#lang-eng").click(function () {
    sessionStorage.setItem("Lang", "ENG")
    location.reload()
})


//-*-*-*-*-*-*-*-* CODE TO SHOW AND HIDE RECIPES -*-*-*-*-*-*-*-*//
//---Old Code in comments below---Vanilla Javascript---//  
//document.getElementById("sformato-carote").addEventListener("click", function GetElementInfo(e){alert("test")})

function ShowHide() {
    $(".recipe").click(function GetElementInfo(e) {
        var recipeId = $(e.target).closest(".recipe") //.closest will navigate up through the parents and find the first item that sattisfies the request 
        var clickClass = e.target.className
        if (clickClass == "close-recipe") {
            //recipeId = e.target.parentNode.parentNode.parentNode.id   //---Old Code---Vanilla Javascript---//  /
            hide(recipeId)
        } else { 
            show(recipeId)
        }

        function show(recipe) {
            recipe.removeClass("hover-class")
            recipe.find(".recipe-main-content").css({ "max-height": "2000px", "padding": "16px" })
            recipe.find(".close-recipe").css("display", "block")
            recipe.find(".recipe-thumbnail").css({ "height": "0", "width": "0", "min-height": "0" })
            
        }
        function hide(recipe) {
            recipe.addClass("hover-class")
            recipe.find(".recipe-main-content").css({ "max-height": "0px", "padding": "0px" })
            recipe.find(".close-recipe").css("display", "none")
            recipe.find(".recipe-thumbnail").css({ "width": "auto", "min-height": "187px", "height": "auto" })
            
        }
    })
    $(".bakery").click(function GetElementInfo(e) {
        var clickClass = e.target.className
        var recipeId = $(e.target).closest(".bakery")
        var Id = $(e.target).closest("[id]").attr('id')
        //.closest will navigate up through the parents and find the first item that sattisfies the request 
        if (clickClass == "recipe-description-p" || clickClass == "recipe-title-h2") {
            //recipeId = e.target.parentNode.parentNode.parentNode.parentNode.id    //---Old Code---Vanilla Javascript---//  
            show(recipeId)
        } else if (clickClass == "bakery-thumbnail") {
            //recipeId = e.target.parentNode.parentNode.id  //---Old Code---Vanilla Javascript---//  
            show(recipeId)
        } else if (clickClass == "close-recipe") {
            //recipeId = e.target.parentNode.parentNode.parentNode.id   //---Old Code---Vanilla Javascript---//  /
            hide(recipeId)
        }
        function show(recipe) {
            recipe.removeClass("hover-class")
            recipe.css({ "max-width": "2000px", "height": "auto" })
            recipe.find(".recipe-main-content").css({ "max-height": "2000px", "padding": "16px" })
            //.find will find the class that we are looking for among the children inside the div with id #recipeId
            recipe.find(".close-recipe").css("display", "block")
            recipe.find(".recipe-thumbnail").css("max-height", "100px")
            recipe.find(".bakery-main-content").css("display", "block")
            $(".bakery").not(recipe).hide()
        }
        function hide(recipe) {
            recipe.addClass("hover-class")
            recipe.css({ "max-width": "240px", "height": "450px" })
            //.find will find the class that we are looking for among the children inside the div with id #recipeId
            recipe.find(".close-recipe").hide()
            recipe.find(".recipe-thumbnail").css("min-width", "240px")
            recipe.find(".recipe-description-p").css("width", "auto")
            recipe.find(".bakery-main-content").hide()
            //recipe.css("transtion","0")

            setTimeout(function () {
                $(".bakery").not(recipe).show()
            }, 500)

        }
    })
}

//Navigation Menu Options Below
var NavMenuEng = ["HOME", "STARTERS & SIDES", "MAINS", "BAKERY", "DESSERTS"]
var NavMenuIta = ["HOME", "ANTIPASTI E CONTORNI", "PRINCIPALI", "LIEVITATI", "DESSERT"]
var NavLinks = ["index", "starters", "maindishes", "bakery", "desserts"]

//function to change the language of the Menu
function PopulateMenu(MenuLang) {
    var navContainer = document.getElementById("nav-menu")
    var ul = document.createElement("ul")
    ul.setAttribute("class", "nav-menu")

    for (var i = 0; i < MenuLang.length; i++) {
        var li = document.createElement("li")
        var a = document.createElement("a")
        a.setAttribute("id", NavLinks[i])
        a.setAttribute("href", NavLinks[i] + ".html")
        a.innerText = MenuLang[i]
        li.appendChild(a)
        ul.appendChild(li)
    }
    navContainer.appendChild(ul)
}
//function that creates the div element for latest Recipe
function FillLatest(collection, lang) {
    var LatestContainer = document.createElement("div") //Container to put latest recipes in
    var recipeContainer = document.createElement("div") //Containerr for each recipe
    recipeContainer.setAttribute("class", "recipe-container")
    var recipeImage = document.createElement("img") //image of recipe
    recipeImage.setAttribute("class", "recipe-image")
    recipeImage.setAttribute("src", "./" + collection.imageUrl) //dynamically set img src
    var generalText = document.createElement("div") //Text are for recipe
    generalText.setAttribute("class", "general-text-box")
    var recipeHead = document.createElement("div") //Header of recipe
    recipeHead.setAttribute("class", "recipe-heading")
    var latestRecipeDate = document.createElement("span") //to ad date inside
    latestRecipeDate.innerText = collection.dateAdded //dynamically get date of recipy
    latestRecipeDate.setAttribute("class", "latest-recipe-date")
    var h2 = document.createElement("h2")
    h2.innerText = collection.title //gdynamically give h2 a title
    var p = document.createElement("p")
    p.innerText = collection.description //dynamically give p the description
    var a = document.createElement("a")
    if (lang == "ENG") {
        a.innerText = "Go to Recipe"
    } else {
        a.innerText = "Vai alla Ricetta"
    }
    a.setAttribute("href", collection.link) //dynamically set href to a tag

    var TemplateContainer = document.getElementById("template-container")

    TemplateContainer.appendChild(LatestContainer)
    LatestContainer.appendChild(recipeContainer)
    recipeContainer.appendChild(recipeImage)
    recipeContainer.appendChild(generalText)
    generalText.appendChild(recipeHead)
    recipeHead.appendChild(latestRecipeDate)
    recipeHead.appendChild(h2)
    generalText.appendChild(p)
    generalText.appendChild(a)
}
function FillRecipe(collection, lang) {
    var container = document.getElementById("template-container") //where we are going to append all the recipes
    var recipe = create("div")
    recipe.setAttribute("class", "recipe hover-class")
    container.appendChild(recipe) //recipe is the main contianer for all info of eachr recipe
    var recipe_tab = create("div")
    recipe_tab.setAttribute("class", "recipe-tab")
    recipe.appendChild(recipe_tab)//appending the tab that will be seen all the time
    var recipe_thumbnail = create("img")
    recipe_thumbnail.setAttribute("class", "recipe-thumbnail")
    recipe_thumbnail.setAttribute("src", "./" + collection.imageUrl) //set image src dynamically
    recipe_tab.appendChild(recipe_thumbnail) //image on left side of tab
    var recipe_description = create("div")
    recipe_description.setAttribute("class", "recipe-description")
    recipe_tab.appendChild(recipe_description) //append box contain recipe info
    var close_recipe = create("span")
    close_recipe.setAttribute("class", "close-recipe")
    if (lang == "ENG") { close_recipe.innerText = "close recipe" }
    else { close_recipe.innerText = "chiudi ricetta" }
    recipe_description.appendChild(close_recipe)//appending the link to close open recipes
    var h2 = create("h2")
    h2.setAttribute("class", "recipe-title-h2")
    h2.innerText = collection.title
    recipe_description.appendChild(h2)
    var p1 = create("p")
    p1.setAttribute("class", "recipe-description-p")
    p1.innerText = collection.description
    recipe_description.appendChild(p1)//adding the short description
    var recipe_main_content = create("div")
    recipe_main_content.setAttribute("class", "recipe-main-content")
    recipe.appendChild(recipe_main_content)//second half of recipe that is hidden until clicked on
    var recipe_ingr_and_img = create("div")
    recipe_ingr_and_img.setAttribute("class", "recipe-ingr-and-img")
    recipe_main_content.appendChild(recipe_ingr_and_img) //text and image appended
    var ingredients_list = create("div")
    ingredients_list.setAttribute("class", "ingredients-list")
    recipe_ingr_and_img.appendChild(ingredients_list)
    var h3 = create("h3")
    if (lang == "ENG") { h3.innerText = "Ingredients" }
    else { h3.innerText = "Ingredienti" }
    ingredients_list.appendChild(h3)
    var ul = create("ul")
    for (var i = 0; i < collection.ingredients.length; i++) {
        var li = document.createElement("li")
        li.innerText = collection.ingredients[i]
        ul.appendChild(li)
    }
    ingredients_list.appendChild(ul) //all ingredients have been added now
    var img = create("img")
    img.setAttribute("src", "./" + collection.imageUrl)
    recipe_ingr_and_img.appendChild(img) //big picture added
    var steps = create("div")
    steps.setAttribute("class", "recipe-steps")
    recipe_main_content.appendChild(steps)
    var h3_steps = create("h3")
    if (lang == "ENG") {
        h3_steps.innerText = "Let's start Cooking!"
    } else {
        h3_steps.innerText = "Ai fornelli!"
    }
    steps.appendChild(h3_steps)
    for (var i = 0; i < collection.steps.length; i++) {
        var p = create("p")
        p.innerText = collection.steps[i]
        steps.appendChild(p)
    }
}
function FillBakery(collection, lang) {
    var container = document.getElementById("template-container") //where we are going to append all the recipes
    var recipe = create("div")
    recipe.setAttribute("class", "bakery hover-class")
    container.appendChild(recipe) //recipe is the main contianer for all info of eachr recipe
    var recipe_tab = create("div")
    recipe_tab.setAttribute("class", "bakery-tab")
    recipe.appendChild(recipe_tab)//appending the tab that will be seen all the time
    var recipe_thumbnail = create("img")
    recipe_thumbnail.setAttribute("class", "bakery-thumbnail")
    recipe_thumbnail.setAttribute("src", "./" + collection.imageUrl) //set image src dynamically
    recipe_tab.appendChild(recipe_thumbnail) //image on left side of tab
    var recipe_description = create("div")
    recipe_description.setAttribute("class", "recipe-description")
    recipe_tab.appendChild(recipe_description) //append box contain recipe info
    var close_recipe = create("span")
    close_recipe.setAttribute("class", "close-recipe")
    if (lang == "ENG") { close_recipe.innerText = "close recipe" }
    else { close_recipe.innerText = "chiudi ricetta" }
    recipe_description.appendChild(close_recipe)//appending the link to close open recipes
    var h2 = create("h2")
    h2.setAttribute("class", "recipe-title-h2")
    h2.innerText = collection.title
    recipe_description.appendChild(h2)
    var p1 = create("p")
    p1.setAttribute("class", "recipe-description-p")
    p1.innerText = collection.description
    recipe_description.appendChild(p1)//adding the short description
    var hide_bottom = create("div")
    hide_bottom.setAttribute("class","after-description")
    recipe_tab.appendChild(hide_bottom)//this is the div that will hide the overscroll
    var recipe_main_content = create("div")
    recipe_main_content.setAttribute("class", "recipe-main-content bakery-main-content")
    recipe.appendChild(recipe_main_content)//second half of recipe that is hidden until clicked on
    var recipe_ingr_and_img = create("div")
    recipe_ingr_and_img.setAttribute("class", "recipe-ingr-and-img")
    recipe_main_content.appendChild(recipe_ingr_and_img) //text and image appended
    var ingredients_list = create("div")
    ingredients_list.setAttribute("class", "ingredients-list")
    recipe_ingr_and_img.appendChild(ingredients_list)
    var h3 = create("h3")
    if (lang == "ENG") { h3.innerText = "Ingredients" }
    else { h3.innerText = "Ingredienti" }
    ingredients_list.appendChild(h3)
    var ul = create("ul")
    for (var i = 0; i < collection.ingredients.length; i++) {
        var li = document.createElement("li")
        li.innerText = collection.ingredients[i]
        ul.appendChild(li)
    }
    ingredients_list.appendChild(ul) //all ingredients have been added now
    var img = create("img")
    img.setAttribute("src", "./" + collection.imageUrl)
    recipe_ingr_and_img.appendChild(img) //big picture added
    var steps = create("div")
    steps.setAttribute("class", "recipe-steps")
    recipe_main_content.appendChild(steps)
    var h3_steps = create("h3")
    if (lang == "ENG") {
        h3_steps.innerText = "Let's start Cooking!"
    } else {
        h3_steps.innerText = "Ai fornelli!"
    }
    steps.appendChild(h3_steps)
    for (var i = 0; i < collection.steps.length; i++) {
        var p = create("p")
        p.innerText = collection.steps[i]
        steps.appendChild(p)
    }
}

//functions to call population that will fill the pages with the appropiate recipes
function PopulateIndex(collection, lang = "ENG") {
    Object.values(collection).forEach(val => {
        FillLatest(val, lang)
    })
    if (lang == "ENG") {
        $("#reach-us").text("Reach Us Also At")
        $("#latest-header").text("Our Latest Recipes")
    } else {
        $("#reach-us").text("Ci Trovate Anche Su")
        $("#latest-header").text("Le Ultime Ricette")
    }
}
function PopulateStarters(collection, lang = "ENG") {
    Object.values(collection).forEach(val => {
        FillRecipe(val, lang)
    })
    if (lang == "ENG") {
        $("#reach-us").text("Reach Us Also At")
        $("#latest-header").text("Our Latest Recipes")
    } else {
        $("#reach-us").text("Ci Trovate Anche Su")
        $("#latest-header").text("Le Ultime Ricette")
    }
}
function PopulateMains(collection, lang = "ENG") {
    Object.values(collection).forEach(val => {
        FillRecipe(val, lang)
    })
    if (lang == "ENG") {
        $("#reach-us").text("Reach Us Also At")
        $("#latest-header").text("Our Latest Recipes")
    } else {
        $("#reach-us").text("Ci Trovate Anche Su")
        $("#latest-header").text("Le Ultime Ricette")
    }
}
function PopulateBakery(collection, lang = "ENG") {
    Object.values(collection).forEach(val => {
        FillBakery(val, lang)
    })
    if (lang == "ENG") {
        $("#reach-us").text("Reach Us Also At")
        $("#latest-header").text("Our Latest Recipes")
    } else {
        $("#reach-us").text("Ci Trovate Anche Su")
        $("#latest-header").text("Le Ultime Ricette")
    }
}

function RemoveChildrenOf(id) {
    var parent = document.getElementById(id)
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

function create(element) {
    return document.createElement(element)
}