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

   글저장(BOARD_SAVE)은 글 번호(brdno) 값이 있으면 수정.! 
                        boards의 모든 행을 검사해서(map), 글 번호가 같은 게시물이면 새로운 게시물(data) 반환,
                        그렇지 않으면 기존 게시물(row)를 반환해서 새로운 배열을 생성

   
                        return {...state, boards: boards.map(row => data.brdno === row.brdno ? {...data }: row), selectedBoard: {} };
                          ㄴ선택한 행은 selectedBoard(){} 로 초기화, 기존 state 값(...state)과 같이 반환.
                          ㄴstate에 변수가 3개 있으니 결국, maxNo 를 같이 반환한 것과 같다.
                          ㄴ(=) return {maxNo: state.maxNo, boards: boards.map(생략), selectedBoard: {} };
                                  ㄴ 생각 조금만 해보면 알 수 있음.
                          ㄴ 변수가 많을 경우, 많은 변수를 다 나열하지말고 ...state 와 같이작성하는게 좋음.!!    

*/

export default function board_reducer(state = initialState, action) {
    let boards = state.boards;
    
    switch(action.type) {
        case BOARD_SAVE:
            let data = action.data;
            let maxNo = state.maxNo;
            if (!data.brdno) {    // 6) new : Insert ( 글 번호 값이 없을 경우)
                return {maxNo: maxNo+1, boards: boards.concat({...data, brdno: maxNo, brddate: new Date()}), selectedBoard: {} };
                // 7) ㄴ기존 게시물 데이터(boards)에 새로운 게시물(data)을 추가(concat)해주고,  글 번호(maxNo)를 1 증가 시키는 라인.
            } 
            return {...state, boards: boards.map(row => data.brdno === row.brdno ? {...data }: row), selectedBoard: {} };
        case BOARD_REMOVE:
             return {...state, boards: boards.filter(row => row.brdno !== action.brdno), selectedBoard: {}};
             // 8) ㄴ 글 삭제는 게시물 데이터(boards)에서 삭제할 글 번호에 해당하는 행을 찾아서 지우는 방식이 아님 !! 중요!! 아님!!
             //       삭제할 게시글이 아닌 게시물(보존할게시물)만 모아서(filter) 다시 생성해주는 방식으로 구현.! 
             //       즉, 눈에만 안보이게 만드는거? , 여러가지 이유 때문에 이렇게 한다고 하는데 자세히는 모름.
        case BOARD_READ:
             return {
                 ...state,
                 selectedBoard: boards.find(row => row.brdno === action.brdno)
            };

            // 9) 주어진 글 번호(brdno)에 맞는 게시글을 찾아서(find) selectedBoard 로 지정하면 끝.
            //    나머지 ( maxNo, boards )는 ...state로 지정해서 반환.!! 
        default:
            return state;
    }
}

/*  
  10)
    React 로 작성한 코드를 Redux 로 바꾸는것은, 지금까지 정리한 App_reducer.js 의 내용이 핵심!! 
    다른 컴퍼넌트에서는 호출해서 사용만 하면 끝~ 
    

*/