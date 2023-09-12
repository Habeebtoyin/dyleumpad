// import React, { useEffect, useState } from 'react'
import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment'; // Assuming you installed the Moment.js library
import Styles from '../../styles/Launchpad.module.css'
import Image from 'next/image'
import {CardStatus} from '../data'
import dots from "../../components/assets/icons/launchpad-card-dots.svg";

type CardHeaderLogoProps ={
    logo:string
}
type CardHeaderDetailsProps ={
    title:string,
}
type CardHeaderContentProps ={
    description:string,
    title:string,
}
export const CardHeaderLogo = ({logo}:CardHeaderLogoProps) => {
  return (
    <Image
        src={logo}
        alt="logo"        
          width="70px"
          height="70px"
          />
  )
}
export const CardHeaderDetails = ({title}:CardHeaderDetailsProps) => {
  return (
    <div style={{flex:2}} >
       <section className={Styles.CardHeaderDetails}>
       <h3>{title}</h3>
        <div className={Styles.rateTag}>
           {
            CardStatus.map((stat,index)=>(
              <div className={Styles.rate} style={{background:`${index % 2 ===1 ?'#D4DA15':'#03FBFC'}`,color:`${index % 2 ===1 ?'#03FBFC':'#D4DA15'}`}} key={index}>{stat.stat}</div>
            ))
           }
        </div>
       
       </section>

    </div>
  )
}

// type CounterDownProps = {
//     startDate:  string;
//     endDate:  string;
//   };

// const CardHeaderCountDown: React.FC<CounterDownProps> = ({ startDate, endDate }) => {
//     export const CardHeaderCountDown = ({ startDate, endDate }:CounterDownProps)=>{
//   const [countDown, setCountDown] = useState('');
//   const [seconds, setSeconds] = useState('');
//   const [minutes, setMinutes] = useState('');
//   const [hours, setHours] = useState('');

//   const calculateCountdown = () => {
//     const endDateTime: number = new Date(endDate).getTime();
//     const currentDateTime: number = new Date().getTime();
//     const startDateTime: number = new Date(startDate).getTime();

//     if (currentDateTime < startDateTime) {
//       setCountDown('Coming Soon');
//     } else if (currentDateTime >= startDateTime && currentDateTime < endDateTime) {
//       let difference = endDateTime - currentDateTime;
//       const secondsRemaining = Math.floor((difference / 1000) % 60);
//       const minutesRemaining = Math.floor((difference / 1000 / 60) % 60);
//       const hoursRemaining = Math.floor((difference / (1000 * 60 * 60)) % 24);

//       setSeconds(secondsRemaining.toString());
//       setMinutes(minutesRemaining.toString());
//       setHours(hoursRemaining.toString());
//     } else {
//       setCountDown('Ended');
//     }
//   };

//   useEffect(() => {
//     calculateCountdown(); // Calculate initially
//     const interval = setInterval(() => {
//       calculateCountdown();
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div className={Styles.End}>
//       <span>{countDown}</span>
//       {countDown !== 'Coming Soon' && (
//         <span>
//           {hours.padStart(2, '0')}:{minutes.padStart(2, '0')}:{seconds.padStart(2, '0')}
//         </span>
//       )}
//     </div>
//   );
// };

// export default CardHeaderCountDown;
// export const CardHeaderCountDown: React.FC<CounterDownProps> = ({ startDate, endDate }) => {
//   const [countDown, setCountDown] = useState('');
//   const [remainingTime, setRemainingTime] = useState<number | null>(null);

//   const calculateCountdown = () => {
//     const endDateTime = new Date(endDate).getTime();
//     const currentDateTime = new Date().getTime();
//     const startDateTime = new Date(startDate).getTime();

