import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Box, Button, Typography } from '@mui/material';

// TODO1: score 記録機能
// TODO2: ボタンに各手の画像表示

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

const HandDataDict: { [index: number]: HandDataType } = {
  0: { type: 0, imgPath: './src/assets/janken_gu.png' }, // 'Rock'
  1: { type: 1, imgPath: './src/assets/janken_pa.png' }, // 'Paper'
  2: { type: 2, imgPath: './src/assets/janken_choki.png' }, // 'Scissors'
};

const TargetTaskDict: { [index: number]: TaskType } = {
  0: { type: 0, text: '勝て！' }, // 'Win'
  1: { type: 1, text: '負けろ！' }, // 'Lose'
  2: { type: 2, text: '引き分けろ！' }, // 'Draw'
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

  const judgementGame = (yourHandIndex: number): boolean => {
    const oppoInfo: [number, number] = [oppoHandState.type, oppoTaskState.type];
    let retIsWhetherWin = false;
    switch (yourHandIndex) {
      // Rock
      case 0:
        // If Opposite hand state is Rock & Draw, you are win.
        if (oppoInfo[0] === 0 && oppoInfo[1] === 2) retIsWhetherWin = true;
        // If Opposite hand state is Paper & Lose, you are win.
        else if (oppoInfo[0] === 1 && oppoInfo[1] === 1) retIsWhetherWin = true;
        // If Opposite hand state is Scissors & Win, you are win.
        else if (oppoInfo[0] === 2 && oppoInfo[1] === 0) retIsWhetherWin = true;
        break;

      // Paper
      case 1:
        // If Opposite hand state is Rock & Win, you are win.
        if (oppoInfo[0] === 0 && oppoInfo[1] === 0) retIsWhetherWin = true;
        // If Opposite hand state is Paper & Draw, you are win.
        else if (oppoInfo[0] === 1 && oppoInfo[1] === 2) retIsWhetherWin = true;
        // If Opposite hand state is Scissors & Lose, you are win.
        else if (oppoInfo[0] === 2 && oppoInfo[1] === 1) retIsWhetherWin = true;
        break;

      // Scissors
      case 2:
        // If Opposite hand state is Rock & Lose, you are win.
        if (oppoInfo[0] === 0 && oppoInfo[1] === 1) retIsWhetherWin = true;
        // If Opposite hand state is Paper & Win, you are win.
        else if (oppoInfo[0] === 1 && oppoInfo[1] === 0) retIsWhetherWin = true;
        // If Opposite hand state is Scissors & Draw, you are win.
        else if (oppoInfo[0] === 2 && oppoInfo[1] === 2) retIsWhetherWin = true;
        break;
    }
    if (retIsWhetherWin)
      console.log("You are Win!!");
    else
      console.log("You are Lose...");

    return retIsWhetherWin;
  };

  const setNextOppositeHand = () => {
    const oppositeTask = getRandomTaskData();
    setOppositeTaskState(oppositeTask);
    const oppoHandData = getRandomHandData();
    setOppositeHandState(oppoHandData);
  };

  const playGame = (yourHandIndex: number) => {
    judgementGame(yourHandIndex);
    setNextOppositeHand();
  }

  return (
    <>
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
        <Button variant="contained" sx={{ margin: '0px 1px' }} onClick={() => {playGame(0)}}>
          Gu
        </Button>
        <Button variant="contained" sx={{ margin: '0px 1px' }} onClick={() => {playGame(1)}}>
          Pa
        </Button>
        <Button variant="contained" sx={{ margin: '0px 1px' }} onClick={() => {playGame(2)}}>
          Choki
        </Button>
      </Box>
    </>
  );
}

export default App;
