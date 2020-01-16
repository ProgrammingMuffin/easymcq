const Sequelize = require('sequelize');

module.exports = (orm) => {
    return orm.define('Test', {
        test_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        test_name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
}