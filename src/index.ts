import { GithubApiService } from './GithubApiService';
import _ from 'lodash';
import { User } from './User';
import { Repo } from './Repo';


let svc = new GithubApiService();

if(process.argv.length < 3) {
    throw("Please pass the username as an argument.");
}else {

    let username:string = process.argv[2];

    svc.getUserInfo(username, (user: User) => {
        svc.getRepos(username, (repos: Repo[]) => {
    
            let sortedRepos = _.sortBy(repos, [(repo: Repo) => repo.forkCount * -1]);
                sortedRepos = _.take(sortedRepos, 5);
    
            user.repos = sortedRepos;
    
            console.log(user);
        });
    });
}
