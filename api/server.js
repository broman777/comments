const chalk = require('chalk');
const mongoose = require('mongoose');
const fastify = require('fastify')();
const Comment = require('./models/comment');
const User = require('./models/User');

const PORT = process.env.port || 3000;

fastify
    .register(require('fastify-cors'))
    .register(require('fastify-jwt'), {
        secret: 'bratenko'
    })
    .decorate('verifyJWTandLevel', function (request, reply, done) {
        console.log()
        // const bearerHeader = req.headers['authorization'];
        // if (typeof bearerHeader !== 'undefined') {
            
        // } else {
        //     res.sendStatus(403);
        // }
        done() // pass an error if the authentication fails
    })
    .get('/comments', async (req, reply) => {
        const comments = await Comment.find({})
        reply.send({ comments })
    })
    .post('/write', async (req, reply) => {
        const text = req.body.text
        const comment = new Comment({
            text,
            name: 'Ruslan',
            surname: 'Bratenko'
        })
        await comment.save()
        reply.send('comment sent')
    })
    .post('/register', async (req, reply) => {
        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            username: req.body.username,
            password: req.body.password
        })
        await user.save()
        const token = fastify.jwt.sign()
        res.send({ token })
    })
    .post('/login', (req, reply) => {
        const user = req.body.username
        const token = fastify.jwt.sign({ user })
        reply.jwtSign({ token })
    })

async function startServer() {
    try {
        await mongoose.connect('mongodb+srv://admin:qwe123@cluster0-5avib.mongodb.net/comments', {
            useNewUrlParser: true,
            useFindAndModify: false
        })
        fastify.listen(PORT, (err, addr) => {
            if (err) {
                console.log(err);
                process.exit(1);
            } else {
                console.log(chalk.green(`Server has been started on port ${PORT}`));
            }
        });
    } catch (e) {
        console.log(chalk.red(e))
    }
}

startServer()