const client = Rapid.createClient
	('NDA1OWE0MWo1b3AzYjJ0LnJhcGlkLmlv')
const un = 'zack'
var g_qid = 0

answerDoc = client
	.collection('results')
	.newDocument()

/*
 * when ping is received, look up question in database
 * 	and update html with question text
*/
client
	.channel('qPing')
	.subscribe( 
		(qID) => {
			console.log("qID = " + qID.questionID)
			console.log($('#response'))
			$('#answerBox').empty()

			// $('#answerBox').children().each( function() {
			// 	console.log("this:")
			// 	console.log(this)
			// 	$(this).remove()
			// })
			// $('#response').each( function() {
			// 	this.remove()
			// })

			g_qid = qID.questionID
			question = 
				client
					.collection("questions")
					.filter({ 'id' : qID.questionID })
					.subscribe( q => {
						console.log(q)
						console.log("question text : " + q[0].body.questionText)
						// console.log("question answers : " + q[0].body.answerList)
						$('#questiondiv').text(q[0].body.questionText)
						q[0].body.answerList.forEach( item => {
							$('#answerBox').append(
								'<input type="button" id="response" value='+ item +'>')
						}
							
						)
					})
		}
	)


/*
every time a response is clicked
*/
$('#answerBox').on("click", "input", e => {
	console.log("click")
	console.log(e.currentTarget.value)
	console.log(g_qid)
	// console.log(this.text)

	$('#chosenAnswer').text(e.currentTarget.value)
	answerDoc
		.mutate( {
			questionID : g_qid,
			answers : e.currentTarget.value,
			username : un
		})
})
