import { use, useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

export default function LikeButton({likecount, answerId} : {likecount: number, answerId: number}) {
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const fetchLikeCount = async () => {
      const response = await fetch(`http://localhost:8080/answer/${answerId}`);
      const data = await response.json();
      setLikeCount(data);
      console.log(data);
    };
  
    useEffect(() => {
      fetchLikeCount();
    }, []);
  
    const handleLikeClick = async () => {
      let updatedLikeCount = likeCount;
      if (isLiked) {
        updatedLikeCount = likeCount - 1;
        setIsLiked(false);
      } else {
        updatedLikeCount = likeCount + 1;
        setIsLiked(true);
      }
      setLikeCount(updatedLikeCount);
    
      fetch(`http://localhost:8080/answer/${answerId}?likeCount=${updatedLikeCount}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          likeCount: updatedLikeCount,
        }),
      });
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