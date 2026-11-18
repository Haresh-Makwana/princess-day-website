import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SparkleTrail from './SparkleTrail';
import GiftBox from './GiftBox';
import StoryJourney from './StoryJourney';
import PrincessChoices from './PrincessChoices';
import HiddenGiftsGame from './HiddenGiftsGame';
import TeddyReveal from './TeddyReveal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [giftOpened, setGiftOpened] = useState(false);
  const [choices, setChoices] = useState({ title: null, powers: [] });
  const [openedGiftIds, setOpenedGiftIds] = useState([]);

  const handleReset = () => {
    setGiftOpened(false);
    setChoices({ title: null, powers: [] });
    setOpenedGiftIds([]);
    setCurrentScreen(1);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-pink-50 text-slate-800">
      <SparkleTrail />

      <AnimatePresence mode="wait">
        {currentScreen === 1 && (
          <GiftBox
            key="screen1"
            alreadyOpened={giftOpened}
            onOpened={() => setGiftOpened(true)}
            onNext={() => setCurrentScreen(2)}
          />
        )}

        {currentScreen === 2 && (
          <StoryJourney
            key="screen2"
            onBack={() => setCurrentScreen(1)}
            onNext={() => setCurrentScreen(3)}
          />
        )}

        {currentScreen === 3 && (
          <PrincessChoices
            key="screen3"
            choices={choices}
            setChoices={setChoices}
            onBack={() => setCurrentScreen(2)}
            onNext={() => setCurrentScreen(4)}
          />
        )}

        {currentScreen === 4 && (
          <HiddenGiftsGame
            key="screen4"
            openedIds={openedGiftIds}
            setOpenedIds={setOpenedGiftIds}
            onBack={() => setCurrentScreen(3)}
            onNext={() => setCurrentScreen(5)}
          />
        )}

        {currentScreen === 5 && (
          <TeddyReveal
            key="screen5"
            choices={choices}
            onBack={() => setCurrentScreen(4)}
            onReset={handleReset}
          />
        )}
      </AnimatePresence>
    </div>
  );
}