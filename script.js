
// Get a reference to the database service
var database = firebase.database();
var foodRef = firebase.database().ref('-L8TLHWMk4WU080wGILX/');
var food = [];
var calorieLabels;
var nameLabels;

var tempFood = [
  {
    name: 'Apple',
    calories: 1,
    timestamp: 0
  },
  {
    name: 'Orange',
    calories: 2,
    timestamp: 0
  },
  {
    name: 'Coconut',
    calories: 3,
    timestamp: 0
  }
];

$(document).ready(function() {
  $('.tab.left').click(function() {
    $('.content').css('display', 'none');
    $('.content.nutrition').css('display', 'block');
    $('.tab').removeClass('selected');
    $('.tab.left').addClass('selected');
  });

  $('.tab.middle').click(function() {
    $('.content').css('display', 'none');
    $('.content.events').css('display', 'block');
    $('.tab').removeClass('selected');
    $('.tab.middle').addClass('selected');
  });

  $('.tab.right').click(function() {
    $('.content').css('display', 'none');
    $('.content.lifestyle').css('display', 'block');
    $('.tab').removeClass('selected');
    $('.tab.right').addClass('selected');
  });

  foodRef.on('value', function(data) {
    console.log(data.val().food);

    if (data.val().food) {
      food = data.val().food;
    } else {
      food = [];
    }
    
    updateNutrition(food);
  });

  var foodCtx = document.getElementById("foodChart").getContext('2d');

  this.lineChart = new Chart(foodCtx, {
    type: 'line',
    options: {
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.yLabel;
          }
        }
      }
    },
    data: {
      labels: ["", "", "", "", "", "", ""],
      datasets: [
        {
          label: "Dataset",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40],
          spanGaps: false,
        }
      ]
    }
  });

  $('#start-button').on('click', startListening);
  console.log('rpressed');
});


function updateNutrition(food) {
  $('.content.nutrition .content-list').empty();
  for (var i = food.length - 1; i >= 0; i--) {
    var foodName = food[i].name;
    var numCalories = food[i].calories;

    var d = new Date(food[i].timestamp);
    
    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes();
    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours();
    ampm = d.getHours() >= 12 ? 'PM' : 'AM';
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    hellotime = days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours%12+':'+minutes+' '+ampm;

    $('.content.nutrition .content-list').append('<div class="content-box"><h3>' + hellotime + '</h3><h4>Food Item: </h4><p>' + foodName + '</p><br><br><h4>Calories: </h4><p>' + numCalories + '</p></div>');
    
  }

  calorieLabels = [];
  nameLabels = [];
  var calorieCounter = 0;

  for (var j = 0; j < food.length; j++) {
    calorieCounter += food[j].calories;
    nameLabels.push('');
    calorieLabels.push(calorieCounter);
    $("#totalCalories").html("Total Calories Today: " + calorieCounter);
  }

  var foodCtx = document.getElementById("foodChart").getContext('2d');

  this.lineChart = new Chart(foodCtx, {
    type: 'line',
    options: {
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.yLabel;
          }
        }
      }
    },
    data: {
      labels: nameLabels,
      datasets: [
        {
          label: "Dataset",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: calorieLabels,
          spanGaps: false,
        }
      ]
    }
  });

  var sleepCtx = document.getElementById("sleepChart").getContext('2d');

  this.lineChart = new Chart(sleepCtx, {
    type: 'line',
    options: {
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.yLabel;
          }
        }
      }
    },
    data: {
      labels: ["Mar 22", "Mar 23", "Mar 24", "Mar 25"],
      datasets: [
        {
          label: "Dataset",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [6.2, 6.15, 8.5, 8.1],
          spanGaps: false,
        }
      ]
    }
  });
}

function addFood(foodName, numCalories) {
  if (food) {
    food.push({
      name: foodName,
      calories: numCalories,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    });
  } else {
    food = {
      name: foodName,
      calories: numCalories,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    };
  }
  firebase.database().ref('-L8TLHWMk4WU080wGILX/food').set(
    food
  );
  console.log(food);
}

