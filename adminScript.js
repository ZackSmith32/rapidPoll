const client = rapid.createClient('cmVhNi5yYXBpZC5pbw==')

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

$('#answerOptions').on( {keyup: e => {
	console.log("registering")
	if (e.which === 13) {
		console.log('submit answer')
		$('#answerOptions').append($('<input id="answer2" placeholder="Type answer option..." />'))
	}
}})

$('button').click( e => {
	client
		.channel('questions')
		.publish({
			question: $('#inputQuestion').val(),
			answers: $('#answerOptions')
		})
	$('#inputQuestion').val('')
})

