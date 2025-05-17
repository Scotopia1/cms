// controllers/authController.js

const getLoginPage = (req, res) => {
    res.render('auth/login', {
        title: 'Sign In - Command',
        layout: false
    });
};

const getSignupPage = (req, res) => {
    res.render('auth/signup', {
        title: 'Create Account - Command',
        layout: false
    });
};

const postLogin = (req, res) => {
    const { email, password } = req.body;
    // Placeholder for actual authentication logic
    console.log('Login attempt:', { email, password });
    // On successful login:
    // req.session.user = { email }; // Example of setting a session
    res.redirect('/dashboard');
};

const postSignup = (req, res) => {
    const { firstName, lastName, email, password, companyName } = req.body;
    // Placeholder for actual user creation logic
    console.log('Signup attempt:', { firstName, lastName, email, password, companyName });
    res.redirect('/login');
};

const getLogout = (req, res) => {
    // Placeholder for actual logout logic
    // req.session.destroy(err => {
    //     if (err) {
    //         return res.redirect('/dashboard');
    //     }
    //     res.clearCookie('connect.sid');
    //     res.redirect('/login');
    // });
    console.log('Logout attempt');
    res.redirect('/login');
};


module.exports = {
    getLoginPage,
    getSignupPage,
    postLogin,
    postSignup,
    getLogout
};