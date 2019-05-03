import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import { connect } from "react-redux";
import CategoriesIndex from "./containers/categories_index"
import TopNav from "./containers/top_nav";
import TopicPage from './containers/topic_page'
import ResultDetail from './containers/result_detail'
import SearchResults from './containers/search_results'
import * as actionCreator from "./store/actions/actions";

class App extends Component {

    componentDidMount() {
        this.props.fetchCategoriesData()
        }

    render() {
      return (
        <BrowserRouter >
        <div className="App">
            <TopNav />
            <Route path="/" exact strict
                   render={(props) => <CategoriesIndex {...props} />}
            />
            <Route path="/search/:text" exact strict
                   render={(props) => <SearchResults {...props} />}
            />
            <Route path="/search/:text/:index" exact strict
                   render={(props) => <ResultDetail {...props} />}
            />
            <Route path="/topics/:slug" exact strict
                   render={(props) => <TopicPage {...props} />}
            />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
    return {
        categories: state.categories,
        allTopics: state.allTopics,
        filteredTopics: state.filteredTopics,
        activeCategory: state.activeCategory,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCategoriesData: () => dispatch(actionCreator.setCategories()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);