const initialState = {
    categories: [],
    activeCategory: 'Python',
    allTopics: [],
    filteredTopics: [],
    searchResults: [],
    mdContent: '',
    topicName: '',
    topicSlug: '',
    textInput: '',
    searchRedirect: false,
    searchTextLoading: false,
    searchResultIndex: null,
    pathname: window.location.pathname
};

const rootReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case "SET_CATEGORIES":
            newState.categories = action.value.categories;
            newState.allTopics = action.value.allTopics;
            break;
        case "CAT_TOPICS":
            const catIndex = newState.allTopics.findIndex(
                x => x.catName === newState.activeCategory);
            newState.filteredTopics = newState.allTopics[catIndex].topics;
            break;
        case "SET_TOPIC":
            newState.topicName = action.value.topicName;
            newState.allTopics = action.value.allTopics;
            newState.textInput = '';
            setSlugFromTopic(newState);
            setCategoryFromTopic(newState);
            break;
        case "SEARCH_RESULTS":
            newState.searchResults = action.value;
            newState.searchTextLoading = false;
            break;
        case "SET_RESULT_INDEX":
            newState.searchResultIndex = action.value;
            break;
        case "SET_PATHNAME":
            newState.pathname = window.location.pathname;
            break;
        case "SEARCH_REDIRECT":
            newState.searchRedirect = action.value;
            break;
        case "SET_SEARCH_LOADING":
            newState.searchTextLoading = action.value;
            break;
        case "TOPIC_FROM_SLUG":
            newState.topicSlug = action.value;
            break;
        case "SET_CATEGORY":
            newState.activeCategory = action.value;
            break;
        case "MD_CONTENT":
            newState.mdContent = action.value;
            break;
        case "SET_TEXT_INPUT":
            newState.textInput = action.value;
            break;
        default:
            break;
    }
    if (newState.topicSlug && newState.allTopics.length > 0 && !newState.topicName) {
        setTopicFromSlug(newState)
    }
    newState.pathname = window.location.pathname;
    return newState;
};

const setTopicFromSlug = (newState) => {
    let topics = newState.allTopics.map(x => x.topics).flat();
    let ind = topics.findIndex(
        x => x.slug === newState.topicSlug);
    newState.topicName = topics[ind].name;
    setCategoryFromTopic(newState)
};

const setSlugFromTopic = (newState) => {
    let topics = newState.allTopics.map(x => x.topics).flat();
    let ind = topics.findIndex(
        x => x.name === newState.topicName);
    newState.topicSlug = topics[ind].slug;
};

const setCategoryFromTopic = (newState) => {
    newState.allTopics.forEach(obj => {if (obj.topics.map(x => x.slug).includes(newState.topicSlug)){
        newState.activeCategory = obj.catName
    }})
};

export default rootReducer;