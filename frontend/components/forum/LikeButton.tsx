import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function LikeButton({
  likecount,
  answerId,
}: {
  likecount: number;
  answerId: number;
}) {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(() => {
    const savedIsLiked = localStorage.getItem(`isLiked-${answerId}`);
    return savedIsLiked ? JSON.parse(savedIsLiked) : false;
  });

  const fetchLikeCount = async () => {
    const response = await fetch(`http://localhost:8080/answer/${answerId}`);
    const data = await response.json();
    setLikeCount(data);
    console.log(data);
  };

  useEffect(() => {
    fetchLikeCount();
  }, []);

  useEffect(() => {
    localStorage.setItem(`isLiked-${answerId}`, JSON.stringify(isLiked));
  }, [isLiked]);

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

    fetch(
      `http://localhost:8080/answer/${answerId}?likeCount=${updatedLikeCount}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likeCount: updatedLikeCount,
        }),
      }
    );
  };

  return (
    <div className="flex items-end gap-1 justify-end pr-4 lg:pb-5 lg:pt-0 pt-2 pb-2 ">
      <p className="text-sm">{likeCount}</p>
      <button onClick={handleLikeClick} className="text-lg">
        <FaHeart className={isLiked ? "text-red-600" : "text-black-600"} />
      </button>
    </div>
  );
}
