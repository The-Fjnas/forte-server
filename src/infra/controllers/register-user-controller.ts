import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const userSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export function registerUserController(req: FastifyRequest, res: FastifyReply) {
    try {
        //Primeiro verificamos o que esta entrando no body da requisição
        const userData = userSchema.parse(req.body);

        return res.status(201).send({ message: "User registered successfully", user: userData });
        //depois chamamos o service que vai fazer a regra de negocio

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).send({ 
                error: "Validation failed", 
                fields: z.flattenError(error).fieldErrors,
            });
        }
        // enviar para o Sentry o erro que aconteceu, para que possamos monitorar e corrigir

        // fetch("https://sentry.io/api/1234567890/store/", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": "Bearer YOUR_SENTRY_AUTH_TOKEN",
        //     },
        //     body: JSON.stringify({
        //         message: error.message,
        //         stack: error.stack,
        //         level: "error",
        //         logger: "registerUserController",
        //     }),
        // }).catch((err) => {
        //     console.error("Failed to send error to Sentry:", err);
        // });
        
       
        // caso der algum erro, vamos retornar um status code 500 e a mensagem de erro
        
        return res.status(500).send({ message: "Internal server error" });
    }
}