function startListening() {
	var recognition = new (webkitSpeechRecognition || SpeechRecognition)();
	recognition.lang = 'en-US';
	recognition.interimResults = false;
	recognition.maxAlternatives = 1;
	recognition.start();

	[
	 'onaudiostart',
	 'onaudioend',
	 'onend',
	 'onerror',
	 'onnomatch',
	 'onresult',
	 'onsoundstart',
	 'onsoundend',
	 'onspeechend',
	 'onstart'
	].forEach(function(eventName) {
		recognition[eventName] = function(e) {
			console.log(eventName, e);
		};
	});

	document.querySelector('#start-button').innerHTML = 'Listening...';

	recognition.onend = function() {
		document.querySelector('#start-button').innerHTML = 'Start Listening';
	};
	recognition.onresult = function() {
    var message = event.results[0][0].transcript;
    $('#conversation').append('<p>' + message + '</p>');

    if (message.includes('ate') || message.includes('eat')) {
      message = message.split(' ');

      for (var a = 0; a < message.length; a++) {
        if (message[a].toLowerCase() == 'ate' || message[a].toLowerCase() == 'eat') {
          newMessage = message[a + 1];
        }
      }

      for (var j = 0; j < foodObject.length; j++) {
        if (foodObject[j].food.toLowerCase().includes(newMessage.toLowerCase())) {
          var foodTemp = foodObject[j].food;
          var caloriesTemp = foodObject[j].calories;
          $('#conversation').append('<p>Adding ' + foodTemp + ' with ' + caloriesTemp + ' calories.</p>');
          addFood(foodTemp, caloriesTemp);
          updateNutrition(food);
          break;
        }
      }
    }

	};
};


