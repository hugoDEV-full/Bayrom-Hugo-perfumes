const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { authMiddleware, guestMiddleware } = require('../middleware/auth');

// Middleware para convidados (usuários não logados)
router.use(guestMiddleware);

// Página de login
router.get('/login', (req, res) => {
    res.render('client/auth/login', {
        title: 'Login - Bayrom & Hugo Parfums',
        description: 'Faça login em sua conta para acessar seus pedidos e favoritos.'
    });
});

// Processar login
router.post('/login', [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('A senha é obrigatória')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('error_msg', 'Email ou senha inválidos');
            return res.redirect('/auth/login');
        }

        const { email, password } = req.body;

        // Buscar usuário
        const user = await User.findOne({ where: { email } });
        if (!user) {
            req.flash('error_msg', 'Email ou senha inválidos');
            return res.redirect('/auth/login');
        }

        // Verificar senha
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            req.flash('error_msg', 'Email ou senha inválidos');
            return res.redirect('/auth/login');
        }

        // Verificar status do usuário
        if (user.status !== 'active') {
            req.flash('error_msg', 'Sua conta está desativada. Entre em contato com o suporte.');
            return res.redirect('/auth/login');
        }

        // Atualizar último login
        await user.update({ last_login: new Date() });

        // Criar sessão
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        // Redirecionar com base no papel do usuário
        const redirectTo = req.session.returnTo || (user.role === 'admin' ? '/admin' : '/');
        delete req.session.returnTo;

        req.flash('success_msg', `Bem-vindo(a) de volta, ${user.name}!`);
        res.redirect(redirectTo);
    } catch (error) {
        console.error('Erro no login:', error);
        req.flash('error_msg', 'Ocorreu um erro ao fazer login. Tente novamente.');
        res.redirect('/auth/login');
    }
});

// Página de registro
router.get('/register', (req, res) => {
    res.render('client/auth/register', {
        title: 'Criar Conta - Bayrom & Hugo Parfums',
        description: 'Crie sua conta e ganhe 10% de desconto na primeira compra.'
    });
});

// Processar registro
router.post('/register', [
    body('name').trim().isLength({ min: 3 }).withMessage('Nome deve ter pelo menos 3 caracteres'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
    body('password_confirm').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('As senhas não conferem');
        }
        return true;
    }),
    body('cpf').optional().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).withMessage('CPF inválido'),
    body('phone').optional().matches(/^\(\d{2}\) \d{5}-\d{4}$/).withMessage('Telefone inválido')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            req.flash('error_msg', errorMessages.join('. '));
            return res.redirect('/auth/register');
        }

        const { name, email, password, cpf, phone, birth_date, gender } = req.body;

        // Verificar se email já existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            req.flash('error_msg', 'Este email já está cadastrado');
            return res.redirect('/auth/register');
        }

        // Verificar se CPF já existe
        if (cpf) {
            const existingCpf = await User.findOne({ where: { cpf } });
            if (existingCpf) {
                req.flash('error_msg', 'Este CPF já está cadastrado');
                return res.redirect('/auth/register');
            }
        }

        // Criar usuário
        const user = await User.create({
            name,
            email,
            password,
            cpf,
            phone,
            birth_date,
            gender,
            role: 'client',
            status: 'active',
            email_verified: false
        });

        // Enviar email de verificação (implementar depois)
        // await sendVerificationEmail(user);

        req.flash('success_msg', 'Conta criada com sucesso! Faça login para continuar.');
        res.redirect('/auth/login');
    } catch (error) {
        console.error('Erro no registro:', error);
        req.flash('error_msg', 'Ocorreu um erro ao criar sua conta. Tente novamente.');
        res.redirect('/auth/register');
    }
});

// Esqueci minha senha - Página
router.get('/forgot-password', (req, res) => {
    res.render('client/auth/forgot-password', {
        title: 'Recuperar Senha - Bayrom & Hugo Parfums',
        description: 'Recupere sua senha de acesso.'
    });
});

// Processar recuperação de senha
router.post('/forgot-password', [
    body('email').isEmail().withMessage('Email inválido')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('error_msg', 'Email inválido');
            return res.redirect('/auth/forgot-password');
        }

        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            req.flash('error_msg', 'Email não encontrado em nosso sistema');
            return res.redirect('/auth/forgot-password');
        }

        // Gerar token de recuperação
        const resetToken = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: '1h' }
        );

        await user.update({
            password_reset_token: resetToken,
            password_reset_expires: new Date(Date.now() + 3600000) // 1 hora
        });

        // Enviar email de recuperação (implementar depois)
        // await sendPasswordResetEmail(user, resetToken);

        req.flash('success_msg', 'Enviamos um email com instruções para recuperar sua senha');
        res.redirect('/auth/login');
    } catch (error) {
        console.error('Erro na recuperação de senha:', error);
        req.flash('error_msg', 'Ocorreu um erro ao processar sua solicitação');
        res.redirect('/auth/forgot-password');
    }
});

// Resetar senha - Página
router.get('/reset-password/:token', async (req, res) => {
    try {
        const { token } = req.params;
        
        const user = await User.findOne({
            where: {
                password_reset_token: token,
                password_reset_expires: { [User.sequelize.Sequelize.Op.gt]: new Date() }
            }
        });

        if (!user) {
            req.flash('error_msg', 'Token inválido ou expirado');
            return res.redirect('/auth/forgot-password');
        }

        res.render('client/auth/reset-password', {
            title: 'Nova Senha - Bayrom & Hugo Parfums',
            description: 'Defina sua nova senha de acesso.',
            token
        });
    } catch (error) {
        console.error('Erro ao verificar token:', error);
        req.flash('error_msg', 'Ocorreu um erro ao processar sua solicitação');
        res.redirect('/auth/forgot-password');
    }
});

// Processar reset de senha
router.post('/reset-password/:token', [
    body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
    body('password_confirm').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('As senhas não conferem');
        }
        return true;
    })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            req.flash('error_msg', errorMessages.join('. '));
            return res.redirect(`/auth/reset-password/${req.params.token}`);
        }

        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            where: {
                password_reset_token: token,
                password_reset_expires: { [User.sequelize.Sequelize.Op.gt]: new Date() }
            }
        });

        if (!user) {
            req.flash('error_msg', 'Token inválido ou expirado');
            return res.redirect('/auth/forgot-password');
        }

        // Atualizar senha
        await user.update({
            password,
            password_reset_token: null,
            password_reset_expires: null
        });

        req.flash('success_msg', 'Senha atualizada com sucesso! Faça login com sua nova senha.');
        res.redirect('/auth/login');
    } catch (error) {
        console.error('Erro ao resetar senha:', error);
        req.flash('error_msg', 'Ocorreu um erro ao atualizar sua senha');
        res.redirect(`/auth/reset-password/${req.params.token}`);
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao fazer logout:', err);
        }
        res.redirect('/');
    });
});

// Verificar email
router.get('/verify-email/:token', async (req, res) => {
    try {
        const { token } = req.params;
        
        const user = await User.findOne({
            where: { email_verification_token: token }
        });

        if (!user) {
            req.flash('error_msg', 'Token de verificação inválido');
            return res.redirect('/auth/login');
        }

        await user.update({
            email_verified: true,
            email_verification_token: null
        });

        req.flash('success_msg', 'Email verificado com sucesso! Agora você pode fazer login.');
        res.redirect('/auth/login');
    } catch (error) {
        console.error('Erro na verificação de email:', error);
        req.flash('error_msg', 'Ocorreu um erro ao verificar seu email');
        res.redirect('/auth/login');
    }
});

module.exports = router;
