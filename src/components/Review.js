import TextEditable from '../components/TextEditable';
const Review = () => {
    return (
        <>
            <TextEditable type="h1" text="This is what customers are saying about the JSON Translator" className="review-section-header" />
            <div id="review-section">
                <div className="review-block">
                    <TextEditable
                        text="Json Translator with ChatGPT: Unmatched precision in 260+ languages, outshining Google Translate and DeepL. Accurate, nuanced—a game-changer"
                    />
                    <div className="review-block-divider"></div>
                    <div className="review-profile">
                        <img src="/assets/imgs/review/review-avatar2.png" className="review-avatar" alt="Davis Rosser" />
                        <div className="review-name-role">
                            <TextEditable
                                text="Davis Rosser"
                            />
                            <TextEditable
                                text="Software Developer"
                            />
                        </div>
                    </div>
                </div>
                <div className="review-block">
                    <TextEditable
                        text="I'm thoroughly impressed with the Json Translator. The breadth of language support is staggering, and the translation quality is simply perfect. It's become my go-to tool"
                    />
                    <div className="review-block-divider"></div>
                    <div className="review-profile">
                        <img src="/assets/imgs/review/review-avatar1.png" className="review-avatar" alt="Tiana Geidt" />
                        <div className="review-name-role">
                            <TextEditable
                                text="Tiana Geidt"
                            />
                            <TextEditable
                                text="Full Stack Developer"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Review;