const client = Rapid.createClient
	('NDA1OWE0MWo1b3AzYjJ0LnJhcGlkLmlv')
const un = 'zack'

console.log("userScript")


client
	.channel('qPing')
	.subscribe( 
		(qID) => {
			// $('#questiondiv').text(question.question)
			// question.answerList.foreach( (val, i, a) => {
			// 	$('#`answerBox').
			// })

			console.log(qID.questionID)

			question = 
				client
					.collection("questions")
					.filer({ 'id' : qID.questionID })
					.subscribe( q => {
						console.log(q.questionText)
					})

		}
	)
/*
$('#input').keyup(e => {
	if (e.which === 13) {
	var doc= client
			.collection('messages2')
			.newDocument() ;
doc.id
	doc		.mutate({ id: doc.id,
		text: $('#input').val(),
				name: un})
		$('#input').val('')
	}
})
*/

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
}})
