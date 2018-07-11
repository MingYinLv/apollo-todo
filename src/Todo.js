/**
 * Created 2018/07/11 14:54 By lvmingyin
 */

import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const TODO_TOGGLE = gql`
    mutation ToggleTodo($id: Int!){
        toggleTodo(id: $id) @client
    }
`;

const Todo = ({ id, completed, text }) => (
  <Mutation mutation={TODO_TOGGLE} variables={{ id }}>
    {
      toggleTodo => (
        <li
          onClick={toggleTodo}
          style={{
            textDecoration: completed ? 'line-through' : 'none',
          }}
        >
          {text}
        </li>
      )
    }
  </Mutation>
);

export default Todo;
