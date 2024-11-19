import React from 'react';
import { Link } from 'react-router-dom';

import './SearchStudy.css';

const SearchScheduleStudy=()=>{
    
    return(
        <>
        <Link to='/study-search-schedule'>
            <div className='search-schedule-popup'>
                <div className='search-schedule-intro'>당신의 일정에 맞는 스터디를 찾아보세요</div>
                --*알맞은 이미지로 변경해주세요*--
            </div>
        </Link>
        </>
    )
}

export default SearchScheduleStudy;