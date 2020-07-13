const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res) => {
	res.render('search');	
});

app.get('/results', (req,res) => {
	const title = req.query.title;
	console.log(req.query);
	request(`http://www.omdbapi.com/?s=${title}&apikey=thewdb`,(error,response,body) => {
		if(!error && response.statusCode === 200) {
			const data = JSON.parse(body);
			res.render('results',{data: data});
		}else {
			console.log(error);
		}
	});
});



app.listen(process.env.PORT,process.env.IP, () => {
	console.log('movie app started');
});