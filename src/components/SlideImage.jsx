import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper/modules'
import { motion,AnimatePresence } from 'framer-motion'
import FraudPopup from './FraudPopup'
import 'swiper/css'
import 'swiper/css/effect-cards'
import '../styles/SlideImage.css'
import SuccessPopup from './SuccessPopup'
import GameOver from './GameOver'

export default function SlideImage({images,points,setPoints}) {
  const [cards, setCards] = useState(images)
  const [fraudPopup,setFraudPopup]=useState(false);
  const [successPopup,setSuccessPopup]=useState(false)
  const handleSwipe = (direction, index) => {
    if (direction === 'up' || direction === 'down') {
      const newCards = cards.filter((_, i) => i !== index)
      if(direction==='up'&& cards[index].fraud==true) {
        setPoints(points+5);
        setFraudPopup(true);
      }
      if(direction==='down'&& cards[index].fraud==false) {
        setPoints(points+5);
        setSuccessPopup(true)
      }
      
      setCards(newCards)
    }
  }
  const gameOver = cards.length === 0
  return (
    <div id="app">
        {!gameOver && (<Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
         <AnimatePresence>
          {cards.map((card, index) => (
            <SwiperSlide key={card.imageUrl}>
              <motion.div
                className="slide-card"
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                onDragEnd={(e, info) => {
                  if (info.offset.y < -100) {
                    handleSwipe('up', index)
                  } else if (info.offset.y > 100) {
                    handleSwipe('down', index)
                  }
                }}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: info => (info < 0 ? -300 : 300) }}
                style={{
                  backgroundImage: `url(${card.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* <div className="label">
                  {card.fraud === 'T' ? 'FRAUD' : 'SAFE'}
                </div> */}
              </motion.div>
            </SwiperSlide>
          ))}
        </AnimatePresence>
      </Swiper>)}
      {fraudPopup && <FraudPopup onClose={() =>setFraudPopup(false)} />}
   {successPopup&& <SuccessPopup onClose={() =>setSuccessPopup(false)} />}
     {gameOver && <GameOver points={points} />}
    </div>
  )
}
