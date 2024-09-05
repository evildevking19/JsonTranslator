import { useState, useEffect, useRef } from 'react';
import TextEditable from './TextEditable';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

// i18n.language
const LandingItem = (props) => {
    const data = props.item;
    const playerRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    const handlePlay = () => {
        setPlaying(true);
        playerRef.current.play();
    }
    return (
        <div
            className={
                'flex intro-section' + (props.order === 0 ? ' image-right' : '')
            }
        >
            <div className="flex-column text-section">
                <img src={data.icon} className="icon-mark" alt="edit-icon" />
                <TextEditable type="h3" text={data.title} />
                <TextEditable text={data.description} />
                <div className="description-box">
                    {data.items.map((value, index) => (
                        <TextEditable
                            className="description-item"
                            key={index}
                            text={value}
                        />
                    ))}
                    {data.link && (
                        <Link to={data.link.to}>
                            <Button className="btn-common">
                                <TextEditable
                                    type="span"
                                    text={data.link.title}
                                />
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
            <div className="flex-column image-section">
                {!data.video ? <img src={data.image} alt={data.title} /> :
                    <Box id="player-section" className={playing ? "playing" : ""}>
                        <video width="100%" controls ref={playerRef}>
                            <source src="/assets/video/promotion.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <img src={data.image} alt={data.title} />
                        <PlayArrowIcon onClick={handlePlay} />
                    </Box>
                }
            </div>
        </div>
    );
};
export default LandingItem;
