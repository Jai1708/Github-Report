import { GithubApiService } from './GithubApiService';
import { Repo } from './Repo';
import { User } from './User';
import * as _ from 'lodash';

let gas = new GithubApiService();
if (process.argv.length < 3) {
    console.log('Please pass the username as an argument!');
}
else {
    let userName = process.argv[2];
    gas.getUserInfo(userName, (user: User) => {
        gas.getRepos(userName, (repos: Repo[]) => {
            let sortedReposByforkCount = _.sortBy(repos, [(repos: Repo) => repos.forkCount * -1]);
            let filteredRepos = _.take(sortedReposByforkCount, 5);
            user.repos = filteredRepos;
            console.log(user);
        });
    });
}

