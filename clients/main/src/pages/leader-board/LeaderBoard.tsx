import type { FC } from "react";
import { useParams } from "react-router-dom";
import { withAuth } from "@hilma/auth-client";

import WhiteCard from "../../components/common/white-card/WhiteCard";
import { useI18n } from "../../i18n/i18n-main";
import { useGetScore } from "../../common/hooks/queries/score.queries";
import { useGetQuiz } from "../../common/hooks/queries/quiz.queries";

import "./leader-board.scss";

// eslint-disable-next-line react-refresh/only-export-components -- component name
const LeaderBoard: FC = () => {
  const i18n = useI18n((i18n) => i18n.leaderBoardText);
  const CROWN_COLOR = ["gold", "silver", "bronze"];

  const { quizId } = useParams();
  const parsedQuizId = quizId ? parseInt(quizId) : 0;
  const { data: scoreData } = useGetScore(parsedQuizId);
  const { data: quizData } = useGetQuiz(parsedQuizId);
  const quizName = quizData?.title;

  return (
    <div className="leader-board-page">
      <WhiteCard>
        {scoreData ? (
          <div className="leader-board-content">
            <h1 className="title">{i18n.leaderBoardTitle}:</h1>
            <h2 className="quiz-name">{quizName}</h2>
            <table className="leader-board-table">
              <thead>
                <tr className="leader-board-table-row">
                  <th className="leader-board-table-head"> </th>
                  <th className="leader-board-table-head">{i18n.name}</th>
                  <th className="leader-board-table-head">{i18n.score}</th>
                  <th className="leader-board-table-head">{i18n.date}</th>
                </tr>
              </thead>
              <tbody>
                {scoreData
                  .sort((a, b) => b.score - a.score)
                  .map((leader, i) => (
                    <tr className="leader-board-table-row" key={`leader${i}`}>
                      <th className="leader-board-table-head">{i + 1}</th>
                      <td className="player-name">
                        {leader.playerName}
                        {i < 3 && (
                          <img
                            src={`/icons/${CROWN_COLOR[i]}-crown.svg`}
                            alt={`${CROWN_COLOR[i]}-crown`}
                          />
                        )}
                      </td>
                      <td className="score">{leader.score}</td>
                      <td>{new Date(leader.playedAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h1>{i18n.noData}</h1>
        )}
      </WhiteCard>
      <img
        className="leader-board-monkey"
        src="/images/leader-board-monkey.svg"
        alt="leader-board-monkey"
      />
    </div>
  );
};

const wrappedLeaderBoard = withAuth(LeaderBoard, { access: "private" });
export default wrappedLeaderBoard;
