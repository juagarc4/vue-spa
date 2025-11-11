import { mount, RouterLinkStub } from '@vue/test-utils';
import PokemonPage from '@/modules/pokemons/pages/PokemonPage.vue';

describe('<PokemonPage />', () => {
  const wrapper = mount(PokemonPage, {
    props: {
      id: 25,
    },
    global: {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    },
  });
  test('Should render the component correctly', () => {
    expect(wrapper.find('h1').exists()).toBe(true);
    expect(wrapper.find('img').attributes('src')).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
    );
    expect(wrapper.find('small').text()).toBe(`#25`);
  });
  test('Should redirect to the next pokemon', () => {
    const link = wrapper.findComponent(RouterLinkStub);

    expect(link.props().to).toEqual({ name: 'pokemon', params: { id: 26 } });

    console.log(link.props());
  });
});
