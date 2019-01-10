import React from 'react';

import { storiesOf } from '@storybook/react';

import TodoApp from '../components/TodoApp';
import AddTodo from '../components/AddTodo';

storiesOf('Test TWEB', module)
  .add('List all', () => <TodoApp />)
  .add('Create new', () => <AddTodo />);
