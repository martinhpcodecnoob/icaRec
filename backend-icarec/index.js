const app = require('./app')

app.set('port', process.env.PORT || 3004)

app.listen(app.get('port'), () => {
    console.log(`Server listening at port ${app.get('port')}`);
})