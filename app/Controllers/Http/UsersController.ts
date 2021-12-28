import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {


    public async login({ request, response, auth }: HttpContextContract) {

        try {
            var emailAddress = request.input("email_address");
            var password = request.input("password");
            var token = await auth.use('api').attempt(emailAddress, password, {
                expiresIn: "1days"
            });
            return token;
        } catch (ex) {
            return response.badRequest({ message: ex.toString() });
        }
    }
    public async logout({ request, response, auth }: HttpContextContract) {

        try {
            var authObject = await auth.authenticate();
            auth.logout();
            return "Done";
        } catch (ex) {
            return response.badRequest({ message: ex.toString() });
        }
    }
    public async getAll({ }: HttpContextContract) {

        var users = await User.all(); //SELECT * FROM users WHERE deleted_at IS NULL.
        return users;

    }
    public async getById({ response, params, auth }: HttpContextContract) {

        try {
            var authObject = await auth.authenticate();
            var user = await User.find(authObject.id);
            if (user != null) {
                return user;
            } else {
                return response.status(404).json("Object not found");
            }
        } catch (ex) {
            return response.badRequest(ex.toString());
        }
    }
    public async create({ request, response }: HttpContextContract) {

        try {

            console.log(request.all());
            //1. Create new Schema.
            var newScheme = schema.create({
                first_name: schema.string({ trim: true }),
                last_name: schema.string({ trim: true }),
                password: schema.string({ trim: true }),
                email_address: schema.string({ trim: true }),
            });

            // 2. Validation.
            var result = await request.validate({ schema: newScheme });

            // 3. Insert statement.
            var user = new User();
            user.firstName = request.input("first_name");
            user.lastName = request.input("last_name");
            user.password = await Hash.make(request.input("password"));
            user.emailAddress = request.input("email_address");
            const newUser = await user.save();
            return newUser.id;
        } catch (ex) {
            return response.status(400).json({ message: ex.toString() });
        }
    }

    /**
     *
     * @param param0
     * @returns
     */
    public async update({ request, response }: HttpContextContract) {
        try {
            //1. Create new Schema.
            var newScheme = schema.create({
                id: schema.number(),
                first_name: schema.string({ trim: true }),
                last_name: schema.string({ trim: true }),
                password: schema.string({ trim: true }),
                email_address: schema.string({ trim: true }),
            });

            // 2. Validation.
            var result = await request.validate({ schema: newScheme });

            // 3. Update statement.
            const user = await User.findByOrFail("id", request.input("id"));//SELECT * FROM users where id=?
            user.firstName = request.input("first_name");
            user.lastName = request.input("last_name");
            user.password = request.input("password");
            user.emailAddress = request.input("email_address");
            await user.save();
            return "The user has been updated!";
        } catch (ex) {
            return response.status(400).json({ message: ex.toString() });
        }
    }
    public async delete({ response, params }: HttpContextContract) {
        try {
            var idVar = parseInt(params.id);
            var user = await User.findByOrFail("id", idVar);
            user.delete();
            return "User has been deleted!";
        } catch (ex) {
            return response.status(400).json({ message: ex.toString() });
        }
    }
}
