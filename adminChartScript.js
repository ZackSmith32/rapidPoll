const client = Rapid.createClient
	('NDA1OWE0MWo1b3AzYjJ0LnJhcGlkLmlv')

qid = ""
let sub
let dict

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
			.subscribe( (data, changes) => {
				dict = {}
				console.log("confirm")
				console.log(data)
				console.log(changes)
				data.forEach( (e) => {
					key = e.body.answers
					if (!(key in dict)) {
						dict[key] = 0
					}
					dict[key]++
				})
				console.log("dict:")
				console.log(dict)
			})
	})


