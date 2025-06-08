import _ from "lodash";

const Question = ({ currQ, data, handleCheckBox }) => {
    if (_.isEmpty(data)) {
        return (<></>)
    }

    const handleCheckBoxChild = (event, qId, aId) => {
        handleCheckBox(aId, qId);
    }

    return (
        <>
            {data.image ?
                <div className="q-image">
                    <img src={`data:image/jpeg;base64, ${data.image}`} />
                </div>
                :
                <div className="q-image"></div>
            }
            <div className="question">Question {currQ + 1}: {data.questionDescription}</div>
            <div className="answer">
                {data.answers && data.answers.length &&
                    data.answers.map((item, index) => {
                        return (
                            <div key={`answer-${index}`} className="a-child">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={item.isSelected}
                                        onChange={(event) => handleCheckBoxChild(event, data.questionId, item.id)}
                                    />
                                    <label className="form-check-label">
                                        {item.description}
                                    </label>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Question;