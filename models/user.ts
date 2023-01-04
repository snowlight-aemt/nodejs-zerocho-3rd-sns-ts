import Sequelize, {CreationOptional, Model } from 'sequelize';
import Post from './post';

class User extends Model {
    declare id: CreationOptional<number>;
    declare email: string;
    declare nick: string;
    declare provider: string;
    declare snsId: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date>;
    static initiate(sequelize: Sequelize.Sequelize) {
        // 모델(테이블) 정보들
        // 모델 관계
        User.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true,
            },
            nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            provider: {
                type: Sequelize.ENUM('local', 'kakao'),
                allowNull: false,
                defaultValue: 'local',
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true,
            }
        }, {
            // 관계 유효성 
            sequelize,
            timestamps: true, // createdAt, updateAt 칼럼 추가
            underscored: false, // true: created_at, update_dt
            modelName: 'User', // 자바스크립트에서 쓰는 이름.
            tableName: 'users', // DB table 이름
            paranoid: true, // deletedAt 유저 삭제일자 true : soft delete , false ; hard delete
            charset: 'utf8', // 이모티콘 utf8mb4
            collate: 'utf8_general_ci' // 정렬
        });
    }
    
    // 테이블에 관계는 asociate 에서 정의한다.
    static associate() {
        User.hasMany(Post);
        User.belongsToMany(User, { // 팔로워
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Follow',
        });
        User.belongsToMany(User, { // 팔로잉
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Follow',
        })
    }
}

export default User;