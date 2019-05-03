import React from 'react';
import { MarkdownPreview } from 'react-marked-markdown';
import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap';
import * as actionCreator from "../store/actions/actions";
import {Route} from "react-router-dom";

class SearchResults extends React.Component {

    componentDidMount() {
        this.props.setSearchLoading();
        this.props.setSearchRedirect(false);
        this.props.getSearchResults(this.props.match.params.text);
    }

    render() {

        if (this.props.isLoading) {
            return (
                <div className='topic_page'>
                    <Spinner color="secondary" />
                </div>
            );
        }
        if (this.props.searchResults.length > 0) {
            return (
                <div className='topic_page'>
                <ListGroup>
                    {this.props.searchResults.map((obj, ind) => {
                        const maxLength = 640;
                        let truncMd = obj.content.substr(0, maxLength);
                        truncMd = truncMd.substr(0, Math.min(truncMd.length, truncMd.lastIndexOf(" ")));
                        return (
                            <ListGroupItem tag="a" key={ind} active={false} action >
                                <Route key={ind}
                                   render={ ({ history }) =>
                                        <div onClick={() => { history.push(this.props.pathname.concat('/', ind)) }}>
                                            <MarkdownPreview value={truncMd + ' ...'}/>
                                        </div> }
                                   />
                            </ListGroupItem>)
                    })}
                </ListGroup>
                </div>)
        } else return <div className='topic_page'><p>No results</p></div>
    }
}

const mapStateToProps = state => {
    return {
        categories: state.categories,
        isLoading: state.searchTextLoading,
        searchResults: state.searchResults,
        selectedResultInd: state.searchResultIndex,
        pathname: state.pathname,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSearchResults: (text) => dispatch(actionCreator.getTextSearchResults(text)),
        setCategories: (slug) => dispatch(actionCreator.setCategories(slug)),
        setSearchRedirect: (val) => dispatch(actionCreator.setSearchRedirect(val)),
        setPathname: () => dispatch(actionCreator.setPathname()),
        setSearchLoading: () => dispatch(actionCreator.setSearchLoading()),
        setResultIndex: (val) => dispatch(actionCreator.setResultIndex(val))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResults);