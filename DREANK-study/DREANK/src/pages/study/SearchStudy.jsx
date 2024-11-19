import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Study.css';

const SearchStudy = () => {
    const navigate = useNavigate();

    const handleSearch = () => {
        // 검색을 처리하기 위한 로직을 여기에 추가할 수 있습니다
        navigate('/study-search-tag');  // SearchStudyResult 페이지로 리다이렉트합니다
    };

    return (
        <div className="search-study">
            <input type="search" className="search-study-input" placeholder="태그를 입력해 원하는 모임을 검색하세요" />
            <button className="search-study-button" onClick={handleSearch}>검색</button>
        </div>
    );
};

export default SearchStudy;