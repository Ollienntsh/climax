import { configure } from '@storybook/react';

import 'antd/dist/antd.css';

const req = require.context('../src', true, /\.story\.(ts|tsx)$/);

configure(() => {
  req.keys().forEach(filename => req(filename));
}, module);