//     if (currentDateTime < startDateTime) {
//       setCountDown('Coming Soon');
//       setRemainingTime(null);
//     } else if (currentDateTime >= startDateTime && currentDateTime < endDateTime) {
//       const difference = endDateTime - currentDateTime;
//       setRemainingTime(difference);
//       setCountDown('');
//     } else {
//       setCountDown('Ended');
//       setRemainingTime(null);
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       calculateCountdown();
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   const formatTime = (time: number) => {
//     const seconds = Math.floor((time / 1000) % 60);
//     const minutes = Math.floor((time / (1000 * 60)) % 60);
//     const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className={Styles.End}>
//       <h2 className={Styles.EndTime}>{countDown}</h2>
//       {remainingTime !== null && (
//         <h2 >{formatTime(remainingTime)}</h2>
//       )}
//     </div>
//   );
// };
// import React, { useState, useEffect, useCallback } from 'react';
// import moment from 'moment'; // Assuming you installed the Moment.js library

// export const CardHeaderCountDown: React.FC<CounterDownProps> = ({ startDate, endDate }) => {
//   const [countDown, setCountDown] = useState('');
//   const [remainingTime, setRemainingTime] = useState<number | null>(null);

//   const calculateCountdown = useCallback(() => {
//     const endDateTime = moment(endDate).valueOf();
//     const currentDateTime = moment().valueOf();
//     const startDateTime = moment(startDate).valueOf();

//     if (currentDateTime < startDateTime) {
//       setCountDown('Coming Soon');
//       setRemainingTime(null);
//     } else if (currentDateTime >= startDateTime && currentDateTime < endDateTime) {
//       const difference = endDateTime - currentDateTime;
//       setRemainingTime(difference);
//       setCountDown('');
//     } else {
//       setCountDown('Ended');
//       setRemainingTime(null);
//     }
//   }, [startDate, endDate]);

//   useEffect(() => {
//     const animateCountdown = () => {
//       calculateCountdown();
//       requestAnimationFrame(animateCountdown);
//     };

//     const animationId = requestAnimationFrame(animateCountdown);
//     return () => {
//       cancelAnimationFrame(animationId);
//     };
//   }, [calculateCountdown]);

//   const formatTime = (time: number) => {
//     const duration = moment.duration(time);
//     const hours = duration.hours().toString().padStart(2, '0');
//     const minutes = duration.minutes().toString().padStart(2, '0');
//     const seconds = duration.seconds().toString().padStart(2, '0');
//     return `${hours}:${minutes}:${seconds}`;
//   };

//   return (
//     <div className={Styles.End}>
//       <h2 className={Styles.EndTime}>{countDown}</h2>
//       {remainingTime !== null && (
//         <h2>{formatTime(remainingTime)}</h2>
//       )}
//     </div>
//   );
// };

// export default CardHeaderCountDown;

// const CardHeaderCountDown: React.FC<CounterDownProps> = ({ todayDate, endDate }) => {
// export const CardHeaderCountDown = ({ startDate, endDate }:CounterDownProps)=>{
//     const [countDown, setCountDown] = useState('');
//   const [seconds, setSeconds] = useState('');
//   const [minutes, setMinutes] = useState('');
//   const [hours, setHours] = useState('');

//   const calculateCountdown = () => {
//     const endDateTime: number = new Date(endDate).getTime();
//     const currentDateTime: number = new Date(startDate).getTime();
//     const startDateTime:number = new Date().getTime()
//     let difference = endDateTime - currentDateTime;

//     if (difference <= 0) {
//       setCountDown('Ended');
//     } else  if (currentDateTime <= startDateTime) {
//         setCountDown('coming soon');
//       } else{
//       const secondsRemaining = Math.floor((difference / 1000) % 60);
//       const minutesRemaining = Math.floor((difference / 1000 / 60) % 60);
//       const hoursRemaining = Math.floor((difference / (1000 * 60 * 60)) % 24);

//       setSeconds(secondsRemaining.toString());
//       setMinutes(minutesRemaining.toString());
//       setHours(hoursRemaining.toString());
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       calculateCountdown();
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div className={Styles.End}>
//       {countDown === 'Ended' ? (
//         <span>{countDown}</span>
//       ) : (
//         <span>
//           {hours.padStart(2, '0')}:{minutes.padStart(2, '0')}:{seconds.padStart(2, '0')}
//         </span>
//       )}
//     </div>
//   );
// };

// export const CardHeaderCountDown: React.FC<CounterDownProps> = ({ startDate, endDate }) => {
//   const [countDown, setCountDown] = useState('coming soon');
//   const [timeRemaining, setTimeRemaining] = useState({
//     seconds: '00',
//     minutes: '00',
//     hours: '00'
//   });

//   const calculateCountdown = () => {
//     const endDateTime: number = new Date(endDate).getTime();
//     const currentDateTime: number = new Date(startDate).getTime();
//     const now: number = new Date().getTime();

//     if (currentDateTime > now) {
//       const timeUntilStart = Math.floor((currentDateTime - now) / 1000);
//       setCountDown(`Starts in ${Math.floor(timeUntilStart / 3600)}h ${Math.floor((timeUntilStart % 3600) / 60)}m`);
//     } else if (now > endDateTime) {
//       setCountDown('Ended');
//     } else {
//       const difference = endDateTime - now;
//       const secondsRemaining = Math.floor((difference / 1000) % 60);
//       const minutesRemaining = Math.floor((difference / 1000 / 60) % 60);
//       const hoursRemaining = Math.floor((difference / (1000 * 60 * 60)) % 24);

//       setTimeRemaining({
//         seconds: secondsRemaining.toString().padStart(2, '0'),
//         minutes: minutesRemaining.toString().padStart(2, '0'),
//         hours: hoursRemaining.toString().padStart(2, '0')
//       });
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       calculateCountdown();
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div className={Styles.End}>
//       {countDown === 'Ended' ? (
//         <span>{countDown}</span>
//       ) : (
//         <span>
//           {timeRemaining.hours}:{timeRemaining.minutes}:{timeRemaining.seconds}
//         </span>
//       )}
//     </div>
//   );
// };
type CounterDownProps = {
  startDate:  string;
  endDate:  string;
};

export const CardHeaderCountDown: React.FC<CounterDownProps> = ({ startDate, endDate }) => {
  const [countDown, setCountDown] = useState('');
  const [timeRemaining, setTimeRemaining] = useState({
    seconds: '00',
    minutes: '00',
    hours: '00'
  });

  const calculateCountdown = () => {
    const endDateTime: number = new Date(endDate).getTime();
    const startDateTime: number = new Date(startDate).getTime();
    const now: number = new Date().getTime();

    if (startDateTime > now) {
      const timeUntilStart = Math.floor((startDateTime - now) / 1000);
      const days = Math.floor(timeUntilStart / (3600 * 24));
      const hours = Math.floor((timeUntilStart % (3600 * 24)) / 3600);
      const minutes = Math.floor((timeUntilStart % 3600) / 60);
      const startDateFormatted = new Date(startDate).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
      setCountDown(`Presale Start: ${startDateFormatted}`);
    } else if (now > endDateTime) {
      setCountDown('Presale Ended');
    } else {
      const difference = endDateTime - now;
      const secondsRemaining = Math.floor((difference / 1000) % 60);
      const minutesRemaining = Math.floor((difference / 1000 / 60) % 60);
      const hoursRemaining = Math.floor(difference / (1000 * 60 * 60));
      const endDateFormatted = new Date(endDate).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
      setCountDown(`Presale End: ${endDateFormatted}`);
      setTimeRemaining({
        seconds: secondsRemaining.toString().padStart(2, '0'),
        minutes: minutesRemaining.toString().padStart(2, '0'),
        hours: hoursRemaining.toString().padStart(2, '0')
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calculateCountdown();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={Styles.End}>
      {countDown === 'Presale Ended' ? (
        <span>{countDown}</span>
      ) : (
        <span>
          {countDown !== '' ? countDown : `${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}
        </span>
      )}
    </div>
  );
};

// export const CardHeaderCountDown: React.FC<CounterDownProps> = ({ startDate, endDate }) => {
//   const [countDown, setCountDown] = useState('');
//   const [timeRemaining, setTimeRemaining] = useState({
//     seconds: '00',
//     minutes: '00',
//     hours: '00'
//   });

//   const calculateCountdown = () => {
//     const endDateTime: number = new Date(endDate).getTime();
//     const startDateTime: number = new Date(startDate).getTime();
//     const now: number = new Date().getTime();

//     if (startDateTime > now) {
//       const timeUntilStart = Math.floor((startDateTime - now) / 1000);
//       const days = Math.floor(timeUntilStart / (3600 * 24));
//       const hours = Math.floor((timeUntilStart % (3600 * 24)) / 3600);
//       const minutes = Math.floor((timeUntilStart % 3600) / 60);
//       const startDateFormatted = new Date(startDate).toLocaleString('en-US', {
//         month: 'long',
//         day: 'numeric',
//         hour: 'numeric',
//         minute: 'numeric',
//         hour12: true
//       });
//       setCountDown(`Presale Start: ${startDateFormatted}`);
//     } else if (now > endDateTime) {
//       setCountDown('Presale Ended');
//     } else {
//       const difference = endDateTime - now;
//       const secondsRemaining = Math.floor((difference / 1000) % 60);
//       const minutesRemaining = Math.floor((difference / 1000 / 60) % 60);
//       const hoursRemaining = Math.floor(difference / (1000 * 60 * 60));
//       const endDateFormatted = new Date(endDate).toLocaleString('en-US', {
//         month: 'long',
//         day: 'numeric',
//         hour: 'numeric',
//         minute: 'numeric',
//         hour12: true
//       });
//       setCountDown(`Presale End: ${endDateFormatted}`);
//       setTimeRemaining({
//         seconds: secondsRemaining.toString().padStart(2, '0'),
//         minutes: minutesRemaining.toString().padStart(2, '0'),
//         hours: hoursRemaining.toString().padStart(2, '0')
//       });
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       calculateCountdown();
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div className={Styles.End}>
//       {countDown === 'Presale Ended' ? (
//         <span>{countDown}</span>
//       ) : (
//         <span>
//           {countDown !== '' ? countDown : `${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}
//         </span>
//       )}
//     </div>
//   );
// };
// export const CardHeaderCountDown: React.FC<CounterDownProps> = ({ startDate, endDate }) => {
//   const [countDown, setCountDown] = useState('');
//   const [timeRemaining, setTimeRemaining] = useState({
//     seconds: '00',
//     minutes: '00',
//     hours: '00'
//   });

//   const calculateCountdown = () => {
//     const endDateTime: number = new Date(endDate).getTime();
//     const startDateTime: number = new Date(startDate).getTime();
//     const now: number = new Date().getTime();

//     if (startDateTime > now) {
//       const timeUntilStart = Math.floor((startDateTime - now) / 1000);
//       const days = Math.floor(timeUntilStart / (3600 * 24));
//       const hours = Math.floor((timeUntilStart % (3600 * 24)) / 3600);
//       const minutes = Math.floor((timeUntilStart % 3600) / 60);
//       const startDateFormatted = new Date(startDate).toLocaleString('en-US', {
//         month: 'long',
//         day: 'numeric',
//         hour: 'numeric',
//         minute: 'numeric'
//       });
//       setCountDown(`Presale Start: ${startDateFormatted}`);
//     } else if (now > endDateTime) {
//       setCountDown('Presale Ended');
//     } else {
//       const difference = endDateTime - now;
//       const secondsRemaining = Math.floor((difference / 1000) % 60);
//       const minutesRemaining = Math.floor((difference / 1000 / 60) % 60);
//       const hoursRemaining = Math.floor(difference / (1000 * 60 * 60));
//       const endDateFormatted = new Date(endDate).toLocaleString('en-US', {
//         month: 'long',
//         day: 'numeric',
//         hour: 'numeric',
//         minute: 'numeric'
//       });
//       setCountDown(`Presale End: ${endDateFormatted}`);
//       setTimeRemaining({
//         seconds: secondsRemaining.toString().padStart(2, '0'),
//         minutes: minutesRemaining.toString().padStart(2, '0'),
//         hours: hoursRemaining.toString().padStart(2, '0')
//       });
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       calculateCountdown();
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div className={Styles.End}>
//       {countDown === 'Presale Ended' ? (
//         <span>{countDown}</span>
//       ) : (
//         <span>
//           {countDown !== '' ? countDown : `${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}
//         </span>
//       )}
//     </div>
//   );
// };
// export const CardHeaderCountDown: React.FC<CounterDownProps> = ({ startDate, endDate }) => {
//   const [countDown, setCountDown] = useState('');
//   const [timeRemaining, setTimeRemaining] = useState({
//     seconds: '00',
//     minutes: '00',
//     hours: '00'
//   });

//   const calculateCountdown = () => {
//     const endDateTime: number = new Date(endDate).getTime();
//     const startDateTime: number = new Date(startDate).getTime();
//     const now: number = new Date().getTime();

//     if (startDateTime > now) {
//       const timeUntilStart = Math.floor((startDateTime - now) / 1000);
//       const days = Math.floor(timeUntilStart / (3600 * 24));
//       const hours = Math.floor((timeUntilStart % (3600 * 24)) / 3600);
//       const minutes = Math.floor((timeUntilStart % 3600) / 60);
//       setCountDown(`Presale coming soon: ${days}d ${hours}h ${minutes}m`);
//     } else if (now > endDateTime) {
//       setCountDown('Presale Ended');
//     } else {
//       const difference = endDateTime - now;
//       const secondsRemaining = Math.floor((difference / 1000) % 60);
//       const minutesRemaining = Math.floor((difference / 1000 / 60) % 60);
//       const hoursRemaining = Math.floor((difference / (1000 * 60 * 60)));

//       setTimeRemaining({
//         seconds: secondsRemaining.toString().padStart(2, '0'),
//         minutes: minutesRemaining.toString().padStart(2, '0'),
//         hours: hoursRemaining.toString().padStart(2, '0')
//       });
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       calculateCountdown();
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div className={Styles.End}>
//       {countDown === 'Presale Ended' ? (
//         <span>{countDown}</span>
//       ) : (
//         <span>
//           {countDown !== '' ? countDown : `${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}
//         </span>
//       )}
//     </div>
//   );
// };



export const CardHeaderContent =({description,title}:CardHeaderContentProps)=>{
    return(
        <div className={Styles.CardHeaderContent}>
            <h3>{title}</h3>
           <p>{description}</p>
        </div>
    )
}

export const CardHeaderAllocation =({pool}:any)=>{
    return(
        <div className={Styles.CardHeaderAllocation}>
            <div className={Styles.CardHeaderAllocationStatus}>
                    <p>Status</p> 
                    {pool?.tag === "completed" ? (<h3>{pool?.tag}</h3>):(<h3>{pool?.tag}</h3>)}

            </div>
            <div className={Styles.CardHeaderAllocationStatus}>
                    <p>Max Allocation</p> 
                    <h3>{pool?.maximumPurchase}</h3>
            </div>
            <div className={Styles.CardHeaderAllocationStatus}>
                    <p>Access</p> 
                    <h3>{pool?.access}</h3>
            </div>
        </div>

     
    )
}

