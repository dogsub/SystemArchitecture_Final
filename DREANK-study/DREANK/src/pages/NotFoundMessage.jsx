import { Link } from 'react-router-dom';

const NotFoundMessage = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '60vh',
      textAlign: 'center',
      color: '#333',
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      margin: '30px',
      fontSize: '1rem'
    }}>
      <h1 style={{ fontSize: '6rem', margin: '0' }}>404</h1>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '10px 0' }}>게시글을 찾을 수 없습니다</p>
      <p style={{ margin: '10px 0' }}>요청하신 게시글이 존재하지 않거나, 삭제되었습니다. 입력하신 주소가 정확한지 다시 한번 확인해주세요.</p>
      <Link to="/" style={{
        textDecoration: 'none',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        borderRadius: '5px',
        fontWeight: 'bold',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        marginTop: '20px',
        fontSize: '1rem'
      }}>
        메인페이지로 돌아가기
      </Link>
      <p style={{ fontSize: '0.8rem', marginTop: '30px', color: '#666' }}>
          Link your dream with DREANK!
      </p>
    </div>
  );
};

export default NotFoundMessage;
