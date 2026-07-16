const path=require('path');
const express=require('express');

const app=express();

const adminRoutes=require('./routes/adminRoutes');

const shopRoutes=require('./routes/shopRoutes');

const errorController = require('./controllers/error');


app.set('view engine', 'ejs');
app.set('views','views');


app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);


app.listen(3000);



