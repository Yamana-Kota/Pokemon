import React, {useState} from "react";
import "./App.css";

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
    * ポケモンのAPIデータを取得し、問題を生成する処理を行う
    */
  const handleStartClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = validate(playerName);
    if (result !== "") {
      setPlayerNameError(result);
      return;
    };

    for(let i = 0; i < totalQuizNumber; i++){
        while(true){
          const tmp: number = Math.floor(Math.random()*pokeMaxId) + 1;
          if(!pokeId.includes(tmp)){
            pokeId[i] = tmp;
            break;
          };
        };

      const fetchPokemonUrl = async () => {
        const responseImage = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokeId[i]);
        const resultImage = await responseImage.json();
        return resultImage;
      };
  
      fetchPokemonUrl().then((resultImage)=>{
        pokeImageUrl[i] = resultImage.sprites.front_default;
      });
  
      const fetchPokemonName = async () => {
        const responseName = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + pokeId[i]);
        const resultName = await responseName.json();
        return resultName;
      };
  
      fetchPokemonName().then((resultName)=>{
        pokeName[i] = resultName.names[0].name;
      });
    };
    
    console.log(pokeImageUrl);
    console.log(pokeName);
    console.log(pokeId);

    setStartDisplay(false);
    console.log(startDisplay);

    setNextQuiz(true);
    console.log(nextQuiz);
  };

  /**
    * ユーザーが入力した答えの正誤判定を行う
    */
  const handleAnswerSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(inputAnswer);

    if(inputAnswer == pokeName[quizCount]){
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
      {startDisplay ? (
        <div>
          <h1>ポケモンクイズ</h1>
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
          <h1>ポケモンクイズ</h1>
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
        </div>
      )
      }
    </div>
  );
};

const pokeMaxId: number = 1025;
const totalQuizNumber = 10;
const pokeImageUrl:string[] = Array(totalQuizNumber);
const pokeName:string[] = Array(totalQuizNumber);
const pokeId:number[] = Array(totalQuizNumber);

export default App;
