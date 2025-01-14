"use client";

import React, { useState, useEffect } from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components'

const flipTop = keyframes`
  100% {
    transform: rotateX(90deg);
  }
`

const flipBottom = keyframes`
  100% {
    transform: rotateX(0deg);
  }
`

const DealContainer = styled.div`
  font-size: 16px;
  *, *::after, *::before {
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }
  color: #e7ab3c;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  justify-content: center;
  font-size: 1.5rem;
`

const ContainerSegment = styled.div`
  display: flex;
  flex-direction: column;
  gap: .1em;
  align-items: center;
`

const Segment = styled.div`
  display: flex;
  gap: .1em;
`

const SegmentTitle = styled.div`
  font-size: 0.75em;
`

const FlipCard = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, .2);
  border-radius: .1em;
`

const CardPart = styled.div`
  height: .75em;
  line-height: 1;
  padding: .25em;
  overflow: hidden;
`

const TopHalf = styled(CardPart)`
  background-color: #f7f7f7;
  border-top-right-radius: .1em;
  border-top-left-radius: .1em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

const BottomHalf = styled(CardPart)`
  background-color: white;
  display: flex;
  align-items: flex-end;
  border-bottom-right-radius: .1em;
  border-bottom-left-radius: .1em;
`

const TopFlip = styled(CardPart)`
  position: absolute;
  width: 100%;
  animation: ${flipTop} 250ms ease-in;
  transform-origin: bottom;
  background-color: #f7f7f7;
  border-top-right-radius: .1em;
  border-top-left-radius: .1em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

const BottomFlip = styled(CardPart)`
  position: absolute;
  bottom: 0;
  width: 100%;
  animation: ${flipBottom} 250ms ease-out 250ms;
  transform-origin: top;
  transform: rotateX(90deg);
  background-color: white;
  display: flex;
  align-items: flex-end;
  border-bottom-right-radius: .1em;
  border-bottom-left-radius: .1em;
`

const Deal = () => {
  const [countdown, setCountdown] = useState({
    days: { tens: 0, ones: 0 },
    hours: { tens: 0, ones: 0 },
    minutes: { tens: 0, ones: 0 },
    seconds: { tens: 0, ones: 0 }
  })

  useEffect(() => {
    const countToDate = new Date().setDate(new Date().getDate() + 30) 

    const intervalId = setInterval(() => {
      const currentDate = new Date()
      const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000)
      
      const days = Math.floor(timeBetweenDates / 86400)
      const hours = Math.floor((timeBetweenDates % 86400) / 3600)
      const minutes = Math.floor((timeBetweenDates % 3600) / 60)
      const seconds = timeBetweenDates % 60

      setCountdown({
        days: { tens: Math.floor(days / 10), ones: days % 10 },
        hours: { tens: Math.floor(hours / 10), ones: hours % 10 },
        minutes: { tens: Math.floor(minutes / 10), ones: minutes % 10 },
        seconds: { tens: Math.floor(seconds / 10), ones: seconds % 10 }
      })
    }, 250)

    return () => clearInterval(intervalId)
  }, [])

  const FlipCardComponent = ({ value }) => {
    const [flip, setFlip] = useState(false)
    const [number, setNumber] = useState(value)

    useEffect(() => {
      if (value !== number) {
        setFlip(true)
        setTimeout(() => {
          setNumber(value)
          setFlip(false)
        }, 500)
      }
    }, [value])

    return (
      <FlipCard>
        <TopHalf>{number}</TopHalf>
        <BottomHalf>{number}</BottomHalf>
        {flip && (
          <>
            <TopFlip>{number}</TopFlip>
            <BottomFlip>{value}</BottomFlip>
          </>
        )}
      </FlipCard>
    )
  }

  return (
    <DealContainer>
      <Container>
        <ContainerSegment>
          <SegmentTitle>Days</SegmentTitle>
          <Segment>
            <FlipCardComponent value={countdown.days.tens} />
            <FlipCardComponent value={countdown.days.ones} />
          </Segment>
        </ContainerSegment>
        <ContainerSegment>
          <SegmentTitle>Hours</SegmentTitle>
          <Segment>
            <FlipCardComponent value={countdown.hours.tens} />
            <FlipCardComponent value={countdown.hours.ones} />
          </Segment>
        </ContainerSegment>
        <ContainerSegment>
          <SegmentTitle>Minutes</SegmentTitle>
          <Segment>
            <FlipCardComponent value={countdown.minutes.tens} />
            <FlipCardComponent value={countdown.minutes.ones} />
          </Segment>
        </ContainerSegment>
        <ContainerSegment>
          <SegmentTitle>Seconds</SegmentTitle>
          <Segment>
            <FlipCardComponent value={countdown.seconds.tens} />
            <FlipCardComponent value={countdown.seconds.ones} />
          </Segment>
        </ContainerSegment>
      </Container>
    </DealContainer>
  )
}

export default Deal

