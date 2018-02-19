import React from 'react';
import test from 'ava';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import Header from '../../../src/components/common/Header';

test('layout', t => {
  const wrapper = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  t.is(wrapper.find('nav').length, 1);
  t.is(wrapper.find('a').length, 2);
  t.is(wrapper.find('a[href="/"]').text(), 'Home');
  t.is(wrapper.find('a[href="/new_post"]').text(), 'New Post');
});

test('active links', t => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <Header />
    </MemoryRouter>
  );

  t.true(wrapper.find('a[href="/"]').hasClass('active'));
  t.false(wrapper.find('a[href="/new_post"]').hasClass('active'));
});
