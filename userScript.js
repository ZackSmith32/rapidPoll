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

			console.log("qID = " + qID.questionID)

			question = 
				client
					.collection("questions")
					.filter({ 'id' : qID.questionID })
					.subscribe( q => {
						
						console.log("question text : " + q[0].body.questionText)
						$('#questiondiv').text(q[0].body.questionText)
						q[0].body.answerList.forEach( item => {
							$('#answerBox').append(
								'<input type="button" id="response" value='+ item +'>')
						}
							
						)
					})

		}
	)


// function clickHandle() {
// 	this
// }


// every time a response is clicked                
// $('input:button').click( (e) => {
$('#answerBox').on("click", "input", e => {
	console.log("click")
	console.log(e.currentTarget.value)
	console.dir(e)
	// console.log(this.text)

	// console.log(e.val())
	// console.log("answer selected" + e.val())
	$('#chosenAnswer').text(e.currentTarget.value)
	// client
	// 	.collection('results')
	// 	.mutate( {
	// 		questionID : testUserData.questionID,
	// 		answers : testUserData.answers,
	// 		username : testUserData.username
	// 	})
})

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


