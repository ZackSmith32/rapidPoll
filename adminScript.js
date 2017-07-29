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
	.channel('qPing')
	.subscribe()

const doc = 
	client
		.collection('questions')
		.newDocument()

doc.mutate( {
	id: doc.id,
	question: "",
	answerList: []
})

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
	console.log("doc id = " + doc.id)
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
	$('#inputQuestion').val('')
	$('#answer').val('')
}})

