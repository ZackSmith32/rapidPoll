const client = Rapid.createClient
	('NDA1OWE0MWo1b3AzYjJ0LnJhcGlkLmlv')

// client
// 	.collection('messages2')
// 	.subscribe((messages, changes) => {
// 		console.log(messages)
// 		console.log(changes)
// 		changes.added.forEach(message => {
// 		$('#chatbox').append($('<div>').text(message.body.text))
// 	})
//   })

client
	.channel('questions')
	.subscribe()
/*
$('#inputQuestion').keyup(e => {
	if (e.which === 13) {
		client
			.channel('questions')
			.publish({
				question: $('#inputQuestion').val()
			})
		$('#inputQuestion').val('')
	}
})
*/

var answerList = []

$('#answerOptions').on( {keyup: e => {
	if (e.which === 13) {
		// console.log("this" + $('#answerOptions > input:last').val())
		answerList.push($('#answerOptions > input:last').val())
		$('#answerOptions').append(
			$('<input id="answer" placeholder="Type answer option..." />'))
	}
}})

$('button').on( { click: e => {
	console.log("button")
	console.log( answerList)
	client
		.channel('questions')
		.publish({
			question: $('#inputQuestion').val(),
			answerList: answerList
		})
	console.log("button")
	$('#inputQuestion').val('')
	$('#answer').val('')
}})

