const path = require('node:path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const globalError = require('./controllers/errorController');

// ROUTES

const userRouter = require('./routes/userRoutes');
const projectRouter = require('./routes/projectRoutes');
const sprintRouter = require('./routes/sprintRoutes');
const userStoryRouter = require('./routes/UserStoryRoutes');

const app = express();

if (process.env.NODE_ENV === 'developpement') {
    app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));
app.use(
    express.urlencoded({ extended: true, limit: '10kb' })
);
app.use(cookieParser());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/users/', userRouter);
app.use('/api/v1/projects/', projectRouter);
app.use('/api/v1/sprints/', sprintRouter);
app.use('/api/v1/userstory/', userStoryRouter);

app.all('*', (err, req, res, next) => {
    return next(
        new AppError(
            `une aucune page ne correspond a cet ${req.originalUrl}`,
            404
        )
    );
});

app.use(globalError);

module.exports = app;
