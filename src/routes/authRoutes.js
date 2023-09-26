/**
 * @api {post} /register Register a new user
 * @apiName RegisterUser
 * @apiGroup Authentication
 *
 * @apiParam {String} email User's email address.
 * @apiParam {String} password User's password.
 * @apiParam {String} name User's name.
 *
 * @apiSuccess {String} token Authentication token.
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 201 Created
 *    {
 *      "token": "your-auth-token"
 *    }
 *
 * @apiError {String} error Error message.
 *
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": "User already exists"
 *    }
 */
app.post('/register', authController.registerUser);
