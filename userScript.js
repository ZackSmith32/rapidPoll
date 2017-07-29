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
			console.log(question.id)
		}
	)

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

var testUserData = {
	questionID : 42,
	answers : ['me', 'myself', 'and I'],
	username : 'zsmith'
}

// every time a response is clicked                
$('#response').on( {'click' : e => {
	client
		.collection('results')
		.mutate( {
			questionID : testUserData.questionID,
			answers : testUserData.answers,
			username : testUserData.username
		})
	
})
