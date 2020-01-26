const Sequelize = require('sequelize');

module.exports = (orm) => {
    return orm.define('QuestionImage', {
        quest_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        imagename: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })
}