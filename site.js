const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
const port = 80;

app.use('/static', express.static("static"));
app.use(express.urlencoded({ extended: true }));

app.set('views engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
	res.status(200).render("home.pug");
});

app.get('/contact', (req, res) => {
	res.status(200).render('contact.pug');
});

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect("mongodb://localhost:27017/contactdance");
}

const contactSchema = new mongoose.Schema({
	name: String,
	phone: String,
	email: String,
	address: String,
	more: String
});
const Contact = mongoose.model('contact', contactSchema);

app.post('/contact', (req, res) => {

	const myData = new Contact(req.body);
	myData.save().then(() => {
		res.send("This item has been saved to the database");
	}).catch(() => {

		res.send("Item was not saved to the database")
	})
	//  res.status(200).render('contact.pug');
});

app.listen(port, () => {
	console.log(`This is run by scuress the ${port}`);
});