import _ from "lodash";
import { useState } from "react";
import LightBox from "react-awesome-lightbox";

const Question = ({ currQ, data, handleCheckBox }) => {
    const [isPreviewImage, setIsPreviewImage] = useState(false);

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
                    <img
                        style={{ cursor: "pointer" }}
                        src={`data:image/jpeg;base64, ${data.image}`}
                        onClick={() => setIsPreviewImage(true)}
                    />
                    {isPreviewImage &&
                        <LightBox
                            image={`data:image/jpeg;base64, ${data.image}`}
                            title={"Question Image"}
                            onClose={() => setIsPreviewImage(false)}
                        ></LightBox>
                    }
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