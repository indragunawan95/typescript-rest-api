import { CommonRoutesConfig } from '../common/common.routes.config';
import UsersController from './controllers/users.controller';
import UsersMiddleware from './middleware/users.middleware';
import express from 'express';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import { body } from 'express-validator';

export class UserRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UserRoutes');
    }

    configureRoutes() {
        // Implementation for route configuration
        this.app.route('/users')
            .get(UsersController.listUsers)
            .post(
                UsersMiddleware.validateRequiredUserBodyFields,
                body('email').isEmail(),
                body('password')
                    .isLength({ min: 5 })
                    .withMessage('Must include password (5+ characters)'),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                UsersMiddleware.validateSameEmailDoesntExist,
                UsersController.createUser
            )
        this.app.param(`userId`, UsersMiddleware.extractUserId);
        this.app.route('/users/:userId')
            .all(UsersMiddleware.validateUserExists)
            .get(UsersController.getUserById)
            .delete(UsersController.removeUser)

        this.app.put('/users/:userId', [
            UsersMiddleware.validateRequiredUserBodyFields,
            body('email').isEmail(),
            body('password')
                .isLength({ min: 5 })
                .withMessage('Must include password (5+ characters)'),
            body('firstName').isString(),
            body('lastName').isString(),
            body('permissionFlags').isInt(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            UsersMiddleware.validateSameEmailBelongToSameUser,
            UsersController.put
        ])

        this.app.patch(`/users/:userId`, [
            UsersMiddleware.validatePatchEmail,
            UsersController.patch,
        ]);

        return this.app
    }
}