import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database';

export default class PostsController {


    public async getAll(ctx: HttpContextContract) {

        // SELECT * FROM posts;
        return Database.from('posts').select('*');
    }

    public async getById({ request, response, params }: HttpContextContract) {
        request;
        response;
        params;
        return "GET BY ID";
    }

    public async create({ request, response, params }: HttpContextContract) {
        try {
            // 1- Validation.
            const newSchema = schema.create({
                user_id: schema.number(),
                content: schema.string({ trim: true }),
            });
            var result = await request.validate({ schema: newSchema });

            //2- Create Statement.

            var postId = await Database.table("posts").insert({
                user_id: request.input("user_id"),
                content: request.input("content"),
            });
            return { id: postId };
        } catch (ex) {
            return response.status(400).json({ message: ex });
        }
    }

    public async delete(ctx: HttpContextContract) {
        return "DELETE";
    }

    public async update(ctx: HttpContextContract) {
        return "UPDATE";
    }
}
