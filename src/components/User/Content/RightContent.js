import CountDown from "./CountDown";

const RightContent = ({ dataQuiz, handleFinish }) => {
    const onTimeUp = () => {
        handleFinish()
    }
    return (
        <>
            <div className="main-timer">
                <CountDown
                    onTimeUp={onTimeUp}
                />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div key={`question-${index}`} className="question">{index + 1}</div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default RightContent;