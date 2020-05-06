import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';
import { selectUsername } from './selectors';
import { getGithubRepos } from './slice';
import { Repo } from 'types/Repo';
import { RepoErrorType } from './types';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  yield delay(500);
  yield put(getGithubRepos.request());
  // Select username from store
  const username: string = yield select(selectUsername);
  if (username.length === 0) {
    yield put(getGithubRepos.failure(RepoErrorType.USERNAME_EMPTY));
    return;
  }
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    const repos: Repo[] = yield call(request, requestURL);
    if (repos?.length > 0) {
      yield put(getGithubRepos.success(repos));
    } else {
      yield put(getGithubRepos.failure(RepoErrorType.USER_HAS_NO_REPO));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(getGithubRepos.failure(RepoErrorType.USER_NOT_FOUND));
    } else if (err.message === 'Failed to fetch') {
      yield put(getGithubRepos.failure(RepoErrorType.GITHUB_RATE_LIMIT));
    } else {
      yield put(getGithubRepos.failure(RepoErrorType.RESPONSE_ERROR));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* githubRepoFormSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(getGithubRepos.TRIGGER, getRepos);
}
