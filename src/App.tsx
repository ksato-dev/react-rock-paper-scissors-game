import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Box, Button, Typography } from '@mui/material';

import rockImage from './assets/janken_gu.png';
import paperImage from './assets/janken_pa.png';
import scissorsImage from './assets/janken_choki.png';

interface HandDataType {
  // type: string;
  type: number;
  imgPath: string;
}

interface TaskType {
  // type: string;
  type: number;
  text: string;
}

enum HandEnum {
  Rock = 0,
  Paper = 1,
  Scissors = 2,
}

enum TaskEnum {
  Win = 0,
  Lose = 1,
  Draw = 2,
}

const HandDataDict: { [index: number]: HandDataType } = {
  0: { type: HandEnum.Rock, imgPath: rockImage },
  1: { type: HandEnum.Paper, imgPath: paperImage },
  2: { type: HandEnum.Scissors, imgPath: scissorsImage },
};

const TargetTaskDict: { [index: number]: TaskType } = {
  0: { type: TaskEnum.Win, text: '勝て！' },
  1: { type: TaskEnum.Lose, text: '負けろ！' },
  2: { type: TaskEnum.Draw, text: '引き分けろ！' },
};

const getRandomTaskData = (): TaskType => {
  const index = Math.floor(Math.random() * 3);
  const retTask = TargetTaskDict[index];
  // console.log(retTask);
  return retTask;
};

const getRandomHandData = (): HandDataType => {
  const index = Math.floor(Math.random() * 3);
  const retHandData = HandDataDict[index];
  // console.log(retHandData);
  return retHandData;
};

function App() {
  const initOppoTaskState = getRandomTaskData();
  const initOppoHandState = getRandomHandData();
  const [oppoTaskState, setOppositeTaskState] =
    useState<TaskType>(initOppoTaskState);
  const [oppoHandState, setOppositeHandState] =
    useState<HandDataType>(initOppoHandState);

  const [score, setScore] = useState({ win: 0, lose: 0 });

  const updateScore = (didWin: boolean) => {
    setScore((prevScore) => ({
      win: prevScore.win + (didWin ? 1 : 0),
      lose: prevScore.lose + (didWin ? 0 : 1),
    }));
  };

  const isWin = (player: HandEnum, opponent: HandEnum): boolean => {
    return (player - opponent + 3) % 3 === 1;
  };

  const isDraw = (player: HandEnum, opponent: HandEnum): boolean => {
    return player === opponent;
  };

  const judgementGame = (yourHand: HandEnum): boolean => {
    let result = false;
    const opponentHand = oppoHandState.type as HandEnum;
    const task = oppoTaskState.type as TaskEnum;

    switch (task) {
      case TaskEnum.Win:
        result = isWin(yourHand, opponentHand);
        break;
      case TaskEnum.Lose:
        result = isWin(opponentHand, yourHand);
        break;
      case TaskEnum.Draw:
        result = isDraw(yourHand, opponentHand);
        break;
    }

    if (result) {
      console.log('You are Win!!');
    } else {
      console.log('You are Lose...');
    }

    return result;
  };

  const setNextOppositeHand = () => {
    const oppositeTask = getRandomTaskData();
    setOppositeTaskState(oppositeTask);
    const oppoHandData = getRandomHandData();
    setOppositeHandState(oppoHandData);
  };

  const playGame = (yourHandIndex: number) => {
    const resultGame: boolean = judgementGame(yourHandIndex);
    setNextOppositeHand();
    updateScore(resultGame);
  };

  return (
    <>
      <Typography sx={{ marginBottom: '10px' }} fontSize={'20px'}>
        win: {score.win} / lose: {score.lose}
      </Typography>
      <Typography
        sx={{ marginBottom: '10px' }}
        fontSize={'25px'}
        fontWeight={'Bold'}
      >
        {oppoTaskState.text}
      </Typography>
      <img src={oppoHandState.imgPath} alt="" />
      {/* <Box>
        <Button variant="contained" onClick={setNextOppositeHand}>
          Get Random Hand
        </Button>
      </Box> */}
      <Box sx={{ marginTop: '10px' }}>
        <Button onClick={() => playGame(HandEnum.Rock)}>
          <img src={rockImage} alt="Rock" width={50} />
        </Button>
        <Button onClick={() => playGame(HandEnum.Paper)}>
          <img src={paperImage} alt="Paper" width={50} />
        </Button>
        <Button onClick={() => playGame(HandEnum.Scissors)}>
          <img src={scissorsImage} alt="Scissors" width={50} />
        </Button>
      </Box>
    </>
  );
}

export default App;
