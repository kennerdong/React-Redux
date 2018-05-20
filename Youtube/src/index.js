// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';

// import App from './components/app';
// import reducers from './reducers';

// const createStoreWithMiddleware = applyMiddleware()(createStore);

// ReactDOM.render(
//   <Provider store={createStoreWithMiddleware(reducers)}>
//     <App />
//   </Provider>
//   , document.querySelector('.container'));

import React, { Component } from "react";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetails from './components/video_details';
import _ from 'lodash';

const API_KEY = "AIzaSyCygqeg0cHbhC7VLq5EWDQuXf71u4M7Ulg";

// const App = ()=>{
//   return (
//   <div>
//     <SearchBar/>
//   </div>
//   );
// }

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      videos:[],
      selectedVideo: null
    };

    // YTSearch({ key: API_KEY, term: "王思佳" }, (videos) => {
    //   this.setState({
    //     videos: videos,
    //     selectedVideo: videos[0]
    //   });
    // });

    this.videoSearch("王思佳");
  }

  videoSearch(term){
    YTSearch({ key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
  const videoSearch = _.debounce((term)=>{this.videoSearch(term),30000});

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetails video={this.state.selectedVideo}/>
        <VideoList 
          onVideoSelect={selectedVideo=> this.setState({selectedVideo})}
          videos={this.state.videos}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));
