import { shallowMount } from '@vue/test-utils';
import { RouterView } from 'vue-router';
import router from '@/router';
import LandingLayout from '@/modules/landing/layouts/LandingLayout.vue';

describe('<LandingLayout />', () => {
  test('Should be rendered correctly', () => {
    const wrapper = shallowMount(LandingLayout, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('header').exists()).toBe(true);
    expect(wrapper.find('main').exists()).toBe(true);
    expect(wrapper.find('footer').exists()).toBe(true);
    expect(wrapper.find('footer').html()).toContain(
      `© ${new Date().getFullYear()} Acme Corporation. Derechos reservados`,
    );

    expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(true);
    // Another way to do the same
    expect(wrapper.findComponent(RouterView).exists()).toBe(true);
  });
});
