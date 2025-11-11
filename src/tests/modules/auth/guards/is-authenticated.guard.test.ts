import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard';
import type { RouteLocationNormalized } from 'vue-router';

describe('isAuthenticatedGuard', () => {
  const to: RouteLocationNormalized = {
    name: undefined,
    matched: [],
    fullPath: '',
    query: {},
    hash: '',
    redirectedFrom: undefined,
    path: '/home-screen', // It's not important which path I have.
    params: {},
    meta: {},
  };
  const from: RouteLocationNormalized = {
    name: undefined,
    matched: [],
    fullPath: '',
    query: {},
    hash: '',
    redirectedFrom: undefined,
    path: '',
    params: {},
    meta: {},
  };
  const next = vi.fn();
  beforeEach(() => {
    localStorage.clear();
  });
  test('Should block if not authenticated', () => {
    isAuthenticatedGuard(to, from, next);
    expect(next).toHaveBeenCalledWith({ name: 'login' });
  });

  test('Should call localStorage.setItem with lastPath ', () => {
    isAuthenticatedGuard(to, from, next);

    const lastPath = localStorage.getItem('lastPath');
    expect(lastPath).toBe(to.path);
  });

  test('Should block if not authenticated - whit spies ', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    isAuthenticatedGuard(to, from, next);

    expect(setItemSpy).toHaveBeenCalledWith('lastPath', to.path);
  });

  test('Should pass if authenticated - whit spies ', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('user-id-test');
    isAuthenticatedGuard(to, from, next);

    expect(next).toHaveBeenCalledWith();
  });
});
