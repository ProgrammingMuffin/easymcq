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
            primaryKey: true,
            references: {
                model: 'Answer',
                key: 'ans_id'
            }
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        nest: true,
        raw: true
    })
}