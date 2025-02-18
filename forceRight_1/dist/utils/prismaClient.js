"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class DBClient {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
}
DBClient.getInstance = () => {
    if (!DBClient.instance) {
        DBClient.instance = new DBClient();
    }
    return DBClient.instance;
};
exports.default = DBClient;
