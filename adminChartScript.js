const client = Rapid.createClient
	('NDA1OWE0MWo1b3AzYjJ0LnJhcGlkLmlv')

qid = ""
dict = {}
let sub

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
			.subscribe( (data) => {
				console.log("confirm")
				console.log(data)
				data.forEach( (e) => {
					key = e.body.answers
					if (!(key in dict)) {
						dict[key] = 0
					}
					dict[key]++
				})
				// console.log("dict:")
				// console.log(dict)
			})
	})


