import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import router from '@/router';
import type { RouteLocationNormalized } from 'vue-router';

describe('Router', () => {
  const wrapper = mount(App, {
    global: {
      plugins: [router],
    },
  });
  test('Renders Homepage when visiting /', async () => {
    await router.replace('/'); // To be sure that we are in the home page.
    await router.isReady();

    expect(wrapper.html()).toContain('Welcome to our website');
  });
  test('Renders Features page when visiting /features', async () => {
    await router.replace('/features');
    await router.isReady();
    expect(wrapper.html()).toContain('Features page');
    // await router.replace('/');
    // await router.push({ name: 'features' });
    // expect(wrapper.html()).toContain('Features page');
  });

  test('Renders Pricing page when visiting /pricing', async () => {
    await router.replace('/pricing');
    await router.isReady();
    expect(wrapper.html()).toContain('Pricing Page');
  });
  test('Renders Contact page when visiting /contact', async () => {
    await router.replace('/contact');
    await router.isReady();
    expect(wrapper.html()).toContain('Feedback');
  });

  test('Renders Login page when visiting /pokemon:id with no authentication', async () => {
    localStorage.clear();
    await router.replace('/pokemon/151');
    await router.isReady();
    expect(wrapper.find('h1').text()).toContain('Login');
  });
  test('Renders Login page when visiting /pokemon:id with authentication', async () => {
    localStorage.setItem('userId', 'ABC-123');
    await router.replace('/pokemon/151');
    await router.isReady();
    expect(wrapper.find('h1').text()).toContain('Pokemon #151');
    expect(wrapper.html()).toContain(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/151.svg',
    );
  });
  test('Should convert the url segment into number', async () => {
    const route: RouteLocationNormalized = {
      matched: [],
      fullPath: '/pokemon/2',
      query: {},
      hash: '',
      redirectedFrom: undefined,
      name: undefined,
      meta: {},
      path: '',
      params: { id: '2' },
    };

    const pokemonRoute = router.getRoutes().find((route) => route.name === 'pokemon');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { id } = (pokemonRoute?.props as any).default(route);

    console.log(id);
    expect(id).toBe(2);
    expect(pokemonRoute).toBeTruthy();
  });

  test('Should return default value if the url segment is not a number', async () => {
    const route: RouteLocationNormalized = {
      fullPath: '/pokemon/2',
      params: { id: '2abc' },
    };

    const pokemonRoute = router.getRoutes().find((route) => route.name === 'pokemon');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { id } = (pokemonRoute?.props as any).default(route);

    console.log(id);
    expect(id).toBe(1);
    expect(pokemonRoute).toBeTruthy();
  });
});
