
// Get a reference to the database service
var database = firebase.database();
var foodRef = firebase.database().ref('-L8TLHWMk4WU080wGILX/');
var food;
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
    food = data.val().food;
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
});


function updateNutrition(food) {
  for (var i = food.length - 1; i >= 0; i--) {
    var foodName = food[i].name;
    var numCalories = food[i].calories;

    var d = new Date(food[i].timestamp);
    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes();
    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours();
    ampm = d.getHours() >= 12 ? 'PM' : 'AM';
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    time = days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours%12+':'+minutes+' '+ampm;

    $('.content.nutrition .content-list').append('<div class="content-box"><h3>' + time + '</h3><h4>Food Item: </h4><p>' + foodName + '</p><br><br><h4>Calories: </h4><p>' + numCalories + '</p></div>');
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
}

function addFood(foodName, numCalories) {
  food.push({
    name: foodName,
    calories: numCalories,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  });
  firebase.database().ref('-L8TLHWMk4WU080wGILX/').set({
    food: food
  });
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
		document.querySelector('#demo-echo').textContent = event.results[0][0].transcript;
	};
};

(function() {
  $('#start-button').on('click', startListening);
  console.log('rpressed');
})();
