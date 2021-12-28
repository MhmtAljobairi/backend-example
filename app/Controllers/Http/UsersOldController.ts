import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class UsersController {


    public async getAll({ }: HttpContextContract) {
        return Database.from("users").select("*");

        const users = await User.all()
    }
    public async getById({ response, params }: HttpContextContract) {

        const id = parseInt(params.id);
        const users = await Database.from("users").select("*").where("id", id);
        if (users.length > 0) {
            return users[0];
        } else {
            return response.status(404).json("Object not found");
        }
    }
    public async create({ request, response }: HttpContextContract) {

        try {
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
            var insertedId = await Database.table("users").insert({
                first_name: request.input("first_name"),
                last_name: request.input("last_name"),
                password: request.input("password"),
                email_address: request.input("email_address"),
            });
            return insertedId;
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
            await Database.from("users")
                .where("id", request.input("id"))
                .update({
                    first_name: request.input("first_name"),
                    last_name: request.input("last_name"),
                    password: request.input("password"),
                    email_address: request.input("email_address"),
                });
            return "The user has been updated!";
        } catch (ex) {
            return response.status(400).json({ message: ex.toString() });
        }
    }
    public async delete({ response, params }: HttpContextContract) {
        try {
            var idVar = parseInt(params.id);
            await Database.from("users")
                .where('id', idVar)
                .delete();
            return "User has been deleted!";
        } catch (ex) {
            return response.status(400).json({ message: ex.toString() });
        }
    }
}
