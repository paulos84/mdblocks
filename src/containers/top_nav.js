import React, { Component } from 'react';
import { Link, Redirect  } from 'react-router-dom';
import { Navbar } from 'reactstrap';
import NavDropdownSelect from "../components/nav_dropdown_select"
import * as actionCreator from "../store/actions/actions";
import {connect} from "react-redux";
import TextSearch from "../components/text_search"

class TopNav extends Component {

    handleTextInput(text) {
        this.props.setTextInput(text)
    }

    handleTextSubmit() {
        this.props.setSearchRedirect(true)
    }

    resetTextInput() {
        this.props.setTextInput('')
    }

    handleTopicSelection(topic) {
        this.props.setSearchRedirect(false);
        this.props.setTopic({topicName: topic, allTopics: this.props.allTopics});
        this.props.setPathname()
    }

    handleCategorySelection(category) {
        this.props.setCategory(category);
        this.props.topicsByCategory();
    }

    render() {

        if (this.props.searchRedirect) {
            if (!this.props.pathname.includes('search/')) {
                return <Redirect push to={"/search/" + this.props.textInput}/>;
            } else if (this.props.textInput.length > 2 ) {
                this.props.getSearchResults(this.props.textInput)
            }
        }

        const catOptions = this.props.categories.map(cat => {
            return {name: cat, slug: cat.toLowerCase().replace(' ', '_')}
        });

        const topicSelect = () => {
            if (this.props.pathname.includes('search/') ||
                (this.props.topicName && this.props.pathname !== '/')) {
                return <NavDropdownSelect
                    isTopic={true}
                    selectedOption={this.props.topicName}
                    options={this.props.filteredTopics}
                    atSearchPage={this.props.pathname.includes('search/')}
                    handleSelection={this.handleTopicSelection.bind(this)}/>
            }
        };

        const textSearch = (
            <TextSearch
                handleTextChange={this.handleTextInput.bind(this)}
                handleTextSubmit={this.handleTextSubmit.bind(this)}
                resetTextInput={this.resetTextInput.bind(this)}
                textInput={this.props.textInput}
            />);

        if (this.props.pathname !== '/') {
            return (
                <Navbar color="light" light expand="md">
                    <NavDropdownSelect
                        selectedOption={this.props.activeCategory}
                        options={catOptions}
                        handleSelection={this.handleCategorySelection.bind(this)}
                        atSearchPage={this.props.pathname.includes('search/')}
                    />
                    {topicSelect()}
                    <Link className="nav_link_index" to="/" exact='true' >Index</Link>
                    {textSearch}
                </Navbar>
            )
        } else return (
            <Navbar color="light" light expand="md">
                {textSearch}
            </Navbar>
        )
    }
}

const mapStateToProps = state => {
    return {
        topicName: state.topicName,
        categories: state.categories,
        allTopics: state.allTopics,
        filteredTopics: state.filteredTopics,
        activeCategory: state.activeCategory,
        pathname: state.pathname,
        textInput: state.textInput,
        searchRedirect: state.searchRedirect,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setTopic: (val) => dispatch(actionCreator.setTopic(val)),
        setCategory: (val) => dispatch(actionCreator.setCategory(val)),
        topicsByCategory: () => dispatch(actionCreator.topicsByCategory()),
        setTopicFromSlug: (slug) => dispatch(actionCreator.setTopicFromSlug(slug)),
        setPathname: (val) => dispatch(actionCreator.setPathname(val)),
        setTextInput: (val) => dispatch(actionCreator.setTextInput(val)),
        setSearchRedirect: (val) => dispatch(actionCreator.setSearchRedirect(val)),
        getSearchResults: (text) => dispatch(actionCreator.getTextSearchResults(text)),
        setSearchLoading: () => dispatch(actionCreator.setSearchLoading()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopNav);