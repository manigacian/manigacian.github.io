var xp = 0;
var incrementAmount = 0.01;
var power = 0.1;
var money = 0;
var swordBonus = 0;
var cultivationTechnique = 0;
var boostFactor = 1;
var legacyPoints = 0;
var totalXp = 0;
var newLegacyPoints = 0;
var clickPerInterval = 0;
var clickCost = 10;
var baseClickInterval = 1500;
var clickInterval = 1500;
var clickPerSecond = 0;
var clickId = null;
var passiveFights = {

	maxPassiveFights: 1,

	firstFightCost: 10,
	secondFightCost: 50,
	thirdFightCost: 250,
	fourthFightCost: 1250,
	fifthFightCost: 6250,
	sixthFightCost: 31250,
	seventhFightCost: 156250,
	eighthFightCost: 781250,
	ninthFightCost: 3906250,
	tenthFightCost: 19531250,
	eleventhFightCost: 97656250,
	//and so on

	firstFightBought: 0,
	secondFightBought: 0,
	thirdFightBought: 0,
	fourthFightBought: 0,
	fifthFightBought: 0,
	sixthFightBought: 0,
	seventhFightBought: 0,
	eighthFightBought: 0,
	ninthFightBought: 0,
	tenthFightBought: 0,
	eleventhFightBought: 0,
	//and so on

	passFightOneInterval: null,
	passFightTwoInterval: null,
	passFightThreeInterval: null,
	passFightFourInterval: null,
	passFightFiveInterval: null,
	passFightSixInterval: null,
	passFightSevenInterval: null,
	passFightEightInterval: null,
	passFightNineInterval: null,
	passFightTenInterval: null,
	passFightElevenInterval: null
	//and so on

}
var legacyUpgradesBought = {

	legacyUpgradeOne: false,
	legacyUpgradeTwo: false,
	legacyUpgradeThree: false,
	legacyUpgradeFour: false,
	legacyUpgradeFive: false,
	legacyUpgradeSix: false,
	legacyUpgradeSeven: false,
	legacyUpgradeEight: false,
	legacyUpgradeNine: false,
	legacyUpgradeTen: false,
	legacyUpgradeEleven: false,
	legacyUpgradeTwelve: false,
	legacyUpgradeThirteen: false,
	legacyUpgradeFourteen: false,
	legacyUpgradeFifteen: false,
	legacyUpgradeSixteen: false,
	legacyUpgradeSeventeen: false,
	legacyUpgradeEighteen: false,
	legacyUpgradeNineteen: false,
	legacyUpgradeTwenty: false,
	legacyUpgradeTwentyone: false,
	legacyUpgradeTwentytwo: false,
	legacyUpgradeTwentythree: false,
	legacyUpgradeTwentyfour: false,
	legacyUpgradeTwentyfive: false

}

function increaseXp(currentXp, incrementAmount) {

	currentXp = currentXp + (incrementAmount * boostFactor);

	xp = xp + (incrementAmount * boostFactor);

	totalXp = totalXp + (incrementAmount * boostFactor);

	document.getElementById("progress").setAttribute("value", xp);

	document.getElementById("xp").innerHTML = "Xp: " + currentXp.toFixed(3);

	//doAllWinChance();

	if (isAtMax(currentXp, document.getElementById("progress").getAttribute("max")) == true) {

		document.getElementById("rankupButton").setAttribute("style","display: block;");

	}
	if ((isAtMax(currentXp, document.getElementById("progress").getAttribute("max")) == true)&&(legacyUpgradesBought.legacyUpgradeEighteen == true)){

		rankup();

	}

}

function passiveClicks(){

	console.log(1);

	if ((money >= clickCost)&&(clickPerInterval == 0)){

		console.log(2);

		money = money - clickCost;

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		clickCost = clickCost * 2;

		clickPerInterval = 1;

		clickPerSecond = (clickPerInterval / (baseClickInterval / 1000));

		document.getElementById("passiveClickBtn").innerHTML = "Secluded Meditation - " + clickCost + " S.S.";

		var tooltipAnchor = $('#passiveClickBtn');
		tooltipAnchor.attr('data-tooltip', "Gain passive clicks per second - cost: " + clickCost + " spirit stones, current: " + clickPerSecond.toFixed(2) + " cps");
		tooltipAnchor.tooltip();

		clickId = setInterval(function(){

			increaseXp(xp, incrementAmount);

		}, baseClickInterval)

	} else if ((money >= clickCost)&&(clickPerInterval > 0)){

		console.log(3);

		money = money - clickCost;

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		clickCost = clickCost * 2;

		clickPerInterval++;
		clickPerSecond = (clickPerInterval / (baseClickInterval / 1000));

		var tooltipAnchor = $('#passiveClickBtn');
		tooltipAnchor.attr('data-tooltip', "Gain passive clicks per second - cost: " + clickCost + " spirit stones, current: " + clickPerSecond.toFixed(2) + " cps");
		tooltipAnchor.tooltip();

		document.getElementById("passiveClickBtn").innerHTML = "Secluded Meditation - " + clickCost + " S.S.";

		clickInterval = (baseClickInterval / clickPerInterval);

		clearInterval(clickId);

		clickId = setInterval(function(){

			increaseXp(xp, incrementAmount);

		}, clickInterval)

	}

}

function passiveFightOne(){

	if(money >= passiveFights.firstFightCost){

		passiveFights.firstFightBought = passiveFights.firstFightBought + 1;

		money = money - passiveFights.firstFightCost;

		passiveFights.firstFightCost = passiveFights.firstFightCost * 2;

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		if(passiveFights.firstFightBought >= passiveFights.maxPassiveFights) {

			document.getElementById("firstFightPassive").setAttribute("style", "display: none;");

		} else {

			var tooltipAnchor = $('#firstFightPassive');
			tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every second (per upgrade) - " + passiveFights.firstFightCost + " S.S.");
			tooltipAnchor.tooltip();

		}

		clearInterval(passiveFights.passFightOneInterval);

		passiveFights.passFightOneInterval = setInterval(function(){

		Fight("firstFight");

	}, (1000 / passiveFights.firstFightBought));

	}
}

function passiveFightTwo(){

	if(money >= passiveFights.secondFightCost){

		passiveFights.secondFightBought = passiveFights.secondFightBought + 1;

		money = money - passiveFights.secondFightCost;

		passiveFights.secondFightCost = passiveFights.secondFightCost * 2;

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		if(passiveFights.secondFightBought >= passiveFights.maxPassiveFights) {

			document.getElementById("secondFightPassive").setAttribute("style", "display: none;");

		} else {

			var tooltipAnchor = $('#secondFightPassive');
			tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every 2 seconds (per upgrade) - " + passiveFights.secondFightCost + " S.S.");
			tooltipAnchor.tooltip();

		}

		clearInterval(passiveFights.passFightTwoInterval);

		passiveFights.passFightTwoInterval = setInterval(function(){

		Fight("secondFight");

	}, (2000 / passiveFights.secondFightBought));

	}
}

function passiveFightThree(){

	if(money >= passiveFights.thirdFightCost){

		passiveFights.thirdFightBought = passiveFights.thirdFightBought + 1;

		money = money - passiveFights.thirdFightCost;

		passiveFights.thirdFightCost = passiveFights.thirdFightCost * 2;

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		if(passiveFights.thirdFightBought >= passiveFights.maxPassiveFights) {

			document.getElementById("thirdFightPassive").setAttribute("style", "display: none;");

		} else {

			var tooltipAnchor = $('#thirdFightPassive');
			tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every 3 seconds (per upgrade) - " + passiveFights.thirdFightCost + " S.S.");
			tooltipAnchor.tooltip();

		}

		clearInterval(passiveFights.passFightThreeInterval);

		passiveFights.passFightThreeInterval = setInterval(function(){

		Fight("thirdFight");

	}, (3000 / passiveFights.thirdFightBought));

	}
}

function passiveFightFour(){

	if(money >= passiveFights.fourthFightCost){

		passiveFights.fourthFightBought = passiveFights.fourthFightBought + 1;

		money = money - passiveFights.fourthFightCost;

		passiveFights.fourthFightCost = passiveFights.fourthFightCost * 2;

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		if(passiveFights.fourthFightBought >= passiveFights.maxPassiveFights) {

			document.getElementById("fourthFightPassive").setAttribute("style", "display: none;");

		} else {

			var tooltipAnchor = $('#fourthFightPassive');
			tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every 4 seconds (per upgrade) - " + passiveFights.fourthFightCost + " S.S.");
			tooltipAnchor.tooltip();

		}

		clearInterval(passiveFights.passFightFourInterval);

		passiveFights.passFightFourInterval = setInterval(function(){

		Fight("fourthFight");

	}, (4000 / passiveFights.fourthFightBought));

	}
}

function passiveFightFive(){

	if(money >= passiveFights.fifthFightCost){

		passiveFights.fifthFightBought = passiveFights.fifthFightBought + 1;

		money = money - passiveFights.fifthFightCost;

		passiveFights.fifthFightCost = passiveFights.fifthFightCost * 2;

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		if(passiveFights.fifthFightBought >= passiveFights.maxPassiveFights) {

			document.getElementById("fifthFightPassive").setAttribute("style", "display: none;");

		} else {

			var tooltipAnchor = $('#fifthFightPassive');
			tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every 5 seconds (per upgrade) - " + passiveFights.fifthFightCost + " S.S.");
			tooltipAnchor.tooltip();

		}

		clearInterval(passiveFights.passFightFiveInterval);

		passiveFights.passFightFiveInterval = setInterval(function(){

		Fight("fifthFight");

	}, (5000 / passiveFights.fifthFightBought));

	}
}

function passiveFightSix(){

	if(money >= passiveFights.sixthFightCost){

		passiveFights.sixthFightBought = passiveFights.sixthFightBought + 1;

		money = money - passiveFights.sixthFightCost;

		passiveFights.sixthFightCost = passiveFights.sixthFightCost * 2;

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		if(passiveFights.sixthFightBought >= passiveFights.maxPassiveFights) {

			document.getElementById("sixthFightPassive").setAttribute("style", "display: none;");

		} else {

			var tooltipAnchor = $('#sixthFightPassive');
			tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every 6 seconds (per upgrade) - " + passiveFights.sixthFightCost + " S.S.");
			tooltipAnchor.tooltip();

		}

		clearInterval(passiveFights.passFightSixInterval);

		passiveFights.passFightSixInterval = setInterval(function(){

		Fight("sixthFight");

	}, (6000 / passiveFights.sixthFightBought));

	}
}

function passiveFightSeven(){

	if(money >= passiveFights.seventhFightCost){

		passiveFights.seventhFightBought = passiveFights.seventhFightBought + 1;

		money = money - passiveFights.seventhFightCost;

		passiveFights.seventhFightCost = passiveFights.seventhFightCost * 2;

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		if(passiveFights.seventhFightBought >= passiveFights.maxPassiveFights) {

			document.getElementById("seventhFightPassive").setAttribute("style", "display: none;");

		} else {

			var tooltipAnchor = $('#seventhFightPassive');
			tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every 7 seconds (per upgrade) - " + passiveFights.seventhFightCost + " S.S.");
			tooltipAnchor.tooltip();

		}

		clearInterval(passiveFights.passFightSevenInterval);

		passiveFights.passFightSevenInterval = setInterval(function(){

		Fight("seventhFight");

	}, (7000 / passiveFights.seventhFightBought));

	}
}

function passiveFightEight(){

	if(money >= passiveFights.eighthFightCost){

		passiveFights.eighthFightBought = passiveFights.eighthFightBought + 1;

		money = money - passiveFights.eighthFightCost;

		passiveFights.eighthFightCost = passiveFights.eighthFightCost * 2;

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		if(passiveFights.eighthFightBought >= passiveFights.maxPassiveFights) {

			document.getElementById("eighthFightPassive").setAttribute("style", "display: none;");

		} else {

			var tooltipAnchor = $('#eighthFightPassive');
			tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every 8 seconds (per upgrade) - " + passiveFights.eighthFightCost + " S.S.");
			tooltipAnchor.tooltip();

		}

		clearInterval(passiveFights.passFightEightInterval);

		passiveFights.passFightEightInterval = setInterval(function(){

		Fight("eighthFight");

	}, (8000 / passiveFights.eighthFightBought));

	}
}

function passiveFightNine(){

	if(money >= passiveFights.ninthFightCost){

		passiveFights.ninthFightBought = passiveFights.ninthFightBought + 1;

		money = money - passiveFights.ninthFightCost;

		passiveFights.ninthFightCost = passiveFights.ninthFightCost * 2;

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		if(passiveFights.ninthFightBought >= passiveFights.maxPassiveFights) {

			document.getElementById("ninthFightPassive").setAttribute("style", "display: none;");

		} else {

			var tooltipAnchor = $('#ninthFightPassive');
			tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every 9 seconds (per upgrade) - " + passiveFights.ninthFightCost + " S.S.");
			tooltipAnchor.tooltip();

		}

		clearInterval(passiveFights.passFightNineInterval);

		passiveFights.passFightNineInterval = setInterval(function(){

		Fight("ninthFight");

	}, (9000 / passiveFights.ninthFightBought));

	}
}

