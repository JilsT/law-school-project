import React from 'react'
import { FaLocationArrow } from 'react-icons/fa';
import { BsCalendarDate } from 'react-icons/bs'
import { IoPricetags } from 'react-icons/io5'

import Button from './button';

import '../components/card.css';

const Card = () => {

  const data = [
    {
      companyName: "Eco Focus",
      companyDescription: "Helps you concentrate.",
      location: "Hamirpur, Himachal Pradesh",
      date: "01/06/2012",
      money: "1.5k/month"
    },
    {
      companyName: "Innovation Arch",
      companyDescription: "Build new ideas together.",
      location: "Gurgaon, Haryana",
      date: "01/04/2001",
      money: "7k/month"
    },
  ]

  return (<>
    <div className='cards'>
      {
        data.map(data => {
          return (
            <div className='card' key={data.date}>
              <div className='card-content'>
                <div className='card-head'>
                  <h1>{data.companyName}</h1>
                  <h2>{data.companyDescription}</h2>
                </div>
                <div className='card-location'>
                  <FaLocationArrow className='icon' />
                  {data.location}
                </div>

                <div className='card-details'>
                  <div className='date'>
                    <h4><BsCalendarDate className='icon' />  Start Date</h4>
                    <p className='detail-context'>{data.date}</p>
                  </div>
                  <div className='money'>
                    <h4><IoPricetags className='icon' /> CTC</h4>
                    <p className='detail-context'>{data.money}</p>
                  </div>
                </div>
              </div>
              <hr style={{height: "0.2px", color: "gray"}}/>
              <div className='card-btn'>
                <Button>View Details</Button>
              </div>
            </div>
          )
        })

      }
    </div>
  </>
  );

}

export default Card;    