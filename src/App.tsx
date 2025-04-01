import React, {useState, useEffect} from "react";
import "./App.css";
import {totalQuizNumber, pokeImageUrl, pokeName, pokeId} from "./pokeData";
import initialProcess from "./initialProcess";

const App = () => {
  const [inputAnswer, setInputAnswer] = useState<string>(""); // プレイヤーの回答
  const [quizCount, setQuizCount] = useState<number>(0); // 問題数
  const [feedback, setFeedback] = useState<string>(""); // 回答結果
  const [score, setScore] = useState<number>(0); // 正解数
  const [playerName, setPlayerName] = useState<string>(""); // プレイヤー名
  const [startDisplay, setStartDisplay] = useState<boolean>(true); // スタート画面か
  const [eachResult, setEachResult] = useState<boolean>(false); // 結果画面か
  const [finalResult, setFinalResult] = useState<boolean>(false); // 最終結果画面か
  const [nextQuiz, setNextQuiz] = useState<boolean>(false); // 次の問題にいくか
  const [playerNameError,setPlayerNameError] = useState<any>(""); // プレイヤー名入力エラー内容

  useEffect(() => {
    initialProcess();
    console.log(pokeImageUrl);
    console.log(pokeName);
    console.log(pokeId);
  }, []);

  /**
    * プレイヤー名入力バリデーションチェック
    */
  const validate = (value: string)=>{
    if(value.length === 0){
      return "ユーザー名を入力して下さい";
    }else if(!value.match(/^[A-Za-z0-9]*$/)){
      return "半角英数字のみで入力して下さい";
    }
    return "";
  };

  /**
    * プレイヤー名のバリデーションチェックを行い、問題を開始する
    */
  const handleStartClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = validate(playerName);
    if (result !== "") {
      setPlayerNameError(result);
      return;
    };

    setStartDisplay(false);
    setNextQuiz(true);
  };

  /**
    * ユーザーが入力した答えの正誤判定を行う
    */
  const handleAnswerSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(inputAnswer);

    if(inputAnswer === pokeName[quizCount]){
      setFeedback("○");
      setScore((prevScore) => prevScore + 1);
    } else {
      setFeedback("×");
    };

    console.log(feedback);
    setEachResult(true);
    setNextQuiz(false);
  };

  /**
    * 次の問題に進む処理を行う
    */
  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setQuizCount((prevQuizCount) => prevQuizCount + 1);
    if(quizCount < totalQuizNumber - 1){
      setEachResult(false);
      setNextQuiz(true);
      setInputAnswer("");
      setFeedback("");
   }else{
      setEachResult(false);
      setNextQuiz(false);
      setFinalResult(true);
   };
     console.log(score);
     console.log(quizCount);
  };

  /**
    * プレイヤー名入力のバリデーションをonBlurで設定
    */
  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = validate(e.target.value);
    setPlayerNameError(result);
  };

  return (
    <div>
      <h1>ポケモンクイズ</h1>
      {startDisplay ? (
        <div>
          <form onSubmit = {(e) => handleStartClick(e)}>
            <input
              type = "text"
              onChange = {(e) => setPlayerName(e.target.value)}
              value = {playerName}
              placeholder = "ここにプレイヤー名を入力"
              onBlur = {onBlur}
            />
            <button>スタート</button>
            {playerNameError !== "" && <p>{playerNameError}</p>}
          </form>
        </div>
      ) : nextQuiz ? (
        <div>
          <h2>{quizCount + 1 }問目</h2>
          <img 
            src = {pokeImageUrl[quizCount]}
            width = "200px"
            height = "200px"
         />
         <form onSubmit = {(e) => handleAnswerSubmit(e)}>
            <input
              type = "text"
              onChange = {(e) => setInputAnswer(e.target.value)}
              value = {inputAnswer}
            />
            <button>回答</button>
         </form>
        </div>
      ) : eachResult ? (
        <div>
          <p>解答結果</p>
          <h2>{feedback}</h2>
          <img 
            src = {pokeImageUrl[quizCount]}
            width = "200px"
            height = "200px"
          />
          <p>答えは 「{pokeName[quizCount]}」</p>
          <button onClick={handleNextClick}>次へ</button>
        </div>
      ) : finalResult ? (
        <div>
          <p>{playerName}さんの結果は</p>
          <p>{score}点でした！</p>
        </div>
      ):(
        <div>
          <p>error</p>
        </div>
      )
      }
    </div>
  );
};

export default App;
