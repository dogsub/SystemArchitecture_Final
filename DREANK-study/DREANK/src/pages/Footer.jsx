import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: #334eac;
  color: white;
  text-align: center;
  width: 100%;
  padding: 10px 0;
  position: relative;
  bottom: 0;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <p>© 2024 DREANK. All Rights Reserved.</p>
    </FooterWrapper>
  );
};

export default Footer;