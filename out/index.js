"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var GithubApiService_1 = require("./GithubApiService");
var lodash_1 = __importDefault(require("lodash"));
var svc = new GithubApiService_1.GithubApiService();
var username;
process.argv.length < 3 ? console.log("Please pass the username as an argument.") : username = process.argv[2];
svc.getUserInfo(username, function (user) {
    svc.getRepos(username, function (repos) {
        var sortedRepos = lodash_1.default.sortBy(repos, [function (repo) { return repo.forkCount * -1; }]);
        sortedRepos = lodash_1.default.take(sortedRepos, 5);
        user.repos = sortedRepos;
        console.log(user);
    });
});
