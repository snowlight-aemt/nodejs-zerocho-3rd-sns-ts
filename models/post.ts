import Sequelize, {
    BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin,
    CreationOptional
} from 'sequelize';
import User from './user';
import Hashtag from "./hashtag";
import {Hash} from "crypto";

class Post extends Sequelize.Model {
    declare id: CreationOptional<number>;
    declare content: string;
    declare img: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare addHashtags: BelongsToManyAddAssociationsMixin<Hashtag, number>;

    static initiate(sequelize: Sequelize.Sequelize) {
        Post.init({
            content: {
                type: Sequelize.STRING(140),
                allowNull: false,
            },
            img: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: false,
            modelName: 'Post',
            tableName: 'posts',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate() {
        Post.belongsTo(User);
        Post.belongsToMany(Hashtag, {through: 'PostHashtag'});
    }
}

export default Post;