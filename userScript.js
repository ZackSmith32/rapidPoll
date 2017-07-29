const client = Rapid.createClient
	('NDA1OWE0MWo1b3AzYjJ0LnJhcGlkLmlv')
const un = 'zack'

/*
client
  .collection('messages2')
  .subscribe((messages, changes) => {
	console.log(messages)
	console.log(changes)
	changes.added.forEach(message => {
	  $('#chatbox').append($('<div>').text(message.body.text))
	})
  })
*/

client
	.channel('questions')
	.subscribe( 
		question => {
			$('#questiondiv').text(question.question)
			console.log(question.answerList)
		}
	)

client
	.channel('answers')
	.subscribe( answers => {
		console.log(answers)
		$('#questiondiv').text(answers.answers)
	})

$('#input').keyup(e => {
	if (e.which === 13) {
		client
			.collection('messages2')
			.newDocument()
			.mutate({ text: $('#input').val(),
				name: un})
		$('#input').val('')
	}
})


