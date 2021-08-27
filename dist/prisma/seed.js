"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../src/utils/database"));
const faker_1 = require("faker");
const service_1 = __importDefault(require("../src/resources/users/service"));
const { post } = database_1.default;
const userFactory = (password) => {
    return {
        username: faker_1.internet.userName(),
        password: password || faker_1.internet.password(),
        bio: faker_1.lorem.sentences(2),
        role: "user",
    };
};
const postFactory = (userCount) => {
    return {
        imageUrl: faker_1.image.imageUrl(undefined, undefined, undefined, true),
        text: faker_1.lorem.sentences(2),
        userId: faker_1.datatype.number({ max: userCount, min: 1 }),
    };
};
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    const testUser = yield service_1.default.createWithHash(Object.assign(Object.assign({}, userFactory("testPassword")), { role: "admin" }));
    const testUser2 = yield service_1.default.createWithHash(Object.assign({}, userFactory("test")));
    console.log(testUser, testUser2);
    const users = yield Promise.all(Array(3)
        .fill(0)
        .map(() => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.default.createWithHash(userFactory());
    })));
    console.log("Users created");
    yield Promise.all(Array(20)
        .fill(0)
        .map(() => __awaiter(void 0, void 0, void 0, function* () {
        return yield post.create({ data: postFactory(users.length) });
    })));
    console.log("Posts created");
});
seed()
    .catch((e) => console.error(e))
    .finally(() => database_1.default.$disconnect());
