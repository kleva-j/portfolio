"use strict";
exports.__esModule = true;
var server_1 = require("@trpc/server");
var standalone_1 = require("@trpc/server/adapters/standalone");
var t = server_1.initTRPC.create();
var POSTS = [
    { id: '1', title: 'First post' },
    { id: '2', title: 'Second post' },
    { id: '3', title: 'Third post' }
];
var appRouter = t.router({
    hello: t.procedure.query(function () { return 'Hello world!'; }),
    posts: t.procedure.query(function () {
        return POSTS;
    }),
    post: t.procedure.input(String).query(function (req) {
        return POSTS.find(function (p) { return p.id === req.input; });
    })
});
var server = (0, standalone_1.createHTTPServer)({
    router: appRouter,
    responseMeta: function () {
        return {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Methods': 'OPTIONS, GET',
                'Access-Control-Allow-Headers': '*'
            },
            status: 200
        };
    }
});
server.listen(4000);
