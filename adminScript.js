const client = Rapid.createClient
	('NDA1OWE0MWo1b3AzYjJ0LnJhcGlkLmlv')

client
	.channel('qPing')
	.subscribe()

// questionList = client.collection("questions")

const doc = 
	client
		.collection('questions')
		.newDocument()


var answerList = []

$('#answerOptions').on( {keyup: e => {
	if (e.which === 13) {
		// console.log("this" + $('#answerOptions > input:last').val())
		answerList.push($('#answerOptions > input:last').val())
		$('#answerOptions').append(
			$('<input id="answer" placeholder="Type answer option..." />'))
	}
}})

// $('button').on( { click: e => {
// 	console.log("button")
// 	console.log( answerList)
// 	client
// 		.channel('questions')
// 		.publish({
// 			question: $('#inputQuestion').val(),
// 			answerList: answerList
// 		})
// 	console.log("button")
// 	$('#inputQuestion').val('')
// 	$('#answer').val('')
// 	window.location.href = "chart.html";
// }})
$('button').on( { click: e => {
	console.log("button")
	console.log("doc <i></i>d = " + doc.id)
	console.log("question text = " + $('#inputQuestion').val())
	console.log( answerList)
	
	doc.mutate( {
		id: doc.id,
		questionText: $('#inputQuestion').val(),
		answerList: answerList
	})
	
	client
		.channel('qPing')
		.publish({
			questionID : doc.id
		})

	console.log("button")
	// $('#inputQuestion').val('')
	// $('#answer').val('')
	location.reload()
}})

$('#loginSubmit').on({ click: e =>{
	alert($('#inputEmail').val())
}});
