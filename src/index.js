import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';  //*
import { Provider } from 'react-redux'; //*

import App from './App';
import board_reducer from './App_reducer'; //*

let store = createStore(board_reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); //*

ReactDOM.render(
	<Provider store={store}> //*
		<App />
	</Provider>,//*
	document.getElementById('root')
);

/*
  0.
  별 주석이 달린 부분은 create-react-app 으로 생성된 index.js 파일에 추가로 입력한 내용을 의미.

  위 세팅은 App_reducer.js 파일을 Redux 문법에 맞춰서 App 전체에서 사용할 수 있도록 만들어 놓은것.
  
  데이터 입출력 관련된 모든 기능은 
  App_reducer.js 파일에 구현되어 있음.
*/