function passiveFightTen(){

	if(money >= passiveFights.tenthFightCost){

		passiveFights.tenthFightBought = passiveFights.tenthFightBought + 1;

		money = money - passiveFights.tenthFightCost;

		passiveFights.tenthFightCost = passiveFights.tenthFightCost * 2;

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		if(passiveFights.tenthFightBought >= passiveFights.maxPassiveFights) {

			document.getElementById("tenthFightPassive").setAttribute("style", "display: none;");

		} else {

			var tooltipAnchor = $('#tenthFightPassive');
			tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every 10 seconds (per upgrade) - " + passiveFights.tenthFightCost + " S.S.");
			tooltipAnchor.tooltip();

		}

		clearInterval(passiveFights.passFightTenInterval);

		passiveFights.passFightTenInterval = setInterval(function(){

		Fight("tenthFight");

	}, (10000 / passiveFights.tenthFightBought));

	}
}

function passiveFightEleven(){

	if(money >= passiveFights.eleventhFightCost){

		passiveFights.eleventhFightBought = passiveFights.eleventhFightBought + 1;

		money = money - passiveFights.eleventhFightCost;

		passiveFights.eleventhFightCost = passiveFights.eleventhFightCost * 2;

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		if(passiveFights.eleventhFightBought >= passiveFights.maxPassiveFights) {

			document.getElementById("eleventhFightPassive").setAttribute("style", "display: none;");

		} else {

			var tooltipAnchor = $('#eleventhFightPassive');
			tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every 11 seconds (per upgrade) - " + passiveFights.eleventhFightCost + " S.S.");
			tooltipAnchor.tooltip();

		}

		clearInterval(passiveFights.passFightElevenInterval);

		passiveFights.passFightElevenInterval = setInterval(function(){

		Fight("eleventhFight");

	}, (11000 / passiveFights.eleventhFightBought));

	}
}

function rankup(){

	if (isAtMax(xp, document.getElementById("progress").getAttribute("max")) == true) {

		document.getElementById("rankupButton").setAttribute("style", "display: none;");

		document.getElementById("progress").setAttribute("value", (document.getElementById("progress").getAttribute("value") - document.getElementById("progress").getAttribute("max")));

		xp = xp - document.getElementById("progress").getAttribute("max");

		document.getElementById("xp").innerHTML = "Xp: " + xp.toFixed(3);

		rankPowerChange();

		if (document.getElementById("currentRealm").innerHTML == "Late Xiantian"){

			legacyUnlock();

		}

		increaseMax(document.getElementById("progress").getAttribute("max"));
		document.getElementById("progress").setAttribute("value", xp);
		imageChange();

		if (isAtMax(xp, document.getElementById("progress").getAttribute("max")) == true) {

			document.getElementById("rankupButton").setAttribute("style","display: block;");

		}

	}
}

function legacy(){

	console.log("Changing Background Values");
	legacyPoints = legacyPoints + newLegacyPoints;
	xp = 0;
	incrementAmount = 0.01;
	power = 0.1;
	money = 0;
	swordBonus = 0;
	cultivationTechnique = 0;
	totalXp = 0;
	newLegacyPoints = 0;
	clickCost = 10;
	baseClickInterval = 1500;
	clickInterval = 1500;
	clickPerInterval = 0;
	clickperSecond = 0;
	passiveFights.maxPassiveFights = 1;
	legacyScreenUpdate();
	calculateLegacyBoost();
	legacyUpgrades();

}

function legacyScreenUpdate(){

	console.log("Updating Screen");
	document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);
	document.getElementById("newLegacyPoints").innerHTML = "Legacy Points (Gained Upon Reset): " + newLegacyPoints;
	document.getElementById("xp").innerHTML = "XP: " + xp;
	document.getElementById("currentRealm").innerHTML = "Mortal";
	document.getElementById("progress").setAttribute("value", "0");
	document.getElementById("progress").setAttribute("max", "1");
	document.getElementById("rankupButton").setAttribute("style", "display: none;");
	document.getElementById("currentPower").innerHTML = "Power: " + power;
	document.getElementById("money").innerHTML = "Spirit Stones: " + money;
	document.getElementById("meditate").src = "Assets/monk/transparent/monktransparent.png";
	document.getElementById("passiveClickBtn").innerHTML = "Secluded Meditation - " + clickCost + " S.S.";
	if (clickId != null){ clearInterval(clickId); }
	var tooltipAnchor = $('#passiveClickBtn');
	tooltipAnchor.attr('data-tooltip', "Gain passive clicks per second - cost: " + clickCost + " spirit stones, current: " + clickPerSecond + " cps");
	tooltipAnchor.tooltip();

	passiveFights.firstFightCost = 10;
	passiveFights.secondFightCost = 50;
	passiveFights.thirdFightCost = 250;
	passiveFights.fourthFightCost = 1250;
	passiveFights.fifthFightCost = 6250;
	passiveFights.sixthFightCost = 31250;
	passiveFights.seventhFightCost = 156250;
	passiveFights.eighthFightCost = 781250;
	passiveFights.ninthFightCost = 3906250;
	passiveFights.tenthFightCost = 19531250;
	passiveFights.eleventhFightCost = 97656250;

	passiveFights.firstFightBought = 0;
	passiveFights.secondFightBought = 0;
	passiveFights.thirdFightBought = 0;
	passiveFights.fourthFightBought = 0;
	passiveFights.fifthFightBought = 0;
	passiveFights.sixthFightBought = 0;
	passiveFights.seventhFightBought = 0;
	passiveFights.eighthFightBought = 0;
	passiveFights.ninthFightBought = 0;
	passiveFights.tenthFightBought = 0;
	passiveFights.eleventhFightBought = 0;

	var tooltipAnchor = $('#firstFightPassive');
	tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every second (per upgrade) - " + passiveFights.firstFightCost + " S.S.");
	tooltipAnchor.tooltip();
	var tooltipAnchor = $('#secondFightPassive');
	tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every second (per upgrade) - " + passiveFights.secondFightCost + " S.S.");
	tooltipAnchor.tooltip();
	var tooltipAnchor = $('#thirdFightPassive');
	tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every second (per upgrade) - " + passiveFights.thirdFightCost + " S.S.");
	tooltipAnchor.tooltip();
	var tooltipAnchor = $('#fourthFightPassive');
	tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every second (per upgrade) - " + passiveFights.fourthFightCost + " S.S.");
	tooltipAnchor.tooltip();
	var tooltipAnchor = $('#fifthFightPassive');
	tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every second (per upgrade) - " + passiveFights.fifthFightCost + " S.S.");
	tooltipAnchor.tooltip();
	var tooltipAnchor = $('#sixthFightPassive');
	tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every second (per upgrade) - " + passiveFights.sixthFightCost + " S.S.");
	tooltipAnchor.tooltip();
	var tooltipAnchor = $('#seventhFightPassive');
	tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every second (per upgrade) - " + passiveFights.seventhFightCost + " S.S.");
	tooltipAnchor.tooltip();
	var tooltipAnchor = $('#eighthFightPassive');
	tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every second (per upgrade) - " + passiveFights.eighthFightCost + " S.S.");
	tooltipAnchor.tooltip();
	var tooltipAnchor = $('#ninthFightPassive');
	tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every second (per upgrade) - " + passiveFights.ninthFightCost + " S.S.");
	tooltipAnchor.tooltip();
	var tooltipAnchor = $('#tenthFightPassive');
	tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every second (per upgrade) - " + passiveFights.tenthFightCost + " S.S.");
	tooltipAnchor.tooltip();
	var tooltipAnchor = $('#eleventhFightPassive');
	tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every second (per upgrade) - " + passiveFights.eleventhFightCost + " S.S.");
	tooltipAnchor.tooltip();

	if (passiveFights.passFightOneInterval != null){

		clearInterval(passiveFights.passFightOneInterval);

	}
	if (passiveFights.passFightTwoInterval != null){

		clearInterval(passiveFights.passFightTwoInterval);

	}
	if (passiveFights.passFightThreeInterval != null){

		clearInterval(passiveFights.passFightThreeInterval);

	}
	if (passiveFights.passFightFourInterval != null){

		clearInterval(passiveFights.passFightFourInterval);

	}
	if (passiveFights.passFightFiveInterval != null){

		clearInterval(passiveFights.passFightFiveInterval);

	}
	if (passiveFights.passFightSixInterval != null){

		clearInterval(passiveFights.passFightSixInterval);

	}
	if (passiveFights.passFightSevenInterval != null){

		clearInterval(passiveFights.passFightSevenInterval);

	}
	if (passiveFights.passFightEightInterval != null){

		clearInterval(passiveFights.passFightEightInterval);

	}
	if (passiveFights.passFightNineInterval != null){

		clearInterval(passiveFights.passFightNineInterval);

	}
	if (passiveFights.passFightTenInterval != null){

		clearInterval(passiveFights.passFightTenInterval);

	}
	if (passiveFights.passFightElevenInterval != null){

		clearInterval(passiveFights.passFightElevenInterval);

	}

	document.getElementById("firstFightPassive").setAttribute("style", "display: block;");
	document.getElementById("secondFightPassive").setAttribute("style", "display: block;");
	document.getElementById("thirdFightPassive").setAttribute("style", "display: block;");
	document.getElementById("fourthFightPassive").setAttribute("style", "display: block;");
	document.getElementById("fifthFightPassive").setAttribute("style", "display: block;");
	document.getElementById("sixthFightPassive").setAttribute("style", "display: block;");
	document.getElementById("seventhFightPassive").setAttribute("style", "display: block;");
	document.getElementById("eighthFightPassive").setAttribute("style", "display: block;");
	document.getElementById("ninthFightPassive").setAttribute("style", "display: block;");
	document.getElementById("tenthFightPassive").setAttribute("style", "display: block;");
	document.getElementById("eleventhFightPassive").setAttribute("style", "display: block;");

	document.getElementById("firstTrainCost").innerHTML = 1;
	document.getElementById("secondTrainCost").innerHTML = 10;
	document.getElementById("thirdTrainCost").innerHTML = 100;
	document.getElementById("fourthTrainCost").innerHTML = 1000;
	document.getElementById("fifthTrainCost").innerHTML = 10000;
	document.getElementById("sixthTrainCost").innerHTML = 100000;
	document.getElementById("seventhTrainCost").innerHTML = 1000000;
	document.getElementById("eighthTrainCost").innerHTML = 10000000;
	document.getElementById("ninthTrainCost").innerHTML = 100000000;
	document.getElementById("tenthTrainCost").innerHTML = 1000000000;
	document.getElementById("eleventhTrainCost").innerHTML = 10000000000;

	document.getElementById("firstPurchaseRow").setAttribute("style", "");
	document.getElementById("secondPurchaseRow").setAttribute("style", "");
	document.getElementById("thirdPurchaseRow").setAttribute("style", "");
	document.getElementById("fourthPurchaseRow").setAttribute("style", "");
	document.getElementById("fifthPurchaseRow").setAttribute("style", "");
	document.getElementById("sixthPurchaseRow").setAttribute("style", "");
	document.getElementById("seventhPurchaseRow").setAttribute("style", "display: none;");
	document.getElementById("eighthPurchaseRow").setAttribute("style", "display: none;");
	document.getElementById("ninthPurchaseRow").setAttribute("style", "display: none;");
	document.getElementById("tenthPurchaseRow").setAttribute("style", "display: none;");
	document.getElementById("eleventhPurchaseRow").setAttribute("style", "display: none;");
}

