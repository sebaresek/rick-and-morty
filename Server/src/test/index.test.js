const app = require("../app");
const session = require("supertest");
const request = session(app);

const character = {
    
};

describe("test de  RUTAS", () => {
    describe("GET /rickandmorty/character/:id", () => {
        it("Responde con status: 200", async () => {
            const response = await request.get("/rickandmorty/character/1")
            expect(response.statusCode).toBe(200);
        });

        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
            const response = await request.get("/rickandmorty/character/1");
            for (const prop in response) {
                expect(response.body).toHaveProperty(prop);
                }
            }
        )

        it("Si hay un error responde con status: 500", async () => {
            const response = await request.get("/rickandmorty/character/125322j")
            expect(response.statusCode).toBe(500);
        });
    });

    describe("GET /rickandmorty/login", () => {
        const access = { access: true }
        it("Responde con un objeto con la propiedad access en true si la informacion del usuario es valida", async () => {
            const response = await request.get("/rickandmorty/character/login?email=jose@gmail.com&password=123abc")
            expect(response.body).toEqual(access);
        })
        
        it("Responde con un objeto con la propiedad access en true si la informacion del usuario es valida", async () => {
            const response = await request.get("/rickandmorty/character/login?email=jose@gmail.com&password=122423abc")
            access.access = false;
            expect(response.body).toEqual(access);
        })
    });

    describe("POST /rickandmorty/fav", () => {
        it("Debe guardar el personaje en favoritos", async () => {
            
            const response = await request.post("/rickandmorty/fav").send()
        })
    });
})