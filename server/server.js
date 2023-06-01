import express from 'express'
import config from './config/config.js'

import authRouter from './controllers/auth.js'
import surveyRouter from './controllers/survey.js'
import centerRouter from './controllers/center.js'
import informationRouter from './controllers/information.js'
import router from './controllers/user.js'

import cors from 'cors';
import bcrypt from 'bcryptjs';

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', authRouter)
app.use('/', surveyRouter)
app.use('/', centerRouter);
app.use('/', informationRouter);
app.use('/', router)

app.set('port', config.port)


app.listen(app.get('port'), () => {
    console.log("Server is running on port", app.get('port'))
});

/*
async function generatePassword() {
  try {
    const salt = await bcrypt.genSalt(12);
    const password = await bcrypt.hash('Welcome12#', salt);
    return password;
  } catch (error) {
    console.log(error);
  }
}

generatePassword()
  .then((password) => console.log(password))
  .catch((error) => console.log(error));
*/