function legacyUpgrades() {

	if ((legacyUpgradesBought.legacyUpgradeOne == true)||(legacyUpgradesBought.legacyUpgradeOne == "true")){

		passiveFights.maxPassiveFights = passiveFights.maxPassiveFights + 2;

		document.getElementById("firstLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeTwo == true)||(legacyUpgradesBought.legacyUpgradeTwo == "true")){

		money = money + parseInt(document.getElementById("firstPurchaseCost").innerHTML);

		firstSwordPurchase();

		document.getElementById("secondLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeThree == true)||(legacyUpgradesBought.legacyUpgradeThree == "true")){

		money = money + parseInt(document.getElementById("secondPurchaseCost").innerHTML);

		firstManualPurchase();

		document.getElementById("thirdLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeFour == true)||(legacyUpgradesBought.legacyUpgradeFour == "true")){

		money = money + parseInt(document.getElementById("thirdPurchaseCost").innerHTML);

		firstCultivationPurchase();

		document.getElementById("fourthLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeFive == true)||(legacyUpgradesBought.legacyUpgradeFive == "true")){

		document.getElementById("seventhPurchaseRow").setAttribute("style", "");
		document.getElementById("eighthPurchaseRow").setAttribute("style", "");
		document.getElementById("ninthPurchaseRow").setAttribute("style", "");

		document.getElementById("fifthLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeSix == true)||(legacyUpgradesBought.legacyUpgradeSix == "true")){

		passiveFights.maxPassiveFights = passiveFights.maxPassiveFights + 2;

		document.getElementById("sixthLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeSeven == true)||(legacyUpgradesBought.legacyUpgradeSeven == "true")){

		money = money + parseInt(document.getElementById("fourthPurchaseCost").innerHTML);

		secondSwordPurchase();

		document.getElementById("seventhLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeEight == true)||(legacyUpgradesBought.legacyUpgradeEight == "true")){

		money = money + parseInt(document.getElementById("fifthPurchaseCost").innerHTML);

		secondManualPurchase();

		document.getElementById("eighthLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeNine == true)||(legacyUpgradesBought.legacyUpgradeNine == "true")){

		money = money + parseInt(document.getElementById("sixthPurchaseCost").innerHTML);

		secondCultivationPurchase();

		document.getElementById("ninthLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeTen == true)||(legacyUpgradesBought.legacyUpgradeTen == "true")){

		document.getElementById("eighthFightRow").setAttribute("style", "");
		document.getElementById("ninthFightRow").setAttribute("style", "");

		document.getElementById("tenthLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeEleven == true)||(legacyUpgradesBought.legacyUpgradeEleven == "true")){

		document.getElementById("eighthTrainRow").setAttribute("style", "");
		document.getElementById("ninthTrainRow").setAttribute("style", "");

		document.getElementById("eleventhLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeTwelve == true)||(legacyUpgradesBought.legacyUpgradeTwelve == "true")){

		passiveFights.maxPassiveFights = passiveFights.maxPassiveFights + 2;

		document.getElementById("twelfthLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeThirteen == true)||(legacyUpgradesBought.legacyUpgradeThirteen == "true")){

		money = money + parseInt(document.getElementById("seventhPurchaseCost").innerHTML);

		thirdSwordPurchase();

		document.getElementById("thirteenthLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeFourteen == true)||(legacyUpgradesBought.legacyUpgradeFourteen == "true")){

		money = money + parseInt(document.getElementById("eighthPurchaseCost").innerHTML);

		thirdManualPurchase();

		document.getElementById("fourteenthLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeFifteen == true)||(legacyUpgradesBought.legacyUpgradeFifteen == "true")){

		money = money + parseInt(document.getElementById("ninthPurchaseCost").innerHTML);

		thirdCultivationPurchase();

		document.getElementById("fifteenthLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeSixteen == true)||(legacyUpgradesBought.legacyUpgradeSixteen == "true")){

		document.getElementById("tenthPurchaseRow").setAttribute("style", "");
		document.getElementById("eleventhPurchaseRow").setAttribute("style", "");
		document.getElementById("twelfthPurchaseRow").setAttribute("style", "");

		document.getElementById("sixteenthLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeSeventeen == true)||(legacyUpgradesBought.legacyUpgradeSeventeen == "true")){

		passiveFights.maxPassiveFights = passiveFights.maxPassiveFights + 2;

		document.getElementById("seventeenthLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeEighteen == true)||(legacyUpgradesBought.legacyUpgradeEighteen == "true")){

		document.getElementById("eighteenthLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeNineteen == true)||(legacyUpgradesBought.legacyUpgradeNineteen == "true")){

		document.getElementById("tenthFightRow").setAttribute("style", "");
		document.getElementById("eleventhFightRow").setAttribute("style", "");

		document.getElementById("nineteenthLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeTwenty == true)||(legacyUpgradesBought.legacyUpgradeTwenty == "true")){

		document.getElementById("tenthTrainRow").setAttribute("style", "");
		document.getElementById("eleventhTrainRow").setAttribute("style", "");

		document.getElementById("twentiethLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeTwentyone == true)||(legacyUpgradesBought.legacyUpgradeTwentyone == "true")){

		passiveFights.maxPassiveFights = passiveFights.maxPassiveFights + 2;

		document.getElementById("twentyfirstLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeTwentytwo == true)||(legacyUpgradesBought.legacyUpgradeTwentytwo == "true")){

		money = money + parseInt(document.getElementById("tenthPurchaseCost").innerHTML);

		fourthSwordPurchase();

		document.getElementById("twentysecondLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeTwentythree == true)||(legacyUpgradesBought.legacyUpgradeTwentythree == "true")){

		money = money + parseInt(document.getElementById("eleventhPurchaseCost").innerHTML);

		fourthManualPurchase();

		document.getElementById("twentythirdLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeTwentyfour == true)||(legacyUpgradesBought.legacyUpgradeTwentyfour == "true")){

		money = money + parseInt(document.getElementById("twelfthPurchaseCost").innerHTML);

		fourthCultivationPurchase();

		document.getElementById("twentyfourthLegacyRow").setAttribute("style", "display: none;");

	}
	if ((legacyUpgradesBought.legacyUpgradeTwentyfive == true)||(legacyUpgradesBought.legacyUpgradeTwentyfive == "true")){

		document.getElementById("thirteenthPurchaseRow").setAttribute("style", "");
		document.getElementById("fourteenthPurchaseRow").setAttribute("style", "");
		document.getElementById("fifteenthPurchaseRow").setAttribute("style", "");

		document.getElementById("twentyfifthLegacyRow").setAttribute("style", "display: none;");

	}
}

function legacyAutoFightOnePurchase() {

	if (legacyPoints >= document.getElementById("firstAutoFightLegacyCost").innerHTML){

		document.getElementById("firstLegacyRow").setAttribute("style", "display: none;");

		legacyPoints = legacyPoints - document.getElementById("firstAutoFightLegacyCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		passiveFights.maxPassiveFights = 3;

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeOne = true;

	}

}

function legacySwordPermOnePurchase() {

	if (legacyPoints >= document.getElementById("firstSwordPermCost").innerHTML){

		document.getElementById("secondLegacyRow").setAttribute("style", "display: none;");

		legacyPoints = legacyPoints - document.getElementById("firstSwordPermCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		if (document.getElementById("firstPurchaseRow").getAttribute("style") == "") {

			money = money + parseInt(document.getElementById("firstPurchaseCost").innerHTML);

			firstSwordPurchase();

		}

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeTwo = true;

	}
}

function legacyManualPermOnePurchase() {

	if (legacyPoints >= document.getElementById("firstManualPermCost").innerHTML){

		document.getElementById("thirdLegacyRow").setAttribute("style", "display: none;");

		legacyPoints = legacyPoints - document.getElementById("firstManualPermCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		if (document.getElementById("secondPurchaseRow").getAttribute("style") == "") {

			money = money + parseInt(document.getElementById("secondPurchaseCost").innerHTML);

			firstManualPurchase();

		}

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeThree = true;

	}

}

function legacyCultivationPermOnePurchase() {

	if (legacyPoints >= document.getElementById("firstCultivationPermCost").innerHTML){

		document.getElementById("fourthLegacyRow").setAttribute("style", "display: none;");

		legacyPoints = legacyPoints - document.getElementById("firstCultivationPermCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		if (document.getElementById("thirdPurchaseRow").getAttribute("style") == "") {

			money = money + parseInt(document.getElementById("thirdPurchaseCost").innerHTML);

			firstCultivationPurchase();

		}

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeFour = true;

	}

}

function legacyShopOnePurchase() {

	if (legacyPoints >= document.getElementById("firstLegacyExtraShopCost").innerHTML){

		document.getElementById("fifthLegacyRow").setAttribute("style", "display: none;");

		legacyPoints = legacyPoints - document.getElementById("firstLegacyExtraShopCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		document.getElementById("seventhPurchaseRow").setAttribute("style", "");
		document.getElementById("eighthPurchaseRow").setAttribute("style", "");
		document.getElementById("ninthPurchaseRow").setAttribute("style", "");

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeFive = true;

	}

}

function legacyAutoFightTwoPurchase() {

	if (legacyPoints >= document.getElementById("secondAutoFightLegacyCost").innerHTML){

		document.getElementById("sixthLegacyRow").setAttribute("style", "display: none;");

		legacyPoints = legacyPoints - document.getElementById("secondAutoFightLegacyCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		passiveFights.maxPassiveFights = passiveFights.maxPassiveFights + 2;

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeSix = true;

	}

}

function legacySwordPermTwoPurchase() {

	if (legacyPoints >= document.getElementById("secondSwordPermCost").innerHTML){

		document.getElementById("seventhLegacyRow").setAttribute("style", "display: none;");

		legacyPoints = legacyPoints - document.getElementById("secondSwordPermCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		if (document.getElementById("fourthPurchaseRow").getAttribute("style") == "") {

			money = money + parseInt(document.getElementById("fourthPurchaseCost").innerHTML);

			secondSwordPurchase();

		}

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeSeven = true;

	}
}

function legacyManualPermTwoPurchase(){

	if (legacyPoints >= document.getElementById("secondManualPermCost").innerHTML){

		document.getElementById("eighthLegacyRow").setAttribute("style", "display: none;");

		legacyPoints = legacyPoints - document.getElementById("secondManualPermCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		if (document.getElementById("fifthPurchaseRow").getAttribute("style") == "") {

			money = money + parseInt(document.getElementById("fifthPurchaseCost").innerHTML);

			secondManualPurchase();

		}

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeEight = true;

	}

}

function legacyCultivationPermTwoPurchase() {

	if (legacyPoints >= document.getElementById("secondCultivationPermCost").innerHTML){

		document.getElementById("ninthLegacyRow").setAttribute("style", "display: none;");

		legacyPoints = legacyPoints - document.getElementById("secondCultivationPermCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		if (document.getElementById("sixthPurchaseRow").getAttribute("style") == "") {

			money = money + parseInt(document.getElementById("sixthPurchaseCost").innerHTML);

			secondCultivationPurchase();

		}

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeNine = true;

	}

}

function legacyExtraFightOnePurchase(){

	if (legacyPoints >= document.getElementById("firstLegacyExtraFightCost").innerHTML){

		legacyPoints = legacyPoints - document.getElementById("firstLegacyExtraFightCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		document.getElementById("tenthLegacyRow").setAttribute("style", "display: none;");

		document.getElementById("eighthFightRow").setAttribute("style", "");
		document.getElementById("ninthFightRow").setAttribute("style", "");

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeTen = true;

	}

}

function legacyExtraTrainOnePurchase(){

	if (legacyPoints >= document.getElementById("firstLegacyExtraTrainCost").innerHTML){

		legacyPoints = legacyPoints - document.getElementById("firstLegacyExtraTrainCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		document.getElementById("eleventhLegacyRow").setAttribute("style", "display: none;");

		document.getElementById("eighthTrainRow").setAttribute("style", "");
		document.getElementById("ninthTrainRow").setAttribute("style", "");

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeEleven = true;

	}

}

function legacyAutoFightThreePurchase() {

	if (legacyPoints >= document.getElementById("thirdAutoFightLegacyCost").innerHTML){

		document.getElementById("twelfthLegacyRow").setAttribute("style", "display: none;");

		legacyPoints = legacyPoints - document.getElementById("thirdAutoFightLegacyCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		passiveFights.maxPassiveFights = passiveFights.maxPassiveFights + 2;

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeTwelve = true;

	}

}

function legacySwordPermThreePurchase() {

	if (legacyPoints >= document.getElementById("thirdSwordPermCost").innerHTML){

		document.getElementById("thirteenthLegacyRow").setAttribute("style", "display: none;");

		legacyPoints = legacyPoints - document.getElementById("thirdSwordPermCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		if (document.getElementById("seventhPurchaseRow").getAttribute("style") == "") {

			money = money + parseInt(document.getElementById("seventhPurchaseCost").innerHTML);

			thirdSwordPurchase();

		}

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeThirteen = true;

	}
}

function legacyManualPermThreePurchase() {

	if (legacyPoints >= document.getElementById("thirdManualPermCost").innerHTML){

		document.getElementById("fourteenthLegacyRow").setAttribute("style", "display: none;");

		legacyPoints = legacyPoints - document.getElementById("thirdManualPermCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		if (document.getElementById("eighthPurchaseRow").getAttribute("style") == "") {

			money = money + parseInt(document.getElementById("eighthPurchaseCost").innerHTML);

			thirdManualPurchase();

		}

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeFourteen = true;

	}

}

function legacyCultivationPermThreePurchase() {

	if (legacyPoints >= document.getElementById("thirdCultivationPermCost").innerHTML){

		document.getElementById("fifteenthLegacyRow").setAttribute("style", "display: none;");

		legacyPoints = legacyPoints - document.getElementById("thirdCultivationPermCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		if (document.getElementById("ninthPurchaseRow").getAttribute("style") == "") {

			money = money + parseInt(document.getElementById("ninthPurchaseCost").innerHTML);

			thirdCultivationPurchase();

		}

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeFifteen = true;

	}

}

function legacyShopTwoPurchase() {

	if (legacyPoints >= document.getElementById("secondLegacyExtraShopCost").innerHTML){

		document.getElementById("sixteenthLegacyRow").setAttribute("style", "display: none;");

		legacyPoints = legacyPoints - document.getElementById("secondLegacyExtraShopCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		document.getElementById("tenthPurchaseRow").setAttribute("style", "");
		document.getElementById("eleventhPurchaseRow").setAttribute("style", "");
		document.getElementById("twelfthPurchaseRow").setAttribute("style", "");

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeSixteen = true;

	}

}

function legacyAutoFightFourPurchase() {

	if (legacyPoints >= document.getElementById("fourthAutoFightLegacyCost").innerHTML){

		document.getElementById("seventeenthLegacyRow").setAttribute("style", "display: none;");

		legacyPoints = legacyPoints - document.getElementById("fourthAutoFightLegacyCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		passiveFights.maxPassiveFights = passiveFights.maxPassiveFights + 2;

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeSeventeen = true;

	}

}

function autoRankupPurchase() {

	if (legacyPoints >= document.getElementById("autoRankupCost").innerHTML){

		legacyPoints = legacyPoints - document.getElementById("autoRankupCost").innerHTML;

		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		document.getElementById("eighteenthLegacyRow").setAttribute("style", "display: none;");

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeEighteen = true;

	}

}

function legacyExtraFightTwoPurchase(){

	if (legacyPoints >= document.getElementById("secondLegacyExtraFightCost").innerHTML){

		legacyPoints = legacyPoints - document.getElementById("secondLegacyExtraFightCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		document.getElementById("nineteenthLegacyRow").setAttribute("style", "display: none;");

		document.getElementById("tenthFightRow").setAttribute("style", "");
		document.getElementById("eleventhFightRow").setAttribute("style", "");

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeNineteen = true;

	}

}

function legacyExtraTrainTwoPurchase(){

	if (legacyPoints >= document.getElementById("secondLegacyExtraTrainCost").innerHTML){

		legacyPoints = legacyPoints - document.getElementById("secondLegacyExtraTrainCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		document.getElementById("twentiethLegacyRow").setAttribute("style", "display: none;");

		document.getElementById("tenthTrainRow").setAttribute("style", "");
		document.getElementById("eleventhTrainRow").setAttribute("style", "");

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeTwenty = true;

	}

}

function legacyAutoFightFivePurchase() {

	if (legacyPoints >= document.getElementById("fifthAutoFightLegacyCost").innerHTML){

		document.getElementById("twentyfirstLegacyRow").setAttribute("style", "display: none;");

		legacyPoints = legacyPoints - document.getElementById("fifthAutoFightLegacyCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		passiveFights.maxPassiveFights = passiveFights.maxPassiveFights + 2;

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeTwentyone = true;

	}

}

function legacySwordPermFourPurchase() {

	if (legacyPoints >= document.getElementById("fourthSwordPermCost").innerHTML){

		document.getElementById("twentysecondLegacyRow").setAttribute("style", "display: none;");

		legacyPoints = legacyPoints - document.getElementById("fourthSwordPermCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		if (document.getElementById("tenthPurchaseRow").getAttribute("style") == "") {

			money = money + parseInt(document.getElementById("tenthPurchaseCost").innerHTML);

			fourthSwordPurchase();

		}

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeTwentytwo = true;

	}
}

function legacyManualPermFourPurchase() {

	if (legacyPoints >= document.getElementById("fourthManualPermCost").innerHTML){

		document.getElementById("twentythirdLegacyRow").setAttribute("style", "display: none;");

		legacyPoints = legacyPoints - document.getElementById("fourthManualPermCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		if (document.getElementById("eleventhPurchaseRow").getAttribute("style") == "") {

			money = money + parseInt(document.getElementById("eleventhPurchaseCost").innerHTML);

			fourthManualPurchase();

		}

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeTwentythree = true;

	}

}

function legacyCultivationPermFourPurchase() {

	if (legacyPoints >= document.getElementById("fourthCultivationPermCost").innerHTML){

		document.getElementById("twentyfourthLegacyRow").setAttribute("style", "display: none;");

		legacyPoints = legacyPoints - document.getElementById("fourthCultivationPermCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		if (document.getElementById("twelfthPurchaseRow").getAttribute("style") == "") {

			money = money + parseInt(document.getElementById("twelfthPurchaseCost").innerHTML);

			fourthCultivationPurchase();

		}

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeTwentyfour = true;

	}

}

function legacyShopThreePurchase() {

	if (legacyPoints >= document.getElementById("thirdLegacyExtraShopCost").innerHTML){

		document.getElementById("twentyfifthLegacyRow").setAttribute("style", "display: none;");

		legacyPoints = legacyPoints - document.getElementById("thirdLegacyExtraShopCost").innerHTML;
		document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);

		document.getElementById("thirteenthPurchaseRow").setAttribute("style", "");
		document.getElementById("fourteenthPurchaseRow").setAttribute("style", "");
		document.getElementById("fifteenthPurchaseRow").setAttribute("style", "");

		calculateLegacyBoost();

		legacyUpgradesBought.legacyUpgradeTwentyfive = true;

	}

}

function legacyUnlock(){

	document.getElementById("legacyRequirement").setAttribute("style", "display: none;");
	document.getElementById("legacyPoints").setAttribute("style", "display: block; text-align: center;");
	document.getElementById("newLegacyPoints").setAttribute("style", "display: block; text-align: center;");
	document.getElementById("legacyStartBtn").setAttribute("style", "display: block; width: 100%;")
	document.getElementById("legacyTable").setAttribute("style", "");

	legacyPointCalculation();

	window.setInterval(function(){

		if (totalXp < 1000){

			newLegacyPoints = totalXp / 100;

		} else {

			newLegacyPoints = totalXp / (getBaseLog(10, totalXp)*33.333333333333333333333333);

		}

		document.getElementById("newLegacyPoints").innerHTML = "Legacy Points (Gained Upon Reset): " + newLegacyPoints.toFixed(3);

		console.log("Calculated Legacy Points")

	}, 10000);

}

function calculateLegacyBoost(){

	boostFactor = (legacyPoints * 0.01) + 1;

}

function legacyPointCalculation(){

	if (totalXp < 1000){

		newLegacyPoints = totalXp / 100;

	} else {

		newLegacyPoints = totalXp / (getBaseLog(10, totalXp) * 33.333);

	}

	document.getElementById("newLegacyPoints").innerHTML = "Legacy Points (Gained Upon Reset): " + newLegacyPoints.toFixed(3);

}

function imageChange(){

	if (document.getElementById("currentRealm").innerHTML == "Early Xiantian"){

		document.getElementById("meditate").src = "Assets/monk/transparent/monk2transparent.png";

	} else if (document.getElementById("currentRealm").innerHTML == "Early Jindan"){

		document.getElementById("meditate").src = "Assets/monk/(3)monkfloat4.gif";

	} else if (document.getElementById("currentRealm").innerHTML == "Early Dongxu"){

		document.getElementById("meditate").src = "Assets/monk/(4)monkglow.gif";

	}

}

function doAllWinChance(){

	getFightWinChance("firstFight");
	getFightWinChance("secondFight");
	getFightWinChance("thirdFight");
	getFightWinChance("fourthFight");
	getFightWinChance("fifthFight");
	getFightWinChance("sixthFight");
	getFightWinChance("seventhFight");

}

function getFightWinChance(fightId){

	var powerName = fightId + "Power";
	var rewardName = fightId + "Reward";

	var fightPower = document.getElementById(powerName).innerHTML;
	var fightReward = parseInt(document.getElementById(rewardName).innerHTML);

	if (power > fightPower){

		var tooltipAnchor = $('#' + fightId);
		tooltipAnchor.attr('data-tooltip', "Victory grants " + fightReward + " Spirit Stone(s). You currently have a 100% chance of victory");
		tooltipAnchor.tooltip();

	} else if (power >= (fightPower * 0.95)){

		var tooltipAnchor = $('#'+ fightId);
		tooltipAnchor.attr('data-tooltip', "Victory grants " + fightReward + " Spirit Stone(s). You currently have a ~73% chance of victory");
		tooltipAnchor.tooltip();

	} else if (power >= (fightPower * 0.90)){

		var tooltipAnchor = $('#'+fightId);
		tooltipAnchor.attr('data-tooltip', "Victory grants " + fightReward + " Spirit Stone(s). You currently have a ~45% chance of victory");
		tooltipAnchor.tooltip();

	} else if (power >= (fightPower * 0.85)){

		var tooltipAnchor = $('#' + fightId);
		tooltipAnchor.attr('data-tooltip', "Victory grants " + fightReward + " Spirit Stone(s). You currently have a ~18% chance of victory");
		tooltipAnchor.tooltip();

	} else {

		var tooltipAnchor = $('#' + fightId);
		tooltipAnchor.attr('data-tooltip', "Victory grants " + fightReward + " Spirit Stone(s). You currently have a 0% chance of victory");
		tooltipAnchor.tooltip();

	}

}

function Fight(fightId){

	var powerName = fightId + "Power";
	var rewardName = fightId + "Reward";
	var defeatName = fightId + "Defeat"

	var fightPower = document.getElementById(powerName).innerHTML;
	var fightReward = parseInt(document.getElementById(rewardName).innerHTML);
	var fightDefeat = document.getElementById(defeatName).innerHTML;

	if (power > fightPower){

		fightDefeat = "";
		document.getElementById(defeatName).innerHTML = fightDefeat;

		money = money + fightReward;

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

	} else if (power >= (fightPower * 0.95)) {

		if (Math.floor(Math.random() * 11) > 3) {

			fightDefeat = "";
			document.getElementById(defeatName).innerHTML = fightDefeat;

			money = money + fightReward;

			document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		} else {

			console.log("defeat");

			document.getElementById(defeatName).setAttribute("style", "display: inline;");
			fightDefeat = " You've been defeated!";
			document.getElementById(defeatName).innerHTML = fightDefeat;

		}

	} else if (power >= (fightPower * 0.90)){

		if (Math.floor(Math.random() * 11) > 6) {

			fightDefeat = "";
			document.getElementById(defeatName).innerHTML = fightDefeat;

			money = money + fightReward;

			document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		} else {

			console.log("defeat");

			document.getElementById(defeatName).setAttribute("style", "display: inline;");
			fightDefeat = " You've been defeated!";
			document.getElementById(defeatName).innerHTML = fightDefeat;

		}

	} else if (power >= (fightPower * 0.85)){

		if (Math.floor(Math.random() * 11) > 9) {

			fightDefeat = "";
			document.getElementById(defeatName).innerHTML = fightDefeat;

			money = money + fightReward;

			document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		} else {

			console.log("defeat");

			document.getElementById(defeatName).setAttribute("style", "display: inline;");
			fightDefeat = " You've been defeated!";
			document.getElementById(defeatName).innerHTML = fightDefeat;

		}

	} else {

		console.log("defeat");

		document.getElementById(defeatName).setAttribute("style", "display: inline;");
		fightDefeat = " You've been defeated!";
		document.getElementById(defeatName).innerHTML = fightDefeat;

	}

}

function Train(trainId){

	var trainCostName = trainId + "Cost";
	var trainRewardName = trainId + "Reward";

	var trainCost = parseInt(document.getElementById(trainCostName).innerHTML);
	var trainReward = parseFloat(document.getElementById(trainRewardName).innerHTML);

	if (money >= trainCost) {

		money = money - trainCost;

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		incrementAmount = incrementAmount + trainReward;

		document.getElementById(trainCostName).innerHTML = trainCost * 2;

	}

}

function firstSwordPurchase(){

	if (parseInt(money) >= parseInt(document.getElementById("firstPurchaseCost").innerHTML)){

		document.getElementById("firstPurchaseRow").setAttribute("style", "display:none;");

		money = money - parseInt(document.getElementById("firstPurchaseCost").innerHTML);

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		power = power + 0.15;

		document.getElementById("currentPower").innerHTML = "Power: " + power.toFixed(3);

		swordBonus = swordBonus + 0.15;

	}
}

function firstManualPurchase(){

	if (money >= parseInt(document.getElementById("secondPurchaseCost").innerHTML)){

		document.getElementById("secondPurchaseRow").setAttribute("style", "display: none;");

		money = money - parseInt(document.getElementById("secondPurchaseCost").innerHTML);

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		power = power + 0.15;

		document.getElementById("currentPower").innerHTML = "Power: " + power.toFixed(3);

	}

}

function firstCultivationPurchase(){

	if (money >= parseInt(document.getElementById("thirdPurchaseCost").innerHTML)){

		document.getElementById("thirdPurchaseRow").setAttribute("style", "display: none;");

		money = money - parseInt(document.getElementById("thirdPurchaseCost").innerHTML);

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		cultivationTechnique = cultivationTechnique + 0.1;

	}

}

function secondSwordPurchase(){

	if (money >= parseInt(document.getElementById("fourthPurchaseCost").innerHTML)){

		document.getElementById("fourthPurchaseRow").setAttribute("style", "display:none;");

		money = money - parseInt(document.getElementById("fourthPurchaseCost").innerHTML);

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		power = power + 0.15;

		document.getElementById("currentPower").innerHTML = "Power: " + power.toFixed(3);

		swordBonus = swordBonus + 0.15;

	}
}

function secondManualPurchase(){

	if (money >= parseInt(document.getElementById("fifthPurchaseCost").innerHTML)){

		document.getElementById("fifthPurchaseRow").setAttribute("style", "display: none;");

		money = money - parseInt(document.getElementById("fifthPurchaseCost").innerHTML);

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		power = power + 0.15;

		document.getElementById("currentPower").innerHTML = "Power: " + power.toFixed(3);

	}

}

function secondCultivationPurchase(){

	if (money >= parseInt(document.getElementById("sixthPurchaseCost").innerHTML)){

		document.getElementById("sixthPurchaseRow").setAttribute("style", "display: none;");

		money = money - parseInt(document.getElementById("sixthPurchaseCost").innerHTML);

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		cultivationTechnique = cultivationTechnique + 0.1;

	}

}

function thirdSwordPurchase(){

	if (parseInt(money) >= parseInt(document.getElementById("seventhPurchaseCost").innerHTML)){

		document.getElementById("seventhPurchaseRow").setAttribute("style", "display:none;");

		money = money - parseInt(document.getElementById("seventhPurchaseCost").innerHTML);

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		power = power + 0.15;

		document.getElementById("currentPower").innerHTML = "Power: " + power.toFixed(3);

		swordBonus = swordBonus + 0.15;

		}
}

function thirdManualPurchase(){

	if (money >= parseInt(document.getElementById("eighthPurchaseCost").innerHTML)){

		document.getElementById("eighthPurchaseRow").setAttribute("style", "display: none;");

		money = money - parseInt(document.getElementById("eighthPurchaseCost").innerHTML);

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		power = power + 0.15;

		document.getElementById("currentPower").innerHTML = "Power: " + power.toFixed(3);

	}

}

function thirdCultivationPurchase(){

	if (money >= parseInt(document.getElementById("ninthPurchaseCost").innerHTML)){

		document.getElementById("ninthPurchaseRow").setAttribute("style", "display: none;");

		money = money - parseInt(document.getElementById("ninthPurchaseCost").innerHTML);

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		cultivationTechnique = cultivationTechnique + 0.1;

	}

}

function fourthSwordPurchase(){

	if (parseInt(money) >= parseInt(document.getElementById("tenthPurchaseCost").innerHTML)){

		document.getElementById("tenthPurchaseRow").setAttribute("style", "display:none;");

		money = money - parseInt(document.getElementById("tenthPurchaseCost").innerHTML);

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		power = power + 0.15;

		document.getElementById("currentPower").innerHTML = "Power: " + power.toFixed(3);

		swordBonus = swordBonus + 0.15;

	}
}

function fourthManualPurchase(){

	if (money >= parseInt(document.getElementById("eleventhPurchaseCost").innerHTML)){

		document.getElementById("eleventhPurchaseRow").setAttribute("style", "display: none;");

		money = money - parseInt(document.getElementById("eleventhPurchaseCost").innerHTML);

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		power = power + 0.15;

		document.getElementById("currentPower").innerHTML = "Power: " + power.toFixed(3);

	}

}

function fourthCultivationPurchase(){

	if (money >= parseInt(document.getElementById("twelfthPurchaseCost").innerHTML)){

		document.getElementById("twelfthPurchaseRow").setAttribute("style", "display: none;");

		money = money - parseInt(document.getElementById("twelfthPurchaseCost").innerHTML);

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		cultivationTechnique = cultivationTechnique + 0.1;

	}

}

function fifthSwordPurchase(){

	if (parseInt(money) >= parseInt(document.getElementById("thirteenthPurchaseCost").innerHTML)){

		document.getElementById("thirteenthPurchaseRow").setAttribute("style", "display:none;");

		money = money - parseInt(document.getElementById("thirteenthPurchaseCost").innerHTML);

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		power = power + 0.15;

		document.getElementById("currentPower").innerHTML = "Power: " + power.toFixed(3);

		swordBonus = swordBonus + 0.15;

	}
}

function fifthManualPurchase(){

	if (money >= parseInt(document.getElementById("fourteenthPurchaseCost").innerHTML)){

		document.getElementById("fourteenthPurchaseRow").setAttribute("style", "display: none;");

		money = money - parseInt(document.getElementById("fourteenthPurchaseCost").innerHTML);

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		power = power + 0.15;

		document.getElementById("currentPower").innerHTML = "Power: " + power.toFixed(3);

	}

}

function fifthCultivationPurchase(){

	if (money >= parseInt(document.getElementById("fifteenthPurchaseCost").innerHTML)){

		document.getElementById("fifteenthPurchaseRow").setAttribute("style", "display: none;");

		money = money - parseInt(document.getElementById("fifteenthPurchaseCost").innerHTML);

		document.getElementById("money").innerHTML = "Spirit Stones: " + money;

		cultivationTechnique = cultivationTechnique + 0.1;

	}

}

function rankPowerChange(){

	//changing rank
	var firstHalf = "";
	var secondHalf = "";

	if (document.getElementById("progress").getAttribute("max").split("", 1) == 1) {

		firstHalf = "Early ";

		power = power + 0.5 + cultivationTechnique;

		document.getElementById("currentPower").innerHTML = "Power: " + power.toFixed(3);


	} else if (document.getElementById("progress").getAttribute("max").split("", 1) == 3) {

		firstHalf = "Middle ";

		power = power + 0.3 + cultivationTechnique;

		document.getElementById("currentPower").innerHTML = "Power: " + power.toFixed(3);

	} else if (document.getElementById("progress").getAttribute("max").split("", 1) == 5) {

		firstHalf = "Late ";

		power = power + 0.3 + cultivationTechnique;

		document.getElementById("currentPower").innerHTML = "Power: " + power.toFixed(3);

	}

	console.log(firstHalf);
	console.log(document.getElementById("progress").getAttribute("max").split("", 1));


	if (document.getElementById("progress").getAttribute("max") < 10) {

		secondHalf = "Houtian";

	} else if (document.getElementById("progress").getAttribute("max") < 1000){

		secondHalf = "Xiantian";

	} else if (document.getElementById("progress").getAttribute("max") < 100000){

		secondHalf = "Jindan";

	} else if (document.getElementById("progress").getAttribute("max") < 10000000){

		secondHalf = "Yuanying";

	} else if (document.getElementById("progress").getAttribute("max") < 1000000000){

		secondHalf = "Dongxu";

	} else if (document.getElementById("progress").getAttribute("max") < 100000000000){

		secondHalf = "Kongming";

	} else if (document.getElementById("progress").getAttribute("max") < 100000000000000){

		secondHalf = "Dujie";

	} else if (document.getElementById("progress").getAttribute("max") < 1000000000000000){

		secondHalf = "Dacheng";

		firstHalf = "";

	}

	console.log(secondHalf);
	console.log(document.getElementById("progress").getAttribute("max"));

	document.getElementById("currentRealm").innerHTML = firstHalf + secondHalf;

}

function increaseMax(currentMax){

	if (currentMax.split("", 1) == 1) {

		document.getElementById("progress").setAttribute("max", (currentMax * 3));

	} else if (currentMax.split("", 1) == 3) {

		document.getElementById("progress").setAttribute("max", (currentMax * 1.6666666666666666666666666666666666));

	} else if (currentMax.split("", 1) == 5) {

		document.getElementById("progress").setAttribute("max", (currentMax * 20));

	}

}

function isAtMax(currentXp, currentMax){

	if (currentXp >= currentMax){

		return true

	} else {

		return false

	}

}

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("user");
    if (user == "0.3.1") {

        loadLocalSave();

    } else {

				deleteLocalSave();

		}
}

function loadLocalSave(){


	xp = parseFloat(getCookie("xp"));
	incrementAmount = parseFloat(getCookie("incrementAmount"));
	totalXp = parseFloat(getCookie("totalXp"));
	newLegacyPoints = parseFloat(getCookie("newLegacyPoints"));
	legacyPoints = parseFloat(getCookie("legacyPoints"));
	boostFactor = parseFloat(getCookie("boostFactor"));
	power = parseFloat(getCookie("power"));
	money = parseInt(getCookie("money"));
	swordBonus = parseFloat(getCookie("swordBonus"));
	cultivationTechnique = parseFloat(getCookie("cultivationTechnique"));
	document.getElementById("progress").setAttribute("max", parseInt(getCookie("max")));

	document.getElementById("eighthFightRow").setAttribute("style", getCookie("eightFightRow"));
	document.getElementById("ninthFightRow").setAttribute("style", getCookie("ninthFightRow"));
	document.getElementById("ninthFightRow").setAttribute("style", getCookie("tenthFightRow"));
	document.getElementById("tenthFightRow").setAttribute("style", getCookie("eleventhFightRow"));

	document.getElementById("firstTrainCost").innerHTML = parseInt(getCookie("firstTrainCost"));
	document.getElementById("secondTrainCost").innerHTML = parseInt(getCookie("secondTrainCost"));
	document.getElementById("thirdTrainCost").innerHTML = parseInt(getCookie("thirdTrainCost"));
	document.getElementById("fourthTrainCost").innerHTML = parseInt(getCookie("fourthTrainCost"));
	document.getElementById("fifthTrainCost").innerHTML = parseInt(getCookie("fifthTrainCost"));
	document.getElementById("sixthTrainCost").innerHTML = parseInt(getCookie("sixthTrainCost"));
	document.getElementById("seventhTrainCost").innerHTML = parseInt(getCookie("seventhTrainCost"));
	document.getElementById("eighthTrainCost").innerHTML = parseInt(getCookie("eighthTrainCost"));
	document.getElementById("ninthTrainCost").innerHTML = parseInt(getCookie("ninthTrainCost"));
	document.getElementById("tenthTrainCost").innerHTML = parseInt(getCookie("tenthTrainCost"));
	document.getElementById("eleventhTrainCost").innerHTML = parseInt(getCookie("eleventhTrainCost"));

	document.getElementById("eighthTrainRow").setAttribute("style", getCookie("eightTrainRow"));
	document.getElementById("ninthTrainRow").setAttribute("style", getCookie("ninthTrainRow"));
	document.getElementById("ninthTrainRow").setAttribute("style", getCookie("tenthTrainRow"));
	document.getElementById("tenthTrainRow").setAttribute("style", getCookie("eleventhTrainRow"));

	document.getElementById("firstPurchaseRow").setAttribute("style", getCookie("firstPurchaseRow"));
	document.getElementById("secondPurchaseRow").setAttribute("style", getCookie("secondPurchaseRow"));
	document.getElementById("thirdPurchaseRow").setAttribute("style", getCookie("thirdPurchaseRow"));
	document.getElementById("fourthPurchaseRow").setAttribute("style", getCookie("fourthPurchaseRow"));
	document.getElementById("fifthPurchaseRow").setAttribute("style", getCookie("fifthPurchaseRow"));
	document.getElementById("sixthPurchaseRow").setAttribute("style", getCookie("sixthPurchaseRow"));
	document.getElementById("seventhPurchaseRow").setAttribute("style", getCookie("seventhPurchaseRow"));
	document.getElementById("eighthPurchaseRow").setAttribute("style", getCookie("eighthPurchaseRow"));
	document.getElementById("ninthPurchaseRow").setAttribute("style", getCookie("ninthPurchaseRow"));
	document.getElementById("tenthPurchaseRow").setAttribute("style", getCookie("tenthPurchaseRow"));
	document.getElementById("eleventhPurchaseRow").setAttribute("style", getCookie("eleventhPurchaseRow"));
	document.getElementById("twelfthPurchaseRow").setAttribute("style", getCookie("twelfthPurchaseRow"));
	document.getElementById("thirteenthPurchaseRow").setAttribute("style", getCookie("thirteenthPurchaseRow"));
	document.getElementById("fourteenthPurchaseRow").setAttribute("style", getCookie("fourteenthPurchaseRow"));
	document.getElementById("fifteenthPurchaseRow").setAttribute("style", getCookie("fifteenthPurchaseRow"));

	document.getElementById("currentRealm").innerHTML = getCookie("currentRealm");
	clickPerInterval = parseInt(getCookie("clickPerInterval"));
	clickCost = parseInt(getCookie("clickCost"));
	clickInterval = parseInt(getCookie("clickInterval"));

	passiveFights.maxPassiveFights = parseInt(getCookie("passiveFights.maxPassiveFights"));
	passiveFights.firstFightBought = parseInt(getCookie("passiveFights.firstFightBought"));
	passiveFights.secondFightBought = parseInt(getCookie("passiveFights.secondFightBought"));
	passiveFights.thirdFightBought = parseInt(getCookie("passiveFights.thirdFightBought"));
	passiveFights.fourthFightBought = parseInt(getCookie("passiveFights.fourthFightBought"));
	passiveFights.fifthFightBought = parseInt(getCookie("passiveFights.fifthFightBought"));
	passiveFights.sixthFightBought = parseInt(getCookie("passiveFights.sixthFightBought"));
	passiveFights.seventhFightBought = parseInt(getCookie("passiveFights.seventhFightBought"));
	passiveFights.eighthFightBought = parseInt(getCookie("passiveFights.eighthFightBought"));
	passiveFights.ninthFightBought = parseInt(getCookie("passiveFights.ninthFightBought"));
	passiveFights.tenthFightBought = parseInt(getCookie("passiveFights.tenthFightBought"));
	passiveFights.eleventhFightBought = parseInt(getCookie("passiveFights.eleventhFightBought"));

	passiveFights.firstFightCost = parseInt(getCookie("passiveFights.firstFightCost"));
	passiveFights.secondFightCost = parseInt(getCookie("passiveFights.secondFightCost"));
	passiveFights.thirdFightCost = parseInt(getCookie("passiveFights.thirdFightCost"));
	passiveFights.fourthFightCost =parseInt(getCookie("passiveFights.fourthFightCost"));
	passiveFights.fifthFightCost = parseInt(getCookie("passiveFights.fifthFightCost"));
	passiveFights.sixthFightCost = parseInt(getCookie("passiveFights.sixthFightCost"));
	passiveFights.seventhFightCost = parseInt(getCookie("passiveFights.seventhFightCost"));
	passiveFights.eighthFightCost = parseInt(getCookie("passiveFights.eighthFightCost"));
	passiveFights.ninthFightCost = parseInt(getCookie("passiveFights.ninthFightCost"));
	passiveFights.tenthFightCost = parseInt(getCookie("passiveFights.tenthFightCost"));
	passiveFights.eleventhFightCost = parseInt(getCookie("passiveFights.eleventhFightCost"));

	legacyUpgradesBought.legacyUpgradeOne = getCookie("legacyUpgradesBought.legacyUpgradeOne");
	legacyUpgradesBought.legacyUpgradeTwo = getCookie("legacyUpgradesBought.legacyUpgradeTwo");
	legacyUpgradesBought.legacyUpgradeThree = getCookie("legacyUpgradesBought.legacyUpgradeThree");
	legacyUpgradesBought.legacyUpgradeFour = getCookie("legacyUpgradesBought.legacyUpgradeFour");
	legacyUpgradesBought.legacyUpgradeFive = getCookie("legacyUpgradesBought.legacyUpgradeFive");
	legacyUpgradesBought.legacyUpgradeSix = getCookie("legacyUpgradesBought.legacyUpgradeSix");
	legacyUpgradesBought.legacyUpgradeSeven = getCookie("legacyUpgradesBought.legacyUpgradeSeven");
	legacyUpgradesBought.legacyUpgradeEight = getCookie("legacyUpgradesBought.legacyUpgradeEight");
	legacyUpgradesBought.legacyUpgradeNine = getCookie("legacyUpgradesBought.legacyUpgradeNine");
	legacyUpgradesBought.legacyUpgradeTen = getCookie("legacyUpgradesBought.legacyUpgradeTen");
	legacyUpgradesBought.legacyUpgradeEleven = getCookie("legacyUpgradesBought.legacyUpgradeEleven");
	legacyUpgradesBought.legacyUpgradeTwelve = getCookie("legacyUpgradesBought.legacyUpgradeTwelve");
	legacyUpgradesBought.legacyUpgradeThirteen = getCookie("legacyUpgradesBought.legacyUpgradeThirteen");
	legacyUpgradesBought.legacyUpgradeFourteen = getCookie("legacyUpgradesBought.legacyUpgradeFourteen");
	legacyUpgradesBought.legacyUpgradeFifteen = getCookie("legacyUpgradesBought.legacyUpgradeFifteen");
	legacyUpgradesBought.legacyUpgradeSixteen = getCookie("legacyUpgradesBought.legacyUpgradeSixteen");
	legacyUpgradesBought.legacyUpgradeSeventeen = getCookie("legacyUpgradesBought.legacyUpgradeSeventeen");
	legacyUpgradesBought.legacyUpgradeEighteen = getCookie("legacyUpgradesBought.legacyUpgradeEighteen");
	legacyUpgradesBought.legacyUpgradeNineteen = getCookie("legacyUpgradesBought.legacyUpgradeNinteen");
	legacyUpgradesBought.legacyUpgradeTwenty = getCookie("legacyUpgradesBought.legacyUpgradeTwenty");
	legacyUpgradesBought.legacyUpgradeTwentyone = getCookie("legacyUpgradesBought.legacyUpgradeTwentyone");
	legacyUpgradesBought.legacyUpgradeTwentytwo = getCookie("legacyUpgradesBought.legacyUpgradeTwentytwo");
	legacyUpgradesBought.legacyUpgradeTwentythree = getCookie("legacyUpgradesBought.legacyUpgradeTwentythree");
	legacyUpgradesBought.legacyUpgradeTwentyfour = getCookie("legacyUpgradesBought.legacyUpgradeTwentyfour");
	legacyUpgradesBought.legacyUpgradeTwentyfive = getCookie("legacyUpgradesBought.legacyUpgradeTwentyfive");

	updateValues();

	if (legacyPoints >= 0){

		legacyUnlock();
		updateLegacyTable();

	}

}

function updateValues(){

	document.getElementById("xp").innerHTML = "Xp: " + xp.toFixed(3);
	document.getElementById("legacyPoints").innerHTML = "Legacy Points: " + legacyPoints.toFixed(3);
	document.getElementById("newLegacyPoints").innerHTML = "Legacy Points (Gained Upon Reset): " + newLegacyPoints;
	document.getElementById("currentPower").innerHTML = "Power: " + power.toFixed(3);
	document.getElementById("money").innerHTML = "Spirit Stones: " + money;
	document.getElementById("progress").setAttribute("value", xp);
	// fixing tooltip
	var tooltipAnchor = $('#passiveClickBtn');
		tooltipAnchor.attr('data-tooltip', "Gain passive clicks per second - cost: " + clickCost + " spirit stones, current: " + clickPerInterval + " cps");
		tooltipAnchor.tooltip();

	document.getElementById("passiveClickBtn").innerHTML = "Secluded Meditation - " + clickCost + " S.S.";

	if (clickPerInterval >= 1){

		clickId = setInterval(function(){

		increaseXp(xp, incrementAmount);

		}, clickInterval)

	}

	console.log(passiveFights.secondFightBought);

	passFightUpdate();

	//doAllWinChance();

}

function updateLegacyTable(){

	if (legacyUpgradesBought.legacyUpgradeOne == "true"){
		document.getElementById("firstLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeTwo == "true"){
		document.getElementById("secondLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeThree == "true"){
		document.getElementById("thirdLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeFour == "true"){
		document.getElementById("fourthLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeFive == "true"){
		document.getElementById("fifthLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeSix == "true"){
		document.getElementById("sixthLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeSeven == "true"){
		document.getElementById("seventhLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeEight == "true"){
		document.getElementById("eighthLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeNine == "true"){
		document.getElementById("ninthLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeTen == "true"){
		document.getElementById("tenthLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeEleven == "true"){
		document.getElementById("eleventhLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeTwelve == "true"){
		document.getElementById("twelfthLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeThirteen == "true"){
		document.getElementById("thirteenthLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeFourteen == "true"){
		document.getElementById("fourteenthLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeFifteen == "true"){
		document.getElementById("fifteenthLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeSixteen == "true"){
		document.getElementById("sixteenthLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeSeventeen == "true"){
		document.getElementById("seventeenthLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeEighteen == "true"){
		document.getElementById("eighteenthLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeNineteen == "true"){
		document.getElementById("nineteenthLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeTwenty == "true"){
		document.getElementById("twentiethLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeTwentyone == "true"){
		document.getElementById("twentyfirstLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeTwentytwo == "true"){
		document.getElementById("twentysecondLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeTwentythree == "true"){
		document.getElementById("twentythirdLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeTwentyfour == "true"){
		document.getElementById("twentyfourthLegacyRow").setAttribute("style", "display: none;");
	}
	if (legacyUpgradesBought.legacyUpgradeTwentyfive == "true"){
		document.getElementById("twentyfifthLegacyRow").setAttribute("style", "display: none;");
	}
}

function passFightUpdate(){

	if(passiveFights.firstFightBought == passiveFights.maxPassiveFights){

		document.getElementById("firstFightPassive").setAttribute("style", "display: none;")

		passiveFights.passFightOneInterval =  setInterval(function(){

		Fight("firstFight");

	}, (1000 / passiveFights.firstFightBought));

	} else if (passiveFights.firstFightBought > 0) {

	var tooltipAnchor = $('#firstFightPassive');
	tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every second (per upgrade) - " + passiveFights.firstFightCost + " S.S.");
	tooltipAnchor.tooltip();

	passiveFights.passFightOneInterval =  setInterval(function(){

	Fight("firstFight");

	}, (1000 / passiveFights.firstFightBought));
	}
	if(passiveFights.secondFightBought == passiveFights.maxPassiveFights){

		document.getElementById("secondFightPassive").setAttribute("style", "display: none;")

		passiveFights.passFightTwoInterval =  setInterval(function(){

		Fight("secondFight");

	}, (2000 / passiveFights.secondFightBought));
	} else if (passiveFights.secondFightBought > 0) {

		var tooltipAnchor = $('#secondFightPassive');
		tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every 2 seconds (per upgrade) - " + passiveFights.secondFightCost + " S.S.");
		tooltipAnchor.tooltip();

		passiveFights.passFightTwoInterval =  setInterval(function(){

		Fight("firstFight");

	}, (1000 / passiveFights.firstFightBought));
	}
	if(passiveFights.thirdFightBought == passiveFights.maxPassiveFights){

		document.getElementById("thirdFightPassive").setAttribute("style", "display: none;")

		passiveFights.passFightThreeInterval =  setInterval(function(){

		Fight("thirdFight");

	}, (3000 / passiveFights.thirdFightBought));
	} else if (passiveFights.thirdFightBought > 0) {

		var tooltipAnchor = $('#thirdFightPassive');
		tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every 3 seconds (per upgrade) - " + passiveFights.thirdFightCost + " S.S.");
		tooltipAnchor.tooltip();

		passiveFights.passFightThreeInterval =  setInterval(function(){

		Fight("thirdFight");

	}, (3000 / passiveFights.thirdFightBought));
	}
	if(passiveFights.fourthFightBought == passiveFights.maxPassiveFights){

		document.getElementById("fourthFightPassive").setAttribute("style", "display: none;")

		passiveFights.passFightFourInterval =  setInterval(function(){

		Fight("fourthFight");

	}, (4000 / passiveFights.fourthFightBought));
	} else if (passiveFights.fourthFightBought > 0) {

		var tooltipAnchor = $('#fourthFightPassive');
		tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every 4 seconds (per upgrade) - " + passiveFights.fourthFightCost + " S.S.");
		tooltipAnchor.tooltip();

		passiveFights.passFightFourInterval =  setInterval(function(){

		Fight("fourthFight");

	}, (4000 / passiveFights.fourthFightBought));
	}
	if(passiveFights.fifthFightBought == passiveFights.maxPassiveFights){

		document.getElementById("fifthFightPassive").setAttribute("style", "display: none;")

		passiveFights.passFightFiveInterval =  setInterval(function(){

		Fight("fifthFight");

	}, (5000 / passiveFights.fifthFightBought));
	} else if (passiveFights.fifthFightBought > 0) {

		var tooltipAnchor = $('#fifthFightPassive');
		tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every 5 seconds (per upgrade) - " + passiveFights.fifthFightCost + " S.S.");
		tooltipAnchor.tooltip();

		passiveFights.passFightFiveInterval =  setInterval(function(){

		Fight("fifthFight");

	}, (5000 / passiveFights.fifthFightBought));
	}
	if(passiveFights.sixthFightBought == passiveFights.maxPassiveFights){

		document.getElementById("sixthFightPassive").setAttribute("style", "display: none;")

		passiveFights.passFightSixInterval =  setInterval(function(){

		Fight("sixthFight");

	}, (6000 / passiveFights.sixthFightBought));
	} else if (passiveFights.sixthFightBought > 0) {

		var tooltipAnchor = $('#sixthFightPassive');
		tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every 6 seconds (per upgrade) - " + passiveFights.sixthFightCost + " S.S.");
		tooltipAnchor.tooltip();

		passiveFights.passFightSixInterval =  setInterval(function(){

		Fight("sixthFight");

	}, (6000 / passiveFights.sixthFightBought));
	}
	if(passiveFights.seventhFightBought == passiveFights.maxPassiveFights){

		document.getElementById("seventhFightPassive").setAttribute("style", "display: none;")

		passiveFights.passFightSevenInterval =  setInterval(function(){

		Fight("seventhFight");

	}, (7000 / passiveFights.seventhFightBought));
	} else if (passiveFights.seventhFightBought > 0) {

		var tooltipAnchor = $('#seventhFightPassive');
		tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every  7 seconds (per upgrade) - " + passiveFights.seventhFightCost + " S.S.");
		tooltipAnchor.tooltip();

		passiveFights.passFightSevenInterval =  setInterval(function(){

		Fight("seventhFight");

	}, (7000 / passiveFights.seventhFightBought));
	}
	if(passiveFights.eighthFightBought == passiveFights.maxPassiveFights){

		document.getElementById("eighthFightPassive").setAttribute("style", "display: none;")

		passiveFights.passFightEightInterval =  setInterval(function(){

		Fight("eighthFight");

	}, (8000 / passiveFights.eighthFightBought));
	} else if (passiveFights.eighthFightBought > 0) {

		var tooltipAnchor = $('#eighthFightPassive');
		tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every 8 seconds (per upgrade) - " + passiveFights.eighthFightCost + " S.S.");
		tooltipAnchor.tooltip();

		passiveFights.passFightEightInterval =  setInterval(function(){

		Fight("eighthFight");

	}, (8000 / passiveFights.eighthFightBought));
	}
	if(passiveFights.ninthFightBought == passiveFights.maxPassiveFights){

		document.getElementById("ninthFightPassive").setAttribute("style", "display: none;")

		passiveFights.passFightninthInterval =  setInterval(function(){

		Fight("ninthFight");

	}, (9000 / passiveFights.ninthFightBought));
	} else if (passiveFights.ninthFightBought > 0) {

		var tooltipAnchor = $('#ninthFightPassive');
		tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every 9 seconds (per upgrade) - " + passiveFights.ninthFightCost + " S.S.");
		tooltipAnchor.tooltip();

		passiveFights.passFightNineInterval =  setInterval(function(){

		Fight("ninthFight");

	}, (9000 / passiveFights.ninthFightBought));
	}
	if(passiveFights.tenthFightBought == passiveFights.maxPassiveFights){

		document.getElementById("tenthFightPassive").setAttribute("style", "display: none;")

		passiveFights.passFightTenInterval =  setInterval(function(){

		Fight("tenthFight");

	}, (10000 / passiveFights.tenthFightBought));
	} else if (passiveFights.tenthFightBought > 0) {

		var tooltipAnchor = $('#tenthFightPassive');
		tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every 10 seconds (per upgrade) - " + passiveFights.tenthFightCost + " S.S.");
		tooltipAnchor.tooltip();

		passiveFights.passFightTenInterval =  setInterval(function(){

		Fight("tenthFight");

	}, (10000 / passiveFights.tenthFightBought));
	}
	if(passiveFights.eleventhFightBought == passiveFights.maxPassiveFights){

		document.getElementById("eleventhFightPassive").setAttribute("style", "display: none;")

		passiveFights.passFightElevenInterval =  setInterval(function(){

		Fight("eleventhFight");

	}, (11000 / passiveFights.eleventhFightBought));
	} else if (passiveFights.eleventhFightBought > 0) {

		var tooltipAnchor = $('#eleventhFightPassive');
		tooltipAnchor.attr('data-tooltip', "Auto Fight: Does this fight automatically, once every 11 seconds (per upgrade) - " + passiveFights.eleventhFightCost + " S.S.");
		tooltipAnchor.tooltip();

		passiveFights.passFightElevenInterval =  setInterval(function(){

		Fight("eleventhFight");

	}, (11000 / passiveFights.eleventhFightBought));
	}

}

function deleteLocalSave(){

	setCookie("user", "Player", -1);
	setCookie("xp", xp, -1);

	setCookie("incrementAmount", incrementAmount, -1);
	setCookie("power", power, -1);
	setCookie("money", money, -1);
	setCookie("swordBonus", swordBonus, -1);
	setCookie("cultivationTechnique", cultivationTechnique, -1);
	setCookie("max", document.getElementById("progress").getAttribute("max"), -1);

	setCookie("eighthFightRow", document.getElementById("eighthFightRow").getAttribute("style"), -1);
	setCookie("ninthFightRow", document.getElementById("ninthFightRow").getAttribute("style"), -1);
	setCookie("tenthFightRow", document.getElementById("tenthFightRow").getAttribute("style"), -1);
	setCookie("eleventhFightRow", document.getElementById("eleventhFightRow").getAttribute("style"), -1);

	setCookie("firstTrainCost", parseInt(document.getElementById("firstTrainCost").innerHTML), -1);
	setCookie("secondTrainCost", parseInt(document.getElementById("secondTrainCost").innerHTML), -1);
	setCookie("thirdTrainCost", parseInt(document.getElementById("thirdTrainCost").innerHTML), -1);
	setCookie("fourthTrainCost", parseInt(document.getElementById("fourthTrainCost").innerHTML), -1);
	setCookie("fifthTrainCost", parseInt(document.getElementById("fifthTrainCost").innerHTML), -1);
	setCookie("sixthTrainCost", parseInt(document.getElementById("sixthTrainCost").innerHTML), -1);
	setCookie("seventhTrainCost", parseInt(document.getElementById("seventhTrainCost").innerHTML), -1);
	setCookie("eighthTrainCost", parseInt(document.getElementById("eighthTrainCost").innerHTML), -1);
	setCookie("ninthTrainCost", parseInt(document.getElementById("ninthTrainCost").innerHTML), -1);
	setCookie("tenthTrainCost", parseInt(document.getElementById("tenthTrainCost").innerHTML), -1);
	setCookie("eleventhTrainCost", parseInt(document.getElementById("eleventhTrainCost").innerHTML), -1);

	setCookie("eighthTrainRow", document.getElementById("eighthTrainRow").getAttribute("style"), -1);
	setCookie("ninthTrainRow", document.getElementById("ninthTrainRow").getAttribute("style"), -1);
	setCookie("tenthTrainRow", document.getElementById("tenthTrainRow").getAttribute("style"), -1);
	setCookie("eleventhTrainRow", document.getElementById("eleventhTrainRow").getAttribute("style"), -1);

	setCookie("firstPurchaseRow", document.getElementById("firstPurchaseRow").getAttribute("style"), -1);
	setCookie("secondPurchaseRow", document.getElementById("secondPurchaseRow").getAttribute("style"), -1);
	setCookie("thirdPurchaseRow", document.getElementById("thirdPurchaseRow").getAttribute("style"), -1);
	setCookie("fourthPurchaseRow", document.getElementById("fourthPurchaseRow").getAttribute("style"), -1);
	setCookie("fifthPurchaseRow", document.getElementById("fifthPurchaseRow").getAttribute("style"), -1);
	setCookie("sixthPurchaseRow", document.getElementById("sixthPurchaseRow").getAttribute("style"), -1);
	setCookie("seventhPurchaseRow", document.getElementById("seventhPurchaseRow").getAttribute("style"), -1);
	setCookie("eighthPurchaseRow", document.getElementById("eighthPurchaseRow").getAttribute("style"), -1);
	setCookie("ninthPurchaseRow", document.getElementById("ninthPurchaseRow").getAttribute("style"), -1);
	setCookie("tenthPurchaseRow", document.getElementById("tenthPurchaseRow").getAttribute("style"), -1);
	setCookie("eleventhPurchaseRow", document.getElementById("eleventhPurchaseRow").getAttribute("style"), -1);
	setCookie("twelfthPurchaseRow", document.getElementById("twelfthPurchaseRow").getAttribute("style"), -1);
	setCookie("thirteenthPurchaseRow", document.getElementById("thirteenthPurchaseRow").getAttribute("style"), -1);
	setCookie("fourteenthPurchaseRow", document.getElementById("fourteenthPurchaseRow").getAttribute("style"), -1);
	setCookie("fifteenthPurchaseRow", document.getElementById("fifteenthPurchaseRow").getAttribute("style"), -1);

	setCookie("currentRealm", document.getElementById("currentRealm").innerHTML, -1);
	setCookie("clickPerInterval", clickPerInterval, -1);
	setCookie("clickCost", clickCost, -1);
	setCookie("clickInterval", clickInterval, -1);

	setCookie("passiveFights.maxPassiveFights", passiveFights.maxPassiveFights, -1);
	setCookie("passiveFights.firstFightBought", passiveFights.firstFightBought, -1);
	setCookie("passiveFights.secondFightBought", passiveFights.secondFightBought, -1);
	setCookie("passiveFights.thirdFightBought", passiveFights.thirdFightBought, -1);
	setCookie("passiveFights.fourthFightBought", passiveFights.fourthFightBought, -1);
	setCookie("passiveFights.fifthFightBought", passiveFights.fifthFightBought, -1);
	setCookie("passiveFights.sixthFightBought", passiveFights.sixthFightBought, -1);
	setCookie("passiveFights.seventhFightBought", passiveFights.seventhFightBought, -1);
	setCookie("passiveFights.eighthFightBought", passiveFights.eighthFightBought, -1);
	setCookie("passiveFights.ninthFightBought", passiveFights.ninthFightBought, -1);
	setCookie("passiveFights.tenthFightBought", passiveFights.tenthFightBought, -1);
	setCookie("passiveFights.eleventhFightBought", passiveFights.eleventhFightBought, -1);

	setCookie("passiveFights.firstFightCost", passiveFights.firstFightCost, -1);
	setCookie("passiveFights.secondFightCost", passiveFights.secondFightCost, -1);
	setCookie("passiveFights.thirdFightCost", passiveFights.thirdFightCost, -1);
	setCookie("passiveFights.fourthFightCost", passiveFights.fourthFightCost, -1);
	setCookie("passiveFights.fifthFightCost", passiveFights.fifthFightCost, -1);
	setCookie("passiveFights.sixthFightCost", passiveFights.sixthFightCost, -1);
	setCookie("passiveFights.seventhFightCost", passiveFights.seventhFightCost, -1);
	setCookie("passiveFights.eighthFightCost", passiveFights.eighthFightCost, -1);
	setCookie("passiveFights.ninthFightCost", passiveFights.ninthFightCost, -1);
	setCookie("passiveFights.tenthFightCost", passiveFights.tenthFightCost, -1);
	setCookie("passiveFights.eleventhFightCost", passiveFights.eleventhFightCost, -1);

	setCookie("legacyUpgradesBought.legacyUpgradeOne", legacyUpgradesBought.legacyUpgradeOne, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeTwo", legacyUpgradesBought.legacyUpgradeTwo, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeThree", legacyUpgradesBought.legacyUpgradeThree, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeFour", legacyUpgradesBought.legacyUpgradeFour, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeFive", legacyUpgradesBought.legacyUpgradeFive, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeSix", legacyUpgradesBought.legacyUpgradeSix, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeSeven", legacyUpgradesBought.legacyUpgradeSeven, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeEight", legacyUpgradesBought.legacyUpgradeEight, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeNine", legacyUpgradesBought.legacyUpgradeNine, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeTen", legacyUpgradesBought.legacyUpgradeTen, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeEleven", legacyUpgradesBought.legacyUpgradeEleven, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeTwelve", legacyUpgradesBought.legacyUpgradeTwelve, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeThirteen", legacyUpgradesBought.legacyUpgradeThirteen, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeFourteen", legacyUpgradesBought.legacyUpgradeFourteen, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeFifteen", legacyUpgradesBought.legacyUpgradeFifteen, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeSixteen", legacyUpgradesBought.legacyUpgradeSixteen, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeSeventeen", legacyUpgradesBought.legacyUpgradeSeventeen, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeEighteen", legacyUpgradesBought.legacyUpgradeEighteen, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeNineteen", legacyUpgradesBought.legacyUpgradeNineteen, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeTwenty", legacyUpgradesBought.legacyUpgradeTwenty, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeTwentyone", legacyUpgradesBought.legacyUpgradeTwentyone, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeTwentytwo", legacyUpgradesBought.legacyUpgradeTwentytwo, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeTwentythree", legacyUpgradesBought.legacyUpgradeTwentythree, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeTwentyfour", legacyUpgradesBought.legacyUpgradeTwentyfour, -1);
	setCookie("legacyUpgradesBought.legacyUpgradeTwentyfive", legacyUpgradesBought.legacyUpgradeTwentyfive, -1);

}

function localSave(){

  setCookie("user", "0.3.1", 1000);
	setCookie("xp", xp, 1000);
	setCookie("totalXp", totalXp, 1000);
	setCookie("newLegacyPoints", newLegacyPoints, 1000);
	setCookie("legacyPoints", legacyPoints, 1000);
	setCookie("boostFactor", boostFactor, 1000);

	setCookie("incrementAmount", incrementAmount, 1000);
	setCookie("power", power, 1000);
	setCookie("money", money, 1000);
	setCookie("swordBonus", swordBonus, 1000);
	setCookie("cultivationTechnique", cultivationTechnique, 1000);
	setCookie("max", document.getElementById("progress").getAttribute("max"), 1000);

	setCookie("eighthFightRow", document.getElementById("eighthFightRow").getAttribute("style"), 1000);
	setCookie("ninthFightRow", document.getElementById("ninthFightRow").getAttribute("style"), 1000);
	setCookie("tenthFightRow", document.getElementById("tenthFightRow").getAttribute("style"), 1000);
	setCookie("eleventhFightRow", document.getElementById("eleventhFightRow").getAttribute("style"), 1000);

	setCookie("firstTrainCost", parseInt(document.getElementById("firstTrainCost").innerHTML), 1000);
	setCookie("secondTrainCost", parseInt(document.getElementById("secondTrainCost").innerHTML), 1000);
	setCookie("thirdTrainCost", parseInt(document.getElementById("thirdTrainCost").innerHTML), 1000);
	setCookie("fourthTrainCost", parseInt(document.getElementById("fourthTrainCost").innerHTML), 1000);
	setCookie("fifthTrainCost", parseInt(document.getElementById("fifthTrainCost").innerHTML), 1000);
	setCookie("sixthTrainCost", parseInt(document.getElementById("sixthTrainCost").innerHTML), 1000);
	setCookie("seventhTrainCost", parseInt(document.getElementById("seventhTrainCost").innerHTML), 1000);
	setCookie("eighthTrainCost", parseInt(document.getElementById("eighthTrainCost").innerHTML), 1000);
	setCookie("ninthTrainCost", parseInt(document.getElementById("ninthTrainCost").innerHTML), 1000);
	setCookie("tenthTrainCost", parseInt(document.getElementById("tenthTrainCost").innerHTML), 1000);
	setCookie("eleventhTrainCost", parseInt(document.getElementById("eleventhTrainCost").innerHTML), 1000);

	setCookie("eighthTrainRow", document.getElementById("eighthTrainRow").getAttribute("style"), 1000);
	setCookie("ninthTrainRow", document.getElementById("ninthTrainRow").getAttribute("style"), 1000);
	setCookie("tenthTrainRow", document.getElementById("tenthTrainRow").getAttribute("style"), 1000);
	setCookie("eleventhTrainRow", document.getElementById("eleventhTrainRow").getAttribute("style"), 1000);

	setCookie("firstPurchaseRow", document.getElementById("firstPurchaseRow").getAttribute("style"), 1000);
	setCookie("secondPurchaseRow", document.getElementById("secondPurchaseRow").getAttribute("style"), 1000);
	setCookie("thirdPurchaseRow", document.getElementById("thirdPurchaseRow").getAttribute("style"), 1000);
	setCookie("fourthPurchaseRow", document.getElementById("fourthPurchaseRow").getAttribute("style"), 1000);
	setCookie("fifthPurchaseRow", document.getElementById("fifthPurchaseRow").getAttribute("style"), 1000);
	setCookie("sixthPurchaseRow", document.getElementById("sixthPurchaseRow").getAttribute("style"), 1000);
	setCookie("seventhPurchaseRow", document.getElementById("seventhPurchaseRow").getAttribute("style"), 1000);
	setCookie("eighthPurchaseRow", document.getElementById("eighthPurchaseRow").getAttribute("style"), 1000);
	setCookie("ninthPurchaseRow", document.getElementById("ninthPurchaseRow").getAttribute("style"), 1000);
	setCookie("tenthPurchaseRow", document.getElementById("tenthPurchaseRow").getAttribute("style"), 1000);
	setCookie("eleventhPurchaseRow", document.getElementById("eleventhPurchaseRow").getAttribute("style"), 1000);
	setCookie("twelfthPurchaseRow", document.getElementById("twelfthPurchaseRow").getAttribute("style"), 1000);
	setCookie("thirteenthPurchaseRow", document.getElementById("thirteenthPurchaseRow").getAttribute("style"), 1000);
	setCookie("fourteenthPurchaseRow", document.getElementById("fourteenthPurchaseRow").getAttribute("style"), 1000);
	setCookie("fifteenthPurchaseRow", document.getElementById("fifteenthPurchaseRow").getAttribute("style"), 1000);

	setCookie("currentRealm", document.getElementById("currentRealm").innerHTML, 1000);
	setCookie("clickPerInterval", clickPerInterval, 1000);
	setCookie("clickCost", clickCost, 1000);
	setCookie("clickInterval", clickInterval, 1000);

	setCookie("passiveFights.maxPassiveFights", passiveFights.maxPassiveFights, 1000);
	setCookie("passiveFights.firstFightBought", passiveFights.firstFightBought, 1000);
	setCookie("passiveFights.secondFightBought", passiveFights.secondFightBought, 1000);
	setCookie("passiveFights.thirdFightBought", passiveFights.thirdFightBought, 1000);
	setCookie("passiveFights.fourthFightBought", passiveFights.fourthFightBought, 1000);
	setCookie("passiveFights.fifthFightBought", passiveFights.fifthFightBought, 1000);
	setCookie("passiveFights.sixthFightBought", passiveFights.sixthFightBought, 1000);
	setCookie("passiveFights.seventhFightBought", passiveFights.seventhFightBought, 1000);
	setCookie("passiveFights.eighthFightBought", passiveFights.eighthFightBought, 1000);
	setCookie("passiveFights.ninthFightBought", passiveFights.ninthFightBought, 1000);
	setCookie("passiveFights.tenthFightBought", passiveFights.tenthFightBought, 1000);
	setCookie("passiveFights.eleventhFightBought", passiveFights.eleventhFightBought, 1000);

	setCookie("passiveFights.firstFightCost", passiveFights.firstFightCost, 1000);
	setCookie("passiveFights.secondFightCost", passiveFights.secondFightCost, 1000);
	setCookie("passiveFights.thirdFightCost", passiveFights.thirdFightCost, 1000);
	setCookie("passiveFights.fourthFightCost", passiveFights.fourthFightCost, 1000);
	setCookie("passiveFights.fifthFightCost", passiveFights.fifthFightCost, 1000);
	setCookie("passiveFights.sixthFightCost", passiveFights.sixthFightCost, 1000);
	setCookie("passiveFights.seventhFightCost", passiveFights.seventhFightCost, 1000);
	setCookie("passiveFights.eighthFightCost", passiveFights.eighthFightCost, 1000);
	setCookie("passiveFights.ninthFightCost", passiveFights.ninthFightCost, 1000);
	setCookie("passiveFights.tenthFightCost", passiveFights.tenthFightCost, 1000);
	setCookie("passiveFights.eleventhFightCost", passiveFights.eleventhFightCost, 1000);

	setCookie("legacyUpgradesBought.legacyUpgradeOne", legacyUpgradesBought.legacyUpgradeOne, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeTwo", legacyUpgradesBought.legacyUpgradeTwo, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeThree", legacyUpgradesBought.legacyUpgradeThree, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeFour", legacyUpgradesBought.legacyUpgradeFour, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeFive", legacyUpgradesBought.legacyUpgradeFive, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeSix", legacyUpgradesBought.legacyUpgradeSix, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeSeven", legacyUpgradesBought.legacyUpgradeSeven, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeEight", legacyUpgradesBought.legacyUpgradeEight, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeNine", legacyUpgradesBought.legacyUpgradeNine, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeTen", legacyUpgradesBought.legacyUpgradeTen, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeEleven", legacyUpgradesBought.legacyUpgradeEleven, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeTwelve", legacyUpgradesBought.legacyUpgradeTwelve, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeThirteen", legacyUpgradesBought.legacyUpgradeThirteen, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeFourteen", legacyUpgradesBought.legacyUpgradeFourteen, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeFifteen", legacyUpgradesBought.legacyUpgradeFifteen, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeSixteen", legacyUpgradesBought.legacyUpgradeSixteen, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeSeventeen", legacyUpgradesBought.legacyUpgradeSeventeen, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeEighteen", legacyUpgradesBought.legacyUpgradeEighteen, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeNineteen", legacyUpgradesBought.legacyUpgradeNineteen, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeTwenty", legacyUpgradesBought.legacyUpgradeTwenty, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeTwentyone", legacyUpgradesBought.legacyUpgradeTwentyone, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeTwentytwo", legacyUpgradesBought.legacyUpgradeTwentytwo, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeTwentythree", legacyUpgradesBought.legacyUpgradeTwentythree, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeTwentyfour", legacyUpgradesBought.legacyUpgradeTwentyfour, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeTwentyfive", legacyUpgradesBought.legacyUpgradeTwentyfive, 1000);

	console.log("Saved!");

}
setInterval( function() {
  setCookie("user", "0.3.1", 1000);
	setCookie("xp", xp, 1000);
	setCookie("totalXp", totalXp, 1000);
	setCookie("newLegacyPoints", newLegacyPoints, 1000);
	setCookie("legacyPoints", legacyPoints, 1000);
	setCookie("boostFactor", boostFactor, 1000);

	setCookie("incrementAmount", incrementAmount, 1000);
	setCookie("power", power, 1000);
	setCookie("money", money, 1000);
	setCookie("swordBonus", swordBonus, 1000);
	setCookie("cultivationTechnique", cultivationTechnique, 1000);
	setCookie("max", document.getElementById("progress").getAttribute("max"), 1000);

	setCookie("eighthFightRow", document.getElementById("eighthFightRow").getAttribute("style"), 1000);
	setCookie("ninthFightRow", document.getElementById("ninthFightRow").getAttribute("style"), 1000);
	setCookie("tenthFightRow", document.getElementById("tenthFightRow").getAttribute("style"), 1000);
	setCookie("eleventhFightRow", document.getElementById("eleventhFightRow").getAttribute("style"), 1000);

	setCookie("firstTrainCost", parseInt(document.getElementById("firstTrainCost").innerHTML), 1000);
	setCookie("secondTrainCost", parseInt(document.getElementById("secondTrainCost").innerHTML), 1000);
	setCookie("thirdTrainCost", parseInt(document.getElementById("thirdTrainCost").innerHTML), 1000);
	setCookie("fourthTrainCost", parseInt(document.getElementById("fourthTrainCost").innerHTML), 1000);
	setCookie("fifthTrainCost", parseInt(document.getElementById("fifthTrainCost").innerHTML), 1000);
	setCookie("sixthTrainCost", parseInt(document.getElementById("sixthTrainCost").innerHTML), 1000);
	setCookie("seventhTrainCost", parseInt(document.getElementById("seventhTrainCost").innerHTML), 1000);
	setCookie("eighthTrainCost", parseInt(document.getElementById("eighthTrainCost").innerHTML), 1000);
	setCookie("ninthTrainCost", parseInt(document.getElementById("ninthTrainCost").innerHTML), 1000);
	setCookie("tenthTrainCost", parseInt(document.getElementById("tenthTrainCost").innerHTML), 1000);
	setCookie("eleventhTrainCost", parseInt(document.getElementById("eleventhTrainCost").innerHTML), 1000);

	setCookie("eighthTrainRow", document.getElementById("eighthTrainRow").getAttribute("style"), 1000);
	setCookie("ninthTrainRow", document.getElementById("ninthTrainRow").getAttribute("style"), 1000);
	setCookie("tenthTrainRow", document.getElementById("tenthTrainRow").getAttribute("style"), 1000);
	setCookie("eleventhTrainRow", document.getElementById("eleventhTrainRow").getAttribute("style"), 1000);

	setCookie("firstPurchaseRow", document.getElementById("firstPurchaseRow").getAttribute("style"), 1000);
	setCookie("secondPurchaseRow", document.getElementById("secondPurchaseRow").getAttribute("style"), 1000);
	setCookie("thirdPurchaseRow", document.getElementById("thirdPurchaseRow").getAttribute("style"), 1000);
	setCookie("fourthPurchaseRow", document.getElementById("fourthPurchaseRow").getAttribute("style"), 1000);
	setCookie("fifthPurchaseRow", document.getElementById("fifthPurchaseRow").getAttribute("style"), 1000);
	setCookie("sixthPurchaseRow", document.getElementById("sixthPurchaseRow").getAttribute("style"), 1000);
	setCookie("seventhPurchaseRow", document.getElementById("seventhPurchaseRow").getAttribute("style"), 1000);
	setCookie("eighthPurchaseRow", document.getElementById("eighthPurchaseRow").getAttribute("style"), 1000);
	setCookie("ninthPurchaseRow", document.getElementById("ninthPurchaseRow").getAttribute("style"), 1000);
	setCookie("tenthPurchaseRow", document.getElementById("tenthPurchaseRow").getAttribute("style"), 1000);
	setCookie("eleventhPurchaseRow", document.getElementById("eleventhPurchaseRow").getAttribute("style"), 1000);
	setCookie("twelfthPurchaseRow", document.getElementById("twelfthPurchaseRow").getAttribute("style"), 1000);
	setCookie("thirteenthPurchaseRow", document.getElementById("thirteenthPurchaseRow").getAttribute("style"), 1000);
	setCookie("fourteenthPurchaseRow", document.getElementById("fourteenthPurchaseRow").getAttribute("style"), 1000);
	setCookie("fifteenthPurchaseRow", document.getElementById("fifteenthPurchaseRow").getAttribute("style"), 1000);

	setCookie("currentRealm", document.getElementById("currentRealm").innerHTML, 1000);
	setCookie("clickPerInterval", clickPerInterval, 1000);
	setCookie("clickCost", clickCost, 1000);
	setCookie("clickInterval", clickInterval, 1000);

	setCookie("passiveFights.maxPassiveFights", passiveFights.maxPassiveFights, 1000);
	setCookie("passiveFights.firstFightBought", passiveFights.firstFightBought, 1000);
	setCookie("passiveFights.secondFightBought", passiveFights.secondFightBought, 1000);
	setCookie("passiveFights.thirdFightBought", passiveFights.thirdFightBought, 1000);
	setCookie("passiveFights.fourthFightBought", passiveFights.fourthFightBought, 1000);
	setCookie("passiveFights.fifthFightBought", passiveFights.fifthFightBought, 1000);
	setCookie("passiveFights.sixthFightBought", passiveFights.sixthFightBought, 1000);
	setCookie("passiveFights.seventhFightBought", passiveFights.seventhFightBought, 1000);
	setCookie("passiveFights.eighthFightBought", passiveFights.eighthFightBought, 1000);
	setCookie("passiveFights.ninthFightBought", passiveFights.ninthFightBought, 1000);
	setCookie("passiveFights.tenthFightBought", passiveFights.tenthFightBought, 1000);
	setCookie("passiveFights.eleventhFightBought", passiveFights.eleventhFightBought, 1000);

	setCookie("passiveFights.firstFightCost", passiveFights.firstFightCost, 1000);
	setCookie("passiveFights.secondFightCost", passiveFights.secondFightCost, 1000);
	setCookie("passiveFights.thirdFightCost", passiveFights.thirdFightCost, 1000);
	setCookie("passiveFights.fourthFightCost", passiveFights.fourthFightCost, 1000);
	setCookie("passiveFights.fifthFightCost", passiveFights.fifthFightCost, 1000);
	setCookie("passiveFights.sixthFightCost", passiveFights.sixthFightCost, 1000);
	setCookie("passiveFights.seventhFightCost", passiveFights.seventhFightCost, 1000);
	setCookie("passiveFights.eighthFightCost", passiveFights.eighthFightCost, 1000);
	setCookie("passiveFights.ninthFightCost", passiveFights.ninthFightCost, 1000);
	setCookie("passiveFights.tenthFightCost", passiveFights.tenthFightCost, 1000);
	setCookie("passiveFights.eleventhFightCost", passiveFights.eleventhFightCost, 1000);

	setCookie("legacyUpgradesBought.legacyUpgradeOne", legacyUpgradesBought.legacyUpgradeOne, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeTwo", legacyUpgradesBought.legacyUpgradeTwo, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeThree", legacyUpgradesBought.legacyUpgradeThree, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeFour", legacyUpgradesBought.legacyUpgradeFour, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeFive", legacyUpgradesBought.legacyUpgradeFive, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeSix", legacyUpgradesBought.legacyUpgradeSix, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeSeven", legacyUpgradesBought.legacyUpgradeSeven, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeEight", legacyUpgradesBought.legacyUpgradeEight, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeNine", legacyUpgradesBought.legacyUpgradeNine, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeTen", legacyUpgradesBought.legacyUpgradeTen, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeEleven", legacyUpgradesBought.legacyUpgradeEleven, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeTwelve", legacyUpgradesBought.legacyUpgradeTwelve, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeThirteen", legacyUpgradesBought.legacyUpgradeThirteen, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeFourteen", legacyUpgradesBought.legacyUpgradeFourteen, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeFifteen", legacyUpgradesBought.legacyUpgradeFifteen, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeSixteen", legacyUpgradesBought.legacyUpgradeSixteen, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeSeventeen", legacyUpgradesBought.legacyUpgradeSeventeen, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeEighteen", legacyUpgradesBought.legacyUpgradeEighteen, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeNineteen", legacyUpgradesBought.legacyUpgradeNineteen, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeTwenty", legacyUpgradesBought.legacyUpgradeTwenty, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeTwentyone", legacyUpgradesBought.legacyUpgradeTwentyone, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeTwentytwo", legacyUpgradesBought.legacyUpgradeTwentytwo, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeTwentythree", legacyUpgradesBought.legacyUpgradeTwentythree, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeTwentyfour", legacyUpgradesBought.legacyUpgradeTwentyfour, 1000);
	setCookie("legacyUpgradesBought.legacyUpgradeTwentyfive", legacyUpgradesBought.legacyUpgradeTwentyfive, 1000);

	console.log("Saved!");
}, 60000);
