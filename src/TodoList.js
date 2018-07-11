/**
 * Created 2018/07/11 14:54 By lvmingyin
 */

import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Todo from './Todo';

const GET_TODOS = gql`
    {
        todos @client{
            id
            completed
            text
        }
        visibilityFilter @client
    }
`;

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(n => n.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(n => !n.completed);
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

const TodoList = () => (
  <Query query={GET_TODOS}>
    {
      ({ data: { todos, visibilityFilter } }) => {
        return (
          <ul>
            {getVisibleTodos(todos, visibilityFilter).map(todo => (
              <Todo key={todo.id} {...todo} />
            ))}
          </ul>
        )
      }
    }
  </Query>
);

export default TodoList;

