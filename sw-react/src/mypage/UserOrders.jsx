import React, { useState, useEffect } from 'react';
import SignApiClient from "../services/auth/SignApiClient";
import UserOrderCard from './UserOrderCard';
import styled from "styled-components";
import MyPage from "./MyPage";
import AdminApiClient from '../services/store/AdminApiClient';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";

const CalendarContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  width: 200px;
  height: 48px;
  border: 0.8px solid var(--festie-gray-600, #949494);
  border-radius: 10px;
  padding: 0px 12px;
  color: var(--festie-gray-800, #3a3a3a);
  font-family: SUIT Variable;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  text-align: start;
  appearance: none;
  background-color: white;
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
`;

const CalendarWrapper = styled.div`
  z-index: 11;
  position: absolute;
  top: 100%;
  left: 0;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const UserOrders = ({value}) => {
    const [orders, setOrders] = useState(null);
    const [pageRefresh, setPageRefresh] = useState(false);

    const [nowDate, setNowDate] = useState("전체");
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleCalendar = () => {
        setIsOpen(!isOpen);
      };

    const handleDateChange = (selectedDate) => {
        setIsOpen(false);
        setNowDate(moment(selectedDate).format("YYYY-MM-DD"));
    };

    useEffect(() => {
        SignApiClient.loginCheck();
        const accessToken = localStorage.getItem('accessToken');
        if(nowDate === '전체') {
            AdminApiClient.getFullOrderList(accessToken).then(res => {
            if(res.ok) {
                res.json().then(json => {
                if(json.code === "401") {
                    //요청 오류
                    console.log(json.message);
                } else {
                    if (Object.keys(json).length === 0) {
                        setOrders(null);
                    } else {
                        setOrders(json);
                    }
                }
                });
            }
            });
        } else {
            AdminApiClient.getOrdersByDate(accessToken, nowDate).then(res => {
                if(res.ok) {
                    res.json().then(json => {
                    if(json.code === "401") {
                        //요청 오류
                        console.log(json.message);
                    } else {
                        if (Object.keys(json).length === 0) {
                            setOrders(null);
                        } else {
                            setOrders(json);
                        }
                    }
                    });
                }
            });
        }
      }, [pageRefresh, nowDate]);

    return (
        <div className="camping_bookmark_container">
            <MyPage />
            <h3>주문내역</h3>
            <CalendarContainer>
            <DropdownButton onClick={handleToggleCalendar}>{nowDate}</DropdownButton>
            <CalendarWrapper isOpen={isOpen}>
            <Calendar onChange={handleDateChange} value={value}></Calendar>
            </CalendarWrapper>
            </CalendarContainer>
            
            

            <div className="camping_empty_state">
                {!orders && (
                    <p>주문 내역이 없습니다.</p>
                )}
            </div>
            
            <div className='camping_cards_container'>
                {orders && orders.map((order) => (
                <div className="camping_card_wrapper" key={order.id}>
                <UserOrderCard key={order.id} order={order} setPageRefresh={setPageRefresh}/>
                </div>
                ))}
               
            </div>
            
        </div>
    );
};

export default UserOrders;

