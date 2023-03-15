const { register, login, setAvatar, gtAllUsers } = require('../controllers/userController');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/set_avatar/:id', setAvatar);
router.get('/all_users/:id', gtAllUsers);

module.exports = router;