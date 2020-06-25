import * as request from 'request';
import { User } from './User';
import { Repo } from './Repo';

export class GithubApiService {

    options:any = {
        headers: {
            'User-Agent': 'request'
        },
        json: true
    }

    getUserInfo(userName: string, cb: (user: User) => any) {
        request.get('https://api.github.com/users/'+userName, this.options, (error:any, response: any, body: any) => {
            let user = new User(body);
            cb(user);
        });
    }

    getRepos(userName: string, cb: (repos: Repo[]) => any) {
        request.get('https://api.github.com/users/'+userName + '/repos', this.options, (error:any, response: any, body: any) => {
            
            let repoArray = body.map((repo: any) => new Repo(repo) );

            cb(repoArray);
        });
    }
}