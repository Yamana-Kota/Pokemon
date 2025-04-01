import {pokeMaxId, totalQuizNumber, pokeImageUrl, pokeName, pokeId} from "./pokeData";

/**
  * ポケモンのAPIデータを取得し、問題を生成する処理を行う
  */
const initialProcess = () =>{

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
}

export default initialProcess;
