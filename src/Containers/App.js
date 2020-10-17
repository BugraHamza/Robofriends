import React from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/scroll'
import ErrorBoundary from '../Components/ErrorBoundary';
import { setSearchField, requestRobots } from '../actions';
import { connect } from 'react-redux';
import './App.css';

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending
  }
}

const mapDispatchToProps = (dispatch) => { 
  return { 
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends React.Component {
  componentDidMount() {
    this.props.onRequestRobots();
  }

  render() {
    const filteredRobots = this.props.robots.filter(robot => {
      return robot.name.toLowerCase().includes(this.props.searchField.toLowerCase());
    });
    return (
      <div className='tc'>
        <h1 className='f2'>RoboFriends</h1>
        <SearchBox searchChange={this.props.onSearchChange}/>
        <Scroll>
        { 
          this.props.isPending ? <h1>Loading</h1> :
          <ErrorBoundary>
            <CardList robots={filteredRobots}/>
          </ErrorBoundary>
        }
        </Scroll>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
