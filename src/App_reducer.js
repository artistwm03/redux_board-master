// action type
const BOARD_SAVE = 'SAVE';
const BOARD_REMOVE = 'REMOVE';
const BOARD_READ = 'ONE';
const BOARD_LIST = 'LIST';

/*
  4)
    board_list 는
                글 리스트 뿌림.
    board_save 는
                신규작성 or 수정한 내용 저장.
    board_read 는
                수정하기 위해, 글을 선택..!
    board_remove는
                글 삭제.
      
*/

/*
  6)
    board_save 는
                  파라미터로 저장할 게시글 정보(data)가 필요.!

    board_remove, board_read 는
                                삭제, 수정을 하기 위해서는 글번호(brdno)가 필요.!
                                board_reducer 에서는 action.data, action.brdno 로 파라미터 값을 가지고 와서 사용.!
    board_list 는 
                 그냥 글 전체를 반환, 따라서 파라미터 없이 action type 만 지정.! 

   

*/                         
export const board_save = (data) => ({ 
                                type: BOARD_SAVE,
                                data
                            });
                            
export const board_remove = (brdno) => ({ 
                                type: BOARD_REMOVE,
                                brdno: brdno
                            });

export const board_read = (brdno) => ({ 
                                type: BOARD_READ,
                                brdno: brdno
                            });
                            
export const board_list = () => ({ type: BOARD_LIST });

/*  
  2)
    initialState
    
    Json 으로 구성,

    maxNo         는 최대 글 번호를 의미. 현재 배열보면 2줄 들어가 있는거니까.. 3으로 설정해놓은거.
    boards        는 게시물 데이터를 보관.
    selectedBoard 는 데이터 수정을 위해서 만들어놓음, 선택한 글 정보를 가짐.
*/    
const initialState = {
    maxNo: 3,
    boards: [
            {
                brdno: 1,
                brdwriter: 'Lee SunSin',
                brdtitle: 'If you intend to live then you die',
                brddate: new Date()
            },
            {
                brdno: 2,
                brdwriter: 'So SiNo',
                brdtitle: 'Founder for two countries',
                brddate: new Date()
            }    
    ],
    selectedBoard: {}
};


/*  Reducer 에는 지켜야하는 형식 있어서 복잡해 보임.\

  1)
    데이터를 저장하는 state, 이를 관리하는 board_reducer 함수.
    state 는 별도로 선언 안함.
      ㄴ 는 initialState 로 초기값 지정.!

*/    
/*
  3)
    board_reducer 함수 정리.

    여기서 모든 처리가 이루어짐.
    모든 처리가 이루어지기 때문에 뭔가 구분시켜줘야겠지.?
    파라미터로 제공되는 action 의 종류( type )에 따라 어떤처리(CRUD 중)를 할 지 구현.!

    action 종류는 맨위에 보면 "4가지의 상수(const)"로 구현 되어 있음.
      ㄴ  const BOARD_SAVE = 'SAVE';
          const BOARD_REMOVE = 'REMOVE';
          const BOARD_READ = 'ONE';
          const BOARD_LIST = 'LIST';
*/
/*
  5)
    App.reducer.js 외부에서 board_reducer 호출 하는게 아니고..! 
    액션 종류에 따라 board_list, board_save, board_read, board_remove 호출해서 사용.!
      -> action type 이 같이 파라미터로 제공.! 

*/

export default function board_reducer(state = initialState, action) {
    let boards = state.boards;
    
    switch(action.type) {
        case BOARD_SAVE:
            let data = action.data;
            let maxNo = state.maxNo;
            if (!data.brdno) {    // new : Insert
                return {maxNo: maxNo+1, boards: boards.concat({...data, brdno: maxNo, brddate: new Date()}), selectedBoard: {} };
            } 
            return {...state, boards: boards.map(row => data.brdno === row.brdno ? {...data }: row), selectedBoard: {} };
        case BOARD_REMOVE:
             return {...state, boards: boards.filter(row => row.brdno !== action.brdno), selectedBoard: {}};
        case BOARD_READ:
             return {
                 ...state,
                 selectedBoard: boards.find(row => row.brdno === action.brdno)
            };
        default:
            return state;
    }
}