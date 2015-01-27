//  Structure: Create object to store selections
// --------------------------------------------------------
	var monster = {
		head: "", 
		body: "", 
		feet: ""
	};

//  Setup: Intialize owl carousel js plugin----------------
// --------------------------------------------------------	
$(document).ready(function() {

	var carousel = $(".owl-carousel");

	//Initialize carousel
	$(carousel).owlCarousel({

	//Carousel settings
	slideSpeed: 300,
	paginationSpeed: 400,
	singleItem: true,
	pagination: false, //remove pagination controls
	rewindNav: false, //don't reset carousel
});

//  Setup: global variables for data of each carousel--------
//  ---------------------------------------------------------
var head = $("#head").data('owlCarousel');
var body = $("#body").data('owlCarousel');
var feet = $("#feet").data('owlCarousel');

//  Events---------------------------------------------------
//  ---------------------------------------------------------
window.addEventListener('resize', calculateHeight);
window.addEventListener('load', calculateHeight);

$(".button").on('click', eventDelegation);
$(".owl-carousel").on("swipeleft mousedown", moveButtonUp);

//  Event Handlers-------------------------------------------
//  ---------------------------------------------------------

function calculateHeight(event) {
	console.log('calculateHeight');
	var sectionHeight = $(".section").height();
	console.log(sectionHeight);
	$('img').css("height", sectionHeight/3);
}

function eventDelegation()  {
	if ($(".button").hasClass("ready"))  {
		start();
	}

	if ($(".button").hasClass("done"))  {
		makeSelection();
	}
}

function start()  {
	head.next();
	$('#head').removeClass("lock");

	$(".button").addClass("done").removeClass("ready");
	moveButtonDown();

	window.setTimeout(changeButton, 400);

	function changeButton() {
			$(".button > p").text("Next"); //Needs a delay
	};	    
}

function makeSelection(event) {
	// Head carousel selected
	if (head.currentItem > 1 && !$('#head > div.owl-wrapper-outer > div.owl-wrapper > div.owl-item > div').hasClass("default")) {
		
		//1. Store head selected in monster object 
		monster.head = head.currentItem;

		//2. Find selected slide, add class "selected"
		var selected = head.currentItem;
		$('#head > div.owl-wrapper-outer > div.owl-wrapper > div.owl-item > div.item-'+selected).addClass("selected");

		//3. Find previous slide from one selected, replace content with default head image		
		var slideNum = head.currentItem - 1; 
		$('#head > div.owl-wrapper-outer > div.owl-wrapper > div.owl-item > div.item-'+slideNum).addClass("default").find("img").attr('src', "images/head-default-color.png");
		//Delete text on slide (if any)
		$('#head > div.owl-wrapper-outer > div.owl-wrapper > div.owl-item > div.item-'+slideNum).find("p").remove();

		//4. Go to previous slide with default head
		window.setTimeout(delayedHeadPrev, 500);

		//5. Advance next carousel
		window.setTimeout(delayedBodyNext, 500);
					
		//6. Remove lock class on next carousel and add lock class on selected carousel
		$('#body').removeClass("lock");
		$('#head').addClass("lock");

		//7. Move done button down
		moveButtonDown();
	}
				
	// Body carousel selected
	if (body.currentItem > 1 && !$('#body > div.owl-wrapper-outer > div.owl-wrapper > div.owl-item > div').hasClass("default"))  {

		//1. Store head selected in monster object 
		monster.body = body.currentItem;

		//2. Find selected slide, add class "selected"
		var selected = body.currentItem;
		$('#body > div.owl-wrapper-outer > div.owl-wrapper > div.owl-item > div.'+selected).addClass("selected");

		//3. Find previous slide from one selected, replace content with default head image	
		var slideNum = body.currentItem-1; 
		$('#body > div.owl-wrapper-outer > div.owl-wrapper > div.owl-item > div.item-'+slideNum).addClass("default").addClass("lock").find("img").attr('src', "images/body-default-color.png");
		//Delete text on slide (if any)
		$('#body > div.owl-wrapper-outer > div.owl-wrapper > div.owl-item > div.item-'+slideNum).find("p").remove();
					
		//4. Go to previous slide with default head
		window.setTimeout(delayedBodyPrev, 500);

		//5. Advance next carousel
		window.setTimeout(delayedFeetNext, 500);

		//6. Remove lock class on next carousel and add lock class on selected carousel
		$('#feet').removeClass("lock");
		$('#body').addClass("lock");

		//7. Move done button down
		moveButtonDown();
	}

	// Feet carousel selected
	if (feet.currentItem > 1 && !$('#feet > div.owl-wrapper-outer > div.owl-wrapper > div.owl-item > div').hasClass("default"))  {
					
		//1. Store head selected in monster object 
		monster.feet = feet.currentItem;

		//2. Find selected slide, add class "selected"
		var selected = feet.currentItem;
		$('#feet > div.owl-wrapper-outer > div.owl-wrapper > div.owl-item > div.'+selected).addClass("selected");

		//3. Find previous slide from one selected, replace content with default head image	
		var slideNum = feet.currentItem-1; 
		$('#feet > div.owl-wrapper-outer > div.owl-wrapper > div.owl-item > div.item-'+slideNum).addClass("default").addClass("lock").find("img").attr('src', "images/feet-default-color.png");
		//Delete text on slide (if any)
		$('#feet > div.owl-wrapper-outer > div.owl-wrapper > div.owl-item > div.item-'+slideNum).find("p").remove();
					
		//4. Go to previous slide with default head
		window.setTimeout(delayedFeetPrev, 500);

		//5. Go to previous slide with default head
		// Unnecessary

		//6. Remove lock class on next carousel and add lock class on selected carousel
		$('#feet').addClass("lock");

		//7. Move done button down
		moveButtonDown();

		//Show what is stored in 
		console.log(monster);

		//8. Call reveal monster function
		window.setTimeout(revealMonster, 400);
	}

};

//  Reveal function -----------------------------------------
//  --------------------------------------------------------- 
function revealMonster() {
	//1. Change "done" button text to "Reveal Monster" and bring it into view
	$(".button").removeClass("done").addClass("reveal");
	$(".button > p").text("Reveal Monster?");
	moveButtonUp();

    //2. When user click's reveal...
    $(".reveal").on('click', function(event) {

    	moveButtonDown();

    	window.setTimeout(delayedHeadNext, 500);
        window.setTimeout(delayedBodyNext, 700);
        window.setTimeout(delayedFeetNext, 900);

        window.setTimeout(playAgain, 1100);

        function playAgain()  {
        	//Change button to "Play Again"
        	$(".button").removeClass("reveal").addClass("restart");
        	$(".button > p").text("Play Again!");

        	moveButtonUp();

        	$(".restart").on('click', restartApp);
            
            function restartApp() {
                location.reload();
			}
        };
	}
)};

//  Delay functions -----------------------------------------
//  ---------------------------------------------------------

function delayedHeadPrev() {
    head.prev();
}

function delayedBodyPrev() {
    body.prev();
}

function delayedFeetPrev() {
    feet.prev();
}

function delayedHeadNext() {
    head.next();
}

function delayedBodyNext() {
    body.next();
}

function delayedFeetNext() {
     feet.next();
}	
});

//  Utility Functions ---------------------------------------
//  ---------------------------------------------------------
function moveButtonUp() {
	if ($(".button").hasClass("movebuttonDown"))
        $(".button").removeClass("movebuttonDown").addClass("movebuttonUp");
    else
        $(".button").addClass("movebuttonUp");
};

function moveButtonDown() {
	if ($(".button").hasClass("movebuttonUp"))
        $(".button").removeClass("movebuttonUp").addClass("movebuttonDown");
    else
        $(".button").addClass("movebuttonDown");
        return;
};

