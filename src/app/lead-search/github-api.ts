import { GithubIssue } from './github-issue';

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}
