import * as t from "./styles";
import mainimage from "../../assets/mainimage.jpg";
import teamgreek from "../../assets/teamgreek.png";

const MainPage = () => {
  return (
    <t.Container>
      <t.Title>DREANK</t.Title>
      <t.Subtitle>Link your dream with Dreank!</t.Subtitle>

      <t.Section1>
        <t.SectionImage1 src={mainimage} alt="Dreank" />
        <t.SectionText1>
          <t.SectionTitle>ABOUT DREANK</t.SectionTitle>
          <t.SectionContent>
            DREANK is a compound word of “Dream” and “Link”.
            <br />
            Our service is designed for college students and job seekers aiming
            for employment or study purposes.
            <br />
            The name was crafted with the aspiration that users sharing a common
            ‘dream’ would be ‘linked’ towards pursuing their individual dreams.
            <br />
            DREANK provides useful features such as a chat function to
            facilitate an active study environment among users.
            <br />
            Join DREANK today and connect with a community of driven
            individuals, where your dreams meet opportunity. Explore features
            designed to enhance your study and job search experience, and turn
            aspirations into reality. With DREANK, your future is just a link
            away.
          </t.SectionContent>
        </t.SectionText1>
      </t.Section1>

      <t.Section2>
        <t.SectionImage2 src={teamgreek} alt="Team GREEK" />
        <t.SectionText2>
          <t.SectionTitle>Team GREEK</t.SectionTitle>
          <t.SectionContent>
            Hello! We are GREEK, a developer team leading the way in web page
            creation innovation.
            <br />
            <br />
            G: Gogeup Web Programming
            <br />
            R: Revolutionary
            <br />
            E: Energetic
            <br />
            E: Educational
            <br />
            K: Kreator
            <br />
            <br />
            With our experience from the Gogeup-Web Programming course, we
            deliver top-notch web development services, redefining the future of
            the web with Revolutionary ideas. Our team is always Energetic,
            filled with vibrant energy, and we adopt an Educational approach to
            continuously learn and grow. Lastly, we are Kreators of creative and
            innovative web content.
            <br />
            <br />
            Partner with the GREEK team to take your web project to the next
            level!
          </t.SectionContent>
        </t.SectionText2>
      </t.Section2>
    </t.Container>
  );
};

export default MainPage;
