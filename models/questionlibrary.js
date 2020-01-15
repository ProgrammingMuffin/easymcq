const Sequelize = require('sequelize');

module.exports = (orm) => {
    return orm.define('QuestionLibrary', {
        quest_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        ans_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true
        }
    }, {
        timestamps: false,
        freezeTableName: true
    })
}