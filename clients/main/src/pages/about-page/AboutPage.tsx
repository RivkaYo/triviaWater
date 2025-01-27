import { type FC } from "react";
import { withAuth } from "@hilma/auth-client";

import { useI18n } from "../../i18n/i18n-main";
import WhiteCard from "../../components/common/white-card/WhiteCard";

import "./about-page.scss";

// eslint-disable-next-line react-refresh/only-export-components -- component name
const AboutPage: FC = () => {
  const i18n = useI18n((i18n) => i18n.aboutPage);

  return (
    <WhiteCard width="70vw" height="73vh">
      <div className="about-container">
        <div>
          <img className="gold-medal" src="/images/gold-medal.png" />
        </div>
        <h1 className="main-title"> {i18n.mainTitle} </h1>
        <p className="about-us">
          {i18n.aboutUsPartOne}
          <br />
          {i18n.aboutUsPartTwo}
        </p>
        <div className="team-list">
          <h2 className="list-title"> {i18n.listTitle} </h2>
          <br />
          <li className="list-body">{i18n.liOne}</li>
          <li className="list-body">{i18n.liTwo}</li>
          <li className="list-body">{i18n.liThree}</li>
          <li className="list-body">{i18n.liFour}</li>
          <li className="list-body">{i18n.liFive}</li>
          <li className="list-body">{i18n.liSix}</li>
        </div>
        <h2 className="thanks-head">{i18n.thanksHead}</h2>
        <div className="thanks">
          <div className="thanks-for">
            <h1 className="thanks-title">{i18n.thanksOneTitle}</h1>
            <p className="thanks-description">{i18n.thanksOneDescription}</p>
          </div>
          <div className="thanks-for">
            <h1 className="thanks-title">{i18n.thanksTwoTitle}</h1>
            <p className="thanks-description">{i18n.thanksTwoDescription}</p>
          </div>
          <div className="thanks-for">
            <h1 className="thanks-title">{i18n.thanksThreeTitle}</h1>
            <p className="thanks-description">
              {i18n.thanksThreeDescription}
              <pre> {i18n.thanksThreePre} </pre>
            </p>
          </div>
          <div className="thanks-for">
            <h1 className="thanks-title">{i18n.thanksFourTitle} </h1>
            <p className="thanks-description">{i18n.thanksFourDescription}</p>
          </div>
          <div className="thanks-for">
            <h1 className="thanks-title">{i18n.thanksFiveTitle}</h1>
            <p className="thanks-description">{i18n.thanksFiveDescription}</p>
          </div>
        </div>
        <div className="hello-monkey">
          <img
            className="hello-monkey-img"
            src="/images/hello-monkey.png"
            alt="hello monkey"
          />
        </div>
      </div>
    </WhiteCard>
  );
};

const wrappedAboutPage = withAuth(AboutPage, { access: "private" });

export default wrappedAboutPage;
