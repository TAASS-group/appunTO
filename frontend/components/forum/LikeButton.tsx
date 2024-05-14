import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

export default function LikeButton({likecount} : {likecount: number}) {
    const [likeCount, setLikeCount] = useState(likecount);
    const [isLiked, setIsLiked] = useState(false);

   
    const handleLikeClick = () => {
      if (isLiked) {
          setLikeCount(likeCount - 1);
          setIsLiked(false);
      }else { 
        setLikeCount(likeCount + 1);
        setIsLiked(true); 
      }
    };

    return (
        <div className="flex items-end gap-1 justify-end pr-4 pb-5 ">
        <p className="text-sm">{likeCount}</p>
        <button
            onClick={handleLikeClick}
            className="text-lg"
        >
            <FaHeart
                className={isLiked ? 'text-red-600' : 'text-black-600'} 
            />
        </button>
  </div>
    );
}