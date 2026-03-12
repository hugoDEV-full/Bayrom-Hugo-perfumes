const User = require('../models/User');

// Middleware para verificar se usuário está autenticado
const authMiddleware = async (req, res, next) => {
    if (req.session && req.session.user) {
        try {
            const user = await User.findByPk(req.session.user.id);
            if (user && user.status === 'active') {
                req.user = user;
                res.locals.user = user;
                return next();
            }
        } catch (error) {
            console.error('Erro ao verificar usuário:', error);
        }
        
        // Se houver erro ou usuário não encontrado, destruir sessão
        req.session.destroy();
    }
    
    // Redirecionar para login se não estiver autenticado
    if (req.path.startsWith('/admin')) {
        req.flash('error_msg', 'Por favor, faça login para acessar o painel administrativo');
        return res.redirect('/auth/login');
    }
    
    // Salvar URL original para redirecionar após login
    req.session.returnTo = req.originalUrl;
    req.flash('error_msg', 'Por favor, faça login para continuar');
    res.redirect('/auth/login');
};

// Middleware para verificar se usuário é administrador
const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    
    req.flash('error_msg', 'Acesso negado. Você não tem permissão para acessar esta área.');
    res.redirect('/');
};

// Middleware para usuários convidados (não autenticados)
const guestMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
        // Se já está logado, redirecionar conforme o papel
        if (req.user && req.user.role === 'admin') {
            return res.redirect('/admin');
        }
        return res.redirect('/');
    }
    next();
};

// Middleware para verificar se usuário é cliente
const clientMiddleware = (req, res, next) => {
    if (req.user && (req.user.role === 'client' || req.user.role === 'admin')) {
        return next();
    }
    
    req.flash('error_msg', 'Acesso negado');
    res.redirect('/');
};

// Middleware opcional (não redireciona, apenas define req.user)
const optionalAuthMiddleware = async (req, res, next) => {
    if (req.session && req.session.user) {
        try {
            const user = await User.findByPk(req.session.user.id);
            if (user && user.status === 'active') {
                req.user = user;
                res.locals.user = user;
            }
        } catch (error) {
            console.error('Erro ao verificar usuário opcional:', error);
        }
    }
    next();
};

module.exports = {
    authMiddleware,
    adminMiddleware,
    guestMiddleware,
    clientMiddleware,
    optionalAuthMiddleware
};
