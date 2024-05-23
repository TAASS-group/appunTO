package com.appunto.forumservice.DTO;

import com.appunto.forumservice.Models.Answer;

public class AnswerDTO {
        private Answer answer ;

        private String username;

        private String imageUrl;

        public AnswerDTO(Answer answer, String username, String imageUrl) {
            this.answer = answer;
            this.username = username;
            this.imageUrl = imageUrl;
        }

        public Answer getAnswer() {
            return answer;
        }

        public String getUsername() {
            return username;
        }

        public String getImageUrl() {
            return imageUrl;
        }

        public void setAnswer(Answer answer) {
            this.answer = answer;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public void setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
        }


}
