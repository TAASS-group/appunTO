package com.appunto.forumservice.DTO;

import java.util.Set;



public class UserDTO {
    private String uid;
    private String displayName;
    private String email;
    private String phoneNumber;
    private String photoUrl;
    private String bio;
    private Set<Long> enrolledCourses;

    public UserDTO(String uid, String displayName, String email, String phoneNumber, String photoUrl, String bio, Set<Long> enrolledCourses) {
        this.uid = uid;
        this.displayName = displayName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.photoUrl = photoUrl;
        this.bio = bio;
        this.enrolledCourses = enrolledCourses;
    }

    public String getUid() {
        return uid;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public String getBio() {
        return bio;
    }

    public Set<Long> getEnrolledCourses() {
        return enrolledCourses;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public void setEnrolledCourses(Set<Long> enrolledCourses) {
        this.enrolledCourses = enrolledCourses;
    }

}
