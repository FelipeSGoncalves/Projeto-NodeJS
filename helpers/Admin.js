module.exports = {
    Admin: function (req, res, next) {
        if (req.isAuthenticated() && req.user.cargo === "adm") {
            return next();

        }
        req.flash("error_msg", "Você não tem permissão para acessar essa página.");
        res.redirect("/");
    }
};
