import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  handleFormSubmit = text => {
    const todo = {
      id: nanoid(),
      text,
    };
    this.setState(prevState => ({ todos: [...prevState.todos, todo] }));
  };

  handleDeleteTodo = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  handelChangedText = (idx, newText) => {
    this.setState(({ todos }) => ({
      todos: todos.map(todo => {
        return todo.id === idx ? { ...todo, text: newText } : todo;
      }),
    }));
  };

  render() {
    console.log(this.state.todos);
    const { todos } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handleFormSubmit} />
        <Grid>
          {todos.map(({ id, text }, index) => (
            <GridItem key={id}>
              <Todo
                text={text}
                count={index + 1}
                id={id}
                onDeleteClick={this.handleDeleteTodo}
                onChange={this.handelChangedText}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