var foodObject = [
  {
     "food":"Veal, variety meats and by-products, tongue, cooked, braised - 3 oz"
    ,"calories":171
  },
  {
     "food":"Babyfood, cereal, barley, dry - 0.5 oz"
    ,"calories":56
  },
  {
     "food":"Broadbeans (fava beans), mature seeds, raw - 1 cup"
    ,"calories":511
  },
  {
     "food":"Beef, chuck eye steak, boneless, separable lean and fat, trimmed to 0\" fat, all grades, raw - 1 steak"
    ,"calories":856
  },
  {
     "food":"Cheese, cottage, creamed, large or small curd - 1 cup, large curd (not packed)"
    ,"calories":205
  },
  {
     "food":"PREGO Pasta, Chunky Garden Mushroom and Green Pepper Italian Sauce, ready-to-serve - 1 serving 1/2 cup"
    ,"calories":89
  },
  {
     "food":"McDONALD'S, Apple Dippers with Low Fat Caramel Sauce - 1 item"
    ,"calories":98
  },
  {
     "food":"CAMPBELL'S CHUNKY Soups, Sizzlin' Steak- Grilled Steak Chili with Beans - 1 serving"
    ,"calories":198
  },
  {
     "food":"Chicken, broilers or fryers, drumstick, meat only, cooked, fried - 1 drumstick, bone and skin removed"
    ,"calories":81
  },
  {
     "food":"Babyfood, oatmeal cereal with fruit, dry, instant, toddler - 1 tbsp"
    ,"calories":21
  },
  {
     "food":"Vinegar, red wine - 1 cup"
    ,"calories":45
  },
  {
     "food":"Formulated bar, MARS SNACKFOOD US, SNICKERS Marathon Energy Bar, all flavors - 1 bar"
    ,"calories":169
  },
  {
     "food":"Fish, butterfish, raw - 3 oz"
    ,"calories":124
  },
  {
     "food":"Snacks, rice cakes, brown rice, multigrain, unsalted - 2 cakes"
    ,"calories":69
  },
  {
     "food":"KELLOGG'S, EGGO, NUTRI-GRAIN Frozen Fruit Pizza, Strawberry Granola - 1 pizza"
    ,"calories":399
  },
  {
     "food":"Pork, cured, ham with natural juices, spiral slice, boneless, separable lean and fat, heated, roasted - 1 slice"
    ,"calories":201
  },
  {
     "food":"Carrot juice, canned - 1 fl oz"
    ,"calories":11
  },
  {
     "food":"Babyfood, vegetables, sweet potatoes, junior - 1 jar Beech-Nut Stage 3 (6 oz)"
    ,"calories":102
  },
  {
     "food":"Cereals, MAYPO, dry - 1 cup"
    ,"calories":361
  },
  {
     "food":"Tea, herb, chamomile, brewed - 1 fl oz"
    ,"calories":0
  },
  {
     "food":"CAMPBELL'S Red and White, DORA THE EXPLORER Kidshapes Soup, condensed - 1 serving 1/2 cup"
    ,"calories":79
  },
  {
     "food":"Frankfurter, beef, pork, and turkey, fat free - 1 frank 1 NLEA serving"
    ,"calories":62
  },
  {
     "food":"Sandwich spread, with chopped pickle, regular, unspecified oils - 1 tablespoon"
    ,"calories":58
  },
  {
     "food":"KENTUCKY FRIED CHICKEN, Fried Chicken, ORIGINAL RECIPE, Breast, meat and skin with breading - 1 breast, bone and skin removed"
    ,"calories":280
  },
  {
     "food":"Stew, dumpling with mutton (Navajo) - 1 serving"
    ,"calories":311
  },
  {
     "food":"Chicken, broilers or fryers, dark meat, meat only, cooked, fried - 1 cup"
    ,"calories":334
  },
  {
     "food":"Beef, top sirloin, steak, separable lean and fat, trimmed to 1/8\" fat, choice, cooked, broiled - 3 oz"
    ,"calories":218
  },
  {
     "food":"Fish, mackerel, Pacific and jack, mixed species, raw - 3 oz"
    ,"calories":134
  },
  {
     "food":"Brussels sprouts, cooked, boiled, drained, without salt - 1 sprout"
    ,"calories":7
  },
  {
     "food":"Bread, pumpernickel - 1 slice (5\" x 4\" x 3/8\")"
    ,"calories":80
  },
  {
     "food":"Pears, canned, juice pack, solids and liquids - 1 cup, halves"
    ,"calories":124
  },
  {
     "food":"Babyfood, dessert, fruit dessert, without ascorbic acid, junior - 1 tbsp"
    ,"calories":9
  },
  {
     "food":"Pork, fresh, leg (ham), rump half, separable lean only, raw - 1 roast"
    ,"calories":4742
  },
  {
     "food":"Frankfurter, meat and poultry, low fat - 1 cup, sliced"
    ,"calories":173
  },
  {
     "food":"Beans, snap, canned, all styles, seasoned, solids and liquids - 0.5 cup"
    ,"calories":18
  },
  {
     "food":"Babyfood, fruit, pears and pineapple, junior - 1 tbsp"
    ,"calories":7
  },
  {
     "food":"Sausage, Berliner, pork, beef - 1 oz"
    ,"calories":65
  },
  {
     "food":"MISSION FOODS, MISSION Flour Tortillas, Soft Taco, 8 inch - 1 serving"
    ,"calories":146
  },
  {
     "food":"Guava nectar, canned - 1 cup"
    ,"calories":143
  },
  {
     "food":"Bagels, cinnamon-raisin - 1 medium bagel (3-1/2\" to 4\" dia)"
    ,"calories":287
  },
  {
     "food":"Lamb, New Zealand, imported, frozen, composite of trimmed retail cuts, separable lean and fat, cooked - 1 piece, cooked, excluding refuse (yield from 1 lb raw meat with refuse)"
    ,"calories":677
  },
  {
     "food":"Snacks, tortilla chips, plain, white corn - 1 oz"
    ,"calories":138
  },
  {
     "food":"Luncheon meat, pork, canned - 1 slice (4-1/4\" x 4-1/4\" x 1/16\")"
    ,"calories":70
  },
  {
     "food":"CAMPBELL'S SELECT Soup, Roasted Chicken with Rotini & Penne Pasta Soup - 1 cup"
    ,"calories":90
  },
  {
     "food":"Seeds, cottonseed meal, partially defatted (glandless) - 1 oz"
    ,"calories":104
  },
  {
     "food":"Beef, tenderloin, steak, separable lean and fat, trimmed to 0\" fat, all grades, cooked, broiled - 3 oz"
    ,"calories":185
  },
  {
     "food":"Restaurant, Latino, arroz con leche (rice pudding) - 1 cup"
    ,"calories":369
  },
  {
     "food":"Cereals, oats, instant, fortified, plain, dry - 1 packet"
    ,"calories":101
  },
  {
     "food":"Pickles, cucumber, sour, low sodium - 1 large (4\" long)"
    ,"calories":14
  },
  {
     "food":"Chicken, broilers or fryers, giblets, raw - 1 unit (yield from 1 lb ready-to-cook chicken)"
    ,"calories":28
  },
  {
     "food":"Candies, HERSHEY, KIT KAT BIG KAT Bar - 1 bar king size 2.8 oz"
    ,"calories":410
  },
  {
     "food":"Cookies, marshmallow, chocolate-coated (includes marshmallow pies) - 1 oz"
    ,"calories":119
  },
  {
     "food":"Snacks, potato chips, made from dried potatoes, cheese-flavor - 1 oz"
    ,"calories":156
  },
  {
     "food":"Infant formula, NESTLE, GOOD START SOY, with DHA and ARA, ready-to-feed - 1 oz"
    ,"calories":18
  },
  {
     "food":"Eggplant, raw - 1 eggplant, unpeeled (approx 1-1/4 lb)"
    ,"calories":137
  },
  {
     "food":"Water, bottled, POLAND SPRING - 1 cup 8 fl oz"
    ,"calories":0
  },
  {
     "food":"Chicken, broilers or fryers, dark meat, meat only, raw - 0.5 chicken, bone and skin removed"
    ,"calories":227
  },
  {
     "food":"Jew's ear, (pepeao), raw - 1 piece"
    ,"calories":1
  },
  {
     "food":"Beef, ground, 95% lean meat / 5% fat, patty, cooked, pan-broiled - 1 serving ( 3 oz )"
    ,"calories":139
  },
  {
     "food":"Cookies, ladyfingers, without lemon juice and rind - 1 anisette sponge (4\" x 1-1/8\" x 7/8\")"
    ,"calories":47
  },
  {
     "food":"Alcoholic beverage, wine, cooking - 1 fl oz"
    ,"calories":14
  },
  {
     "food":"Turkey, all classes, light meat, cooked, roasted - 1 serving"
    ,"calories":124
  },
  {
     "food":"Beef, round, knuckle, tip center, steak, separable lean and fat, trimmed to 0\" fat, select, cooked, grilled - 1 steak"
    ,"calories":259
  },
  {
     "food":"Salad dressing, french dressing, reduced fat, without salt - 1 cup"
    ,"calories":605
  },
  {
     "food":"Bread, raisin, unenriched - 1 oz"
    ,"calories":77
  },
  {
     "food":"Pie, pumpkin, prepared from recipe - 1 piece (1/8 of 9\" dia)"
    ,"calories":316
  },
  {
     "food":"Beef, plate steak, boneless, inside skirt, separable lean only, trimmed to 0\" fat, select, raw - 1 steak"
    ,"calories":570
  },
  {
     "food":"Pork, fresh, composite of trimmed retail cuts (loin and shoulder blade), separable lean only, cooked - 1 piece, cooked, excluding refuse (yield from 1 lb raw meat with refuse)"
    ,"calories":497
  },
  {
     "food":"Babyfood, meat, chicken, strained - 1 jar Heinz Strained-2 (2.5 oz)"
    ,"calories":92
  },
  {
     "food":"Syrups, table blends, cane and 15% maple - 1 cup"
    ,"calories":875
  },
  {
     "food":"Peaches, raw - 1 large (2-3/4\" dia)"
    ,"calories":68
  },
  {
     "food":"Crackers, melba toast, rye (includes pumpernickel) - 0.5 oz"
    ,"calories":55
  },
  {
     "food":"Carbonated beverage, cola, contains caffeine - 1 cup large fast food, 32 fl oz capacity, weight of the drink only  with no ice added"
    ,"calories":267
  },
  {
     "food":"Chives, freeze-dried - 1 tbsp"
    ,"calories":0
  },
  {
     "food":"Spices, curry powder - 1 tbsp"
    ,"calories":20
  },
  {
     "food":"New zealand spinach, cooked, boiled, drained, with salt - 1 cup, chopped"
    ,"calories":21
  },
  {
     "food":"Butter, without salt - 1 tbsp"
    ,"calories":101
  },
  {
     "food":"Veal, breast, plate half, boneless, separable lean and fat, cooked, braised - 1 piece, cooked, excluding refuse (yield from 1 lb raw meat with refuse)"
    ,"calories":820
  },
  {
     "food":"Syrups, malt - 1 tbsp"
    ,"calories":66
  },
  {
     "food":"Bread, wheat - 1 slice"
    ,"calories":78
  },
  {
     "food":"Veal, variety meats and by-products, pancreas, cooked, braised - 1 unit, cooked (yield from 1 lb raw meat)"
    ,"calories":614
  },
  {
     "food":"Pork, fresh, variety meats and by-products, spleen, raw - 4 oz"
    ,"calories":112
  },
  {
     "food":"Fast foods, biscuit, with egg, cheese, and bacon - 1 item"
    ,"calories":436
  },
  {
     "food":"Frankfurter, beef, low fat - 1 cup, sliced"
    ,"calories":347
  },
  {
     "food":"McDONALD'S, Bacon, Egg & Cheese McGRIDDLES - 1 item 5.8 oz"
    ,"calories":448
  },
  {
     "food":"English muffins, whole-wheat - 1 oz"
    ,"calories":57
  },
  {
     "food":"Tofu, raw, regular, prepared with calcium sulfate - 0.5 cup"
    ,"calories":94
  },
  {
     "food":"Oil, oat - 1 tbsp"
    ,"calories":120
  },
  {
     "food":"Frostings, cream cheese-flavor, ready-to-eat - 2 tbsp creamy"
    ,"calories":136
  },
  {
     "food":"Onions, cooked, boiled, drained, with salt - 1 slice large (1/4\" thick)"
    ,"calories":13
  },
  {
     "food":"Chicken, broiler, rotisserie, BBQ, wing meat and skin - 1 wing"
    ,"calories":131
  },
  {
     "food":"MORNINGSTAR FARMS Asian Veggie Patties, frozen, unprepared - 1 patty"
    ,"calories":103
  },
  {
     "food":"Candies, MARS SNACKFOOD US, MILKY WAY Midnight Bar - 1 bar fun size"
    ,"calories":84
  },
  {
     "food":"Onions, frozen, chopped, cooked, boiled, drained, with salt - 0.5 cup, chopped or diced"
    ,"calories":27
  },
  {
     "food":"Beef, shoulder pot roast or steak, boneless, separable lean only, trimmed to 0\" fat, all grades, raw - 1 roast"
    ,"calories":1618
  },
  {
     "food":"Snacks, trail mix, tropical - 1.5 oz"
    ,"calories":185
  },
  {
     "food":"Cake mix, dry, white, regular - 1 oz"
    ,"calories":105
  },
  {
     "food":"Chicken, broiler, rotisserie, BBQ, back meat and skin - 1 back"
    ,"calories":456
  },
  {
     "food":"Turkey, skin from whole, (light and dark), raw - 1 lb"
    ,"calories":1843
  }];
