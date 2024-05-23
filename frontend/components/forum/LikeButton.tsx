import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

export default function LikeButton({likecount, answerId} : {likecount: number, answerId: number}) {
    const [likeCount, setLikeCount] = useState(likecount);
    const [isLiked, setIsLiked] = useState(false);

   
    const handleLikeClick = async () => {
        if (isLiked) {
            setLikeCount(likeCount - 1);
            setIsLiked(false);
        }else { 
          setLikeCount(likeCount + 1);
          setIsLiked(true); 
        }
  
        // Make a PUT request to update the like count
        const response = await fetch(`http://localhost:8080/answer/${answerId}?likeCount=${likeCount}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            likeCount: isLiked ? likeCount - 1 : likeCount + 1,
          }),
        });
  
        if (!response.ok) {
          console.error('Failed to update like count');
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