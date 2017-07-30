const client = Rapid.createClient
	('NDA1OWE0MWo1b3AzYjJ0LnJhcGlkLmlv')

qid = ""
let sub
let dict

console.log("adminChartScipt.js")

client
	.channel("qPing")
	.subscribe( (ping) => {
		qid = ping.questionID
		console.log(qid)
		if (sub) {
			sub.unsubscribe()
		}
		sub = client
			.collection("results")
			.filter({'questionID' : qid})
			.subscribe( (data, changes) => {
				dict = {}
				console.log("confirm")
				console.log(data)
				console.log(changes)
				data.forEach( (e) => {
					key = e.body.answers
					if (!(key in dict)) {
						dict[key] = 0
					}
					dict[key]++
				})
				console.log("dict:")
				console.log(dict)
				drawFunc(dict)
			})
	})

// $(function() {
// 	let userResponse = {
// 		'zack' : 5,
// 		'wyatt' : 9,
// 		'greg' : 8
// 	}

// 	drawFunc(userResponse)
// }) 



var drawFunc = function(data) {

	// window.onload = function () {
		// initial values of dataPoints
		var dps = []
		for(var inx in data){
			dps.push({label: inx, y: data[inx]})
		}
		
		 var questionTitle = "Question???  -- answers: 42";
		
		
		//this should be turned into a init graph function
		var chart = new CanvasJS.Chart("chartContainer",{
			theme: "theme3",
			title:{ 
				// text: "Question currently being asked."
			},
			axisY: {				
				title: "Poll results"
			},					
			legend:{
				verticalAlign: "top",
				horizontalAlign: "centre",
				fontSize: 16

			},
			data : [{
				type: "column",
				//showInLegend: true,
				//legendMarkerType: "none",
				//legendText: questionTitle,
				//indexLabel: "{y}",
				dataPoints: dps
			}]
		});

		// renders initial chart
		chart.render();
		
		var updateInterval = 10;
		//this will be called eachtime rapid responds
		var updateChart = function () {
			//take in json object, and parse into label array
			//then  render
			chart.render();
		};
		//update chart after we've heard back from rapid.
		// setInterval( function(){ updateChart() }, updateInterval );
	// }

}
