import React from 'react';
import { theme } from '../../theme';

const AboutPage = () => {
  return (
    <div className='p-4 bg-white text-gray-800'>
      <h1 className='text-3xl font-bold mb-4'>About Arthapay</h1>
      <p className='mb-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam facilisis augue est, sit amet congue metus hendrerit ut.</p>
      <p className='mb-2'>Vestibulum nec rhythm oncongue libero. Maecenas tincidunt, orci eget interdum pellentesque, elit sem laoreet est, eu congue justo nulla ac odio.</p>
      <p>Ut ultricies orci eu libero posuere, sed lacinia nunc placerat. Nullam bibendum, ipsum vitae pellentesque gravida, lacus ligula ultrices arcu, sit amet eleifend est odio at tortor.</p>
    </div>
  );
};

export default AboutPage;