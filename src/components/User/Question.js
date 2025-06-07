import _ from "lodash";

const Question = ({ currQ, data }) => {
    if (_.isEmpty(data)) {
        return (<></>)
    }
    return (
        <>
            {data.image &&
                <div className="q-image">
                    <img src={`data:image/jpeg;base64, ${data.image}`} className="card-img-top" alt="..." />
                </div>
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
                                        value=""
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