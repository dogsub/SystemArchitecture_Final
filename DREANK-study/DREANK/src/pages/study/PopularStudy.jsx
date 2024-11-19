import React from 'react';
import './Study.css';
import axios from 'axios';

const PopularStudy = ({ position, title, explain }) => {
    const handleJoinClick = async () => {
        try {
            // Ensure the URL is correct; previously had a redundant 'http://'
            const response = await axios.post('http://localhost:8080/study', {
                name: username,  // User's name
                status: 'Waiting'
            });
            console.log('Response:', response.data);
            alert('가입 요청이 전송되었습니다!');
        } catch (error) {
            console.error('가입 요청 에러:', error);
            alert('가입 요청 중 문제가 발생했습니다.');
        }
    };

    return (
        <div className={position}>
            <div className='board-ex'>{explain}</div>
            <div className='study-title'>{title}</div>
            <br />
            <div className='board-writing'>글1</div>
            <div className='board-writing'>글2</div>
            <div className='board-writing'>글3</div>
            <div className='board-writing'>글4</div>
            <div className='board-writing'>글5</div>
            <button className="detail-button" onClick={handleJoinClick}>가입하기</button>
        </div>
    )
}

export default PopularStudy;