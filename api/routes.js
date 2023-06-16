const Router = require("koa-router");
const { createEnv, getEnv, deleteEnv, existsEnv } = require("./envsModel");

const router = new Router();

router.post("/envs", async(ctx) => {
    const { id } = await createEnv();

    const env = await getEnv(id);

    ctx.body = {
        ...env,
    };
});

const checkId = async (ctx, next) => { 
    if (!ctx.params.id.match(/^e[a-f0-9]{16}$/)) {
        ctx.throw(400, "Invalid id");
    }

    if (!await existsEnv(ctx.params.id)) {
        ctx.throw(404, "Env not found");
    }

    return next();
};

router.get("/envs/:id", checkId, async(ctx) => { 
    ctx.body = {
        ...await getEnv(ctx.params.id),
    };
});

router.delete("/envs/:id", checkId, async(ctx) => { 
    await deleteEnv(ctx.params.id);

    ctx.status = 204;
});

module.exports = router;