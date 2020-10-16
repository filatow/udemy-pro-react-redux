import React, {Component} from 'react';
// import ReactDOM from 'react-dom';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {
  constructor() {
    super();

    this.maxId = 100;

    this.createTodoItem = (label) => {
      return {
        label,
        important: false,
        done: false,
        id: this.maxId++
      }
    };

    this.state = {
      todoData: [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Make App'),
        this.createTodoItem('Have a lunch'),
      ],
      searchRequest: '',
      filter: 'all', // active, all, done
    };

    this.deleteItem = (id) => {
      this.setState(({todoData}) => {
        const index = todoData.findIndex((elem) => elem.id === id);
        const newTodoData = [
          ...todoData.slice(0, index),
          ...todoData.slice(index+1)
        ];
        return {
          todoData: newTodoData
        }
      });
    };

    this.addItem = (text) => {
      const newItem = this.createTodoItem(text);
      this.setState(({todoData}) => {
        const newTodoData = [...todoData, newItem];
        return {
          todoData: newTodoData
        }
      })
    };

    this.toggleProperty = (arr, id, propName) => {
      const index = arr.findIndex((elem) => elem.id === id);
      const oldItem = arr[index];
      const newItem = {...oldItem,
        [propName]: !oldItem[propName]};
      return {
        todoData: [
          ...arr.slice(0, index),
          newItem,
          ...arr.slice(index + 1)
        ]
      };
    };

    this.onToggleImportant = (id) => {
      this.setState(({todoData}) => {
        return this.toggleProperty(todoData, id, 'important')
      })
    }

    this.onToggleDone = (id) => {
      this.setState(({todoData}) => {
        return this.toggleProperty(todoData, id, 'done')
      })
    };

    this.onFilterChange = (filter) => {
      if (filter !== this.state.filter) {
        this.setState({
          filter
        });
      }
    };

    this.onSearchChange = (term) => {
      this.setState({
        searchRequest: term
      });
    };
  }

  search(items, term) {
    if (items.length === 0) {
      return items;
    };
    return items.filter((item) => {
      return (item.label.toLowerCase()
              .indexOf(term.toLowerCase()) > -1);
    });
  };
  
  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }

  }

  render() {
    const {todoData, filter, searchRequest} = this.state;
    const doneCount = todoData.filter((item) => item.done).length;
    const todoCount = todoData.length - doneCount;
    // let todos;

    const visibleItems = this.filter(
      this.search(todoData, searchRequest),filter); 

    // switch (filter) {
    //   case 'Done':
    //     todos = todoData.filter((elem) => elem.done);
    //     break;
    //   case 'Active':
    //     todos = todoData.filter((elem) => !elem.done);
    //     break;
    //   default:
    //     todos = [...todoData];
    //     break;
    // };

    // if (searchRequest) {
    //   todos = todos.filter((elem) => {
    //     return elem.label.toLowerCase().startsWith(searchRequest.toLowerCase());
    //   })
    // };

    return (
      <div className = "todo-app">
        <AppHeader
          toDo = {todoCount}
          done = {doneCount} />
        <div className = "top-panel d-flex">
          <SearchPanel
            onSearchChange = {this.onSearchChange} />
          <ItemStatusFilter
            filter = {filter}
            onFilterChange = {this.onFilterChange} />
        </div>
  
        <TodoList 
          todos = {visibleItems}
          onDeleted = {this.deleteItem}
          onToggleImportant = {this.onToggleImportant}
          onToggleDone = {this.onToggleDone}
        />
        <ItemAddForm 
          onItemAdded = {this.addItem} />
      </div>
    );
  }
